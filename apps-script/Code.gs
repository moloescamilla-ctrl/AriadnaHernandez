/**
 * Mi Dios no es el que me contaron — backend en Google Apps Script.
 *
 * Flujo:
 *   1. El sitio manda los datos del comprador (action=crear_preferencia_mp).
 *      Aquí se calcula el total (nunca se confía en precios del navegador),
 *      se registra el pedido en el Sheet como "Esperando pago" y se crea la
 *      preferencia de Mercado Pago (ver mercadopago.gs).
 *   2. Mercado Pago avisa por webhook cuando el pago se aprueba. Se verifica
 *      el pago contra la API de MP y:
 *        - Ebook  → se envía el PDF por correo automáticamente.
 *        - Físico → se marca "Por enviar", se confirma al comprador y se
 *                   avisa a la autora para preparar el paquete.
 *   3. Desde el Sheet, menú "Libro → Marcar como enviado" para capturar la
 *      guía de rastreo y avisar al comprador.
 *
 * ───────────────────────────────────────────────────────────────────────
 * CONFIGURACIÓN (Configuración del proyecto → Propiedades del script)
 * ───────────────────────────────────────────────────────────────────────
 *   MP_ACCESS_TOKEN  → Access Token de Mercado Pago (TEST-... o APP_USR-...)
 *   EBOOK_FILE_ID    → ID del PDF del ebook en Drive
 *                      (drive.google.com/file/d/AQUI_VA_EL_ID/view)
 *   OWNER_EMAIL      → correo donde quieres recibir aviso de pedidos físicos
 *
 * Además reemplaza SPREADSHEET_ID abajo con el ID de tu Sheet
 * (docs.google.com/spreadsheets/d/AQUI_VA_EL_ID/edit).
 *
 * La PRIMERA VEZ corre manualmente instalarTriggerOnOpen() desde el editor
 * para que aparezca el menú "Libro" dentro de tu Sheet.
 */

var SPREADSHEET_ID = 'PEGA_AQUI_EL_ID_DE_TU_SHEET';
var SHEET_NAME = 'Pedidos';
var TITULO_LIBRO = 'Mi Dios no es el que me contaron';
var AUTORA = 'Ariadna Hernández';

// Precios en MXN — deben coincidir con FORMATS en src/data/config.js.
var PRECIOS = {
  ebook: { label: 'Ebook (PDF)', precio: 149, envio: 0 },
  fisico: { label: 'Libro físico', precio: 349, envio: 99 },
};
var MAX_CANTIDAD = 10;

var COLUMNAS = [
  'Fecha', 'ID pedido', 'Formato', 'Cantidad', 'Total', 'Nombre', 'Correo',
  'Teléfono', 'Dirección', 'Estado', 'ID pago MP', 'Método', 'Guía',
];
// Índices de columna (1 = A) para no depender de números mágicos.
var COL = {};
COLUMNAS.forEach(function (nombre, i) { COL[nombre] = i + 1; });

function doGet(e) {
  if (e.parameter.topic || e.parameter.type) {
    return recibirWebhookMP(e);
  }
  return ContentService.createTextOutput('API del libro — OK');
}

function doPost(e) {
  // MP también puede mandar el webhook por POST con JSON en el cuerpo.
  if (e.postData && e.postData.type === 'application/json') {
    try {
      var cuerpo = JSON.parse(e.postData.contents);
      if (cuerpo.type === 'payment' && cuerpo.data && cuerpo.data.id) {
        return recibirWebhookMP({ parameter: { type: 'payment', 'data.id': String(cuerpo.data.id) } });
      }
    } catch (err) {
      // no era un webhook válido; sigue abajo
    }
  }

  if (e.parameter.action === 'crear_preferencia_mp') {
    return crearPreferenciaMP(e);
  }
  return jsonResponse({ error: 'Acción no reconocida' });
}

/** Valida datos, calcula el total y registra el pedido "Esperando pago". */
function registrarPedido(p) {
  var formato = PRECIOS[p.formato] ? p.formato : null;
  if (!formato) throw new Error('Formato inválido');

  var cantidad = formato === 'fisico' ? Math.min(MAX_CANTIDAD, Math.max(1, parseInt(p.cantidad, 10) || 1)) : 1;
  var info = PRECIOS[formato];
  var total = info.precio * cantidad + info.envio;

  if (!p.correo || !p.nombre) throw new Error('Faltan nombre o correo');

  var direccion = '';
  if (formato === 'fisico') {
    if (!p.calle || !p.colonia || !p.ciudad || !p.estado || !p.cp) throw new Error('Dirección incompleta');
    direccion = [p.calle, 'Col. ' + p.colonia, p.ciudad + ', ' + p.estado, 'CP ' + p.cp, p.referencias ? 'Ref: ' + p.referencias : '']
      .filter(String)
      .join(' · ');
  }

  var pedidoId = 'P' + Utilities.formatDate(new Date(), 'America/Mexico_City', 'yyMMddHHmmss') +
    Math.floor(Math.random() * 900 + 100);

  var fila = [];
  fila[COL['Fecha'] - 1] = new Date();
  fila[COL['ID pedido'] - 1] = pedidoId;
  fila[COL['Formato'] - 1] = info.label;
  fila[COL['Cantidad'] - 1] = cantidad;
  fila[COL['Total'] - 1] = total;
  fila[COL['Nombre'] - 1] = p.nombre;
  fila[COL['Correo'] - 1] = p.correo;
  fila[COL['Teléfono'] - 1] = p.telefono || '';
  fila[COL['Dirección'] - 1] = direccion;
  fila[COL['Estado'] - 1] = 'Esperando pago';
  fila[COL['ID pago MP'] - 1] = '';
  fila[COL['Método'] - 1] = '';
  fila[COL['Guía'] - 1] = '';
  getSheet().appendRow(fila);

  return { pedidoId: pedidoId, formato: formato, cantidad: cantidad, info: info, total: total };
}

/**
 * Se llama desde el webhook con un pago ya verificado como aprobado.
 * Idempotente: si el pedido ya estaba pagado no hace nada (MP reintenta).
 */
function marcarPagado(pedidoId, pago) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sheet = getSheet();
    var fila = buscarFilaPedido(pedidoId);
    if (!fila) return 'pedido no encontrado: ' + pedidoId;

    var estadoActual = sheet.getRange(fila, COL['Estado']).getValue();
    if (estadoActual !== 'Esperando pago' && estadoActual !== 'Pago pendiente') return 'ya procesado';

    var datos = leerFila(fila);
    var esEbook = datos.formato === PRECIOS.ebook.label;

    sheet.getRange(fila, COL['ID pago MP']).setValue(String(pago.id));
    sheet.getRange(fila, COL['Método']).setValue(pago.payment_type_id + (pago.payment_method_id ? ' / ' + pago.payment_method_id : ''));

    // Defensa extra: el monto cobrado debe cubrir el total del pedido.
    if (Number(pago.transaction_amount) < Number(datos.total)) {
      sheet.getRange(fila, COL['Estado']).setValue('Revisar monto ($' + pago.transaction_amount + ')');
      return 'monto insuficiente';
    }

    if (esEbook) {
      var ok = entregarEbook(datos);
      sheet.getRange(fila, COL['Estado']).setValue(ok ? 'Entregado' : 'Pagado — revisar entrega');
    } else {
      sheet.getRange(fila, COL['Estado']).setValue('Por enviar');
      correoPedidoFisico(datos);
      avisarAutora(datos);
    }
    return 'ok';
  } finally {
    lock.releaseLock();
  }
}

function marcarPendiente(pedidoId) {
  var fila = buscarFilaPedido(pedidoId);
  if (!fila) return;
  var celda = getSheet().getRange(fila, COL['Estado']);
  if (celda.getValue() === 'Esperando pago') celda.setValue('Pago pendiente');
}

/** Envía el PDF adjunto (o un enlace si pesa más de 20 MB). */
function entregarEbook(datos) {
  var fileId = PropertiesService.getScriptProperties().getProperty('EBOOK_FILE_ID');
  if (!fileId) {
    Logger.log('EBOOK_FILE_ID no configurado');
    return false;
  }
  var archivo = DriveApp.getFileById(fileId);
  var saludo = '<p>Hola ' + escapeHtml(datos.nombre) + ',</p>';
  var cierre =
    '<p>Gracias por leer <em>' + TITULO_LIBRO + '</em>. Ojalá te acompañe tanto como a mí me acompañó escribirlo.</p>' +
    '<p>Con cariño,<br>' + AUTORA + '</p>';

  if (archivo.getSize() <= 20 * 1024 * 1024) {
    MailApp.sendEmail({
      to: datos.correo,
      subject: 'Tu ebook: ' + TITULO_LIBRO,
      htmlBody: saludo + '<p>Aquí tienes tu ebook en PDF, adjunto a este correo. Guárdalo en tu celular o computadora para leerlo cuando quieras.</p>' + cierre,
      attachments: [archivo.getAs(MimeType.PDF).setName(TITULO_LIBRO + ' - ' + AUTORA + '.pdf')],
      name: AUTORA,
    });
  } else {
    archivo.addViewer(datos.correo);
    MailApp.sendEmail({
      to: datos.correo,
      subject: 'Tu ebook: ' + TITULO_LIBRO,
      htmlBody: saludo + '<p>Aquí tienes el acceso a tu ebook:</p><p><a href="' + archivo.getUrl() + '">' + archivo.getUrl() + '</a></p>' + cierre,
      name: AUTORA,
    });
  }
  return true;
}

function correoPedidoFisico(datos) {
  MailApp.sendEmail({
    to: datos.correo,
    subject: 'Recibimos tu pedido — ' + TITULO_LIBRO,
    htmlBody:
      '<p>Hola ' + escapeHtml(datos.nombre) + ',</p>' +
      '<p>¡Gracias por tu compra! Tu pago fue confirmado y ya estamos preparando tu libro.</p>' +
      '<p><strong>Pedido:</strong> ' + datos.pedidoId + '<br>' +
      '<strong>Cantidad:</strong> ' + datos.cantidad + '<br>' +
      '<strong>Envío a:</strong> ' + escapeHtml(datos.direccion) + '</p>' +
      '<p>Te mandaremos la guía de rastreo en cuanto salga tu paquete.</p>' +
      '<p>Con cariño,<br>' + AUTORA + '</p>',
    name: AUTORA,
  });
}

function avisarAutora(datos) {
  var owner = PropertiesService.getScriptProperties().getProperty('OWNER_EMAIL');
  if (!owner) return;
  MailApp.sendEmail({
    to: owner,
    subject: 'Nuevo pedido físico ' + datos.pedidoId + ' (' + datos.cantidad + ' libro' + (datos.cantidad > 1 ? 's' : '') + ')',
    htmlBody:
      '<p><strong>' + escapeHtml(datos.nombre) + '</strong> — ' + escapeHtml(datos.correo) + ' — ' + escapeHtml(datos.telefono) + '</p>' +
      '<p>' + escapeHtml(datos.direccion) + '</p>' +
      '<p>Total pagado: $' + datos.total + ' MXN</p>' +
      '<p>Cuando lo envíes, márcalo desde el menú "Libro" del Sheet para avisarle con la guía.</p>',
  });
}

// ── Sheet ────────────────────────────────────────────────────────────────

function getSheet() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(COLUMNAS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNAS.length).setFontWeight('bold');
  }
  return sheet;
}

function buscarFilaPedido(pedidoId) {
  var sheet = getSheet();
  var ultima = sheet.getLastRow();
  if (ultima < 2) return null;
  var ids = sheet.getRange(2, COL['ID pedido'], ultima - 1, 1).getValues();
  for (var i = ids.length - 1; i >= 0; i--) {
    if (String(ids[i][0]) === String(pedidoId)) return i + 2;
  }
  return null;
}

function leerFila(fila) {
  var v = getSheet().getRange(fila, 1, 1, COLUMNAS.length).getValues()[0];
  return {
    pedidoId: v[COL['ID pedido'] - 1],
    formato: v[COL['Formato'] - 1],
    cantidad: v[COL['Cantidad'] - 1],
    total: v[COL['Total'] - 1],
    nombre: v[COL['Nombre'] - 1],
    correo: v[COL['Correo'] - 1],
    telefono: v[COL['Teléfono'] - 1],
    direccion: v[COL['Dirección'] - 1],
  };
}

// ── Menú dentro del Sheet ────────────────────────────────────────────────

/** CÓRRELA UNA VEZ manualmente desde el editor (▷ Ejecutar). */
function instalarTriggerOnOpen() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'onOpen') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('onOpen').forSpreadsheet(SpreadsheetApp.openById(SPREADSHEET_ID)).onOpen().create();
  Logger.log('Listo. Recarga tu Sheet para ver el menú "Libro".');
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Libro')
    .addItem('Marcar como enviado (capturar guía)', 'marcarEnviadoFilaSeleccionada')
    .addItem('Reenviar ebook de la fila seleccionada', 'reenviarEbookFilaSeleccionada')
    .addToUi();
}

function marcarEnviadoFilaSeleccionada() {
  var ui = SpreadsheetApp.getUi();
  var fila = SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getRow();
  if (fila < 2) return ui.alert('Selecciona una fila de pedido.');

  var datos = leerFila(fila);
  if (datos.formato !== PRECIOS.fisico.label) return ui.alert('Esa fila no es un pedido físico.');

  var resp = ui.prompt('Pedido ' + datos.pedidoId, 'Paquetería y número de guía (ej. Estafeta 1234567890):', ui.ButtonSet.OK_CANCEL);
  if (resp.getSelectedButton() !== ui.Button.OK || !resp.getResponseText()) return;
  var guia = resp.getResponseText();

  var sheet = getSheet();
  sheet.getRange(fila, COL['Guía']).setValue(guia);
  sheet.getRange(fila, COL['Estado']).setValue('Enviado');

  MailApp.sendEmail({
    to: datos.correo,
    subject: 'Tu libro va en camino — ' + TITULO_LIBRO,
    htmlBody:
      '<p>Hola ' + escapeHtml(datos.nombre) + ',</p>' +
      '<p>¡Tu libro ya salió! Aquí está tu guía de rastreo:</p>' +
      '<p><strong>' + escapeHtml(guia) + '</strong></p>' +
      '<p>Gracias por tu compra.<br>' + AUTORA + '</p>',
    name: AUTORA,
  });
  ui.alert('Guía guardada y correo enviado a ' + datos.correo);
}

function reenviarEbookFilaSeleccionada() {
  var ui = SpreadsheetApp.getUi();
  var fila = SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getRow();
  if (fila < 2) return ui.alert('Selecciona una fila de pedido.');
  var datos = leerFila(fila);
  if (datos.formato !== PRECIOS.ebook.label) return ui.alert('Esa fila no es un ebook.');
  var ok = entregarEbook(datos);
  if (ok) getSheet().getRange(fila, COL['Estado']).setValue('Entregado');
  ui.alert(ok ? 'Ebook reenviado a ' + datos.correo : 'Falta configurar EBOOK_FILE_ID.');
}

// ── Utilidades ───────────────────────────────────────────────────────────

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
