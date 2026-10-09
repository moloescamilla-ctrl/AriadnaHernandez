/**
 * Integración con Mercado Pago Checkout Pro.
 * Va en el mismo proyecto de Apps Script que Code.gs.
 *
 * PENDIENTE al desplegar:
 *   - WEBAPP_URL: la URL /exec del Web App (la sabrás después del primer
 *     despliegue; pégala aquí y vuelve a desplegar como "Nueva versión").
 *   - SITE_URL: el dominio donde vive el sitio (sin "/" al final).
 */

var MP_API_BASE = 'https://api.mercadopago.com';
var WEBAPP_URL = 'PEGA_AQUI_LA_URL_EXEC_DEL_WEB_APP';
var SITE_URL = 'https://ariadnahernandez.vercel.app';

/**
 * POST desde el sitio (x-www-form-urlencoded): formato, cantidad, nombre,
 * correo, telefono y, para físico, calle/colonia/ciudad/estado/cp/referencias.
 * Responde { checkoutUrl } o { error }.
 */
function crearPreferenciaMP(e) {
  var token = PropertiesService.getScriptProperties().getProperty('MP_ACCESS_TOKEN');
  if (!token) return jsonResponse({ error: 'MP_ACCESS_TOKEN no configurado' });

  var pedido;
  try {
    pedido = registrarPedido(e.parameter);
  } catch (err) {
    return jsonResponse({ error: String(err.message || err) });
  }

  var items = [
    {
      id: pedido.formato,
      title: TITULO_LIBRO + ' — ' + pedido.info.label,
      quantity: pedido.cantidad,
      unit_price: pedido.info.precio,
      currency_id: 'MXN',
    },
  ];
  if (pedido.info.envio) {
    items.push({ id: 'envio', title: 'Envío a domicilio', quantity: 1, unit_price: pedido.info.envio, currency_id: 'MXN' });
  }

  var confirmacion = SITE_URL + '/confirmacion?f=' + pedido.formato;
  var payload = {
    items: items,
    payer: { email: e.parameter.correo, name: e.parameter.nombre },
    external_reference: pedido.pedidoId,
    back_urls: { success: confirmacion, pending: confirmacion, failure: confirmacion },
    auto_return: 'approved',
    notification_url: WEBAPP_URL,
    statement_descriptor: 'LIBRO AHERNANDEZ',
  };

  var response = UrlFetchApp.fetch(MP_API_BASE + '/checkout/preferences', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + token },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });
  var body = JSON.parse(response.getContentText());
  if (response.getResponseCode() >= 300) {
    Logger.log(response.getContentText());
    return jsonResponse({ error: 'Error creando preferencia' });
  }

  // Con credenciales de prueba (TEST-...) usa el checkout sandbox.
  var checkoutUrl = token.indexOf('TEST-') === 0 ? body.sandbox_init_point || body.init_point : body.init_point;
  return jsonResponse({ checkoutUrl: checkoutUrl });
}

/**
 * Webhook de MP. Soporta ?topic=payment&id=... y ?type=payment&data.id=...
 * Siempre verifica el pago contra la API antes de entregar nada.
 */
function recibirWebhookMP(e) {
  var paymentId = e.parameter.id || e.parameter['data.id'];
  var topic = e.parameter.topic || e.parameter.type;
  if (topic !== 'payment' || !paymentId) return ContentService.createTextOutput('ignored');

  var token = PropertiesService.getScriptProperties().getProperty('MP_ACCESS_TOKEN');
  var response = UrlFetchApp.fetch(MP_API_BASE + '/v1/payments/' + paymentId, {
    method: 'get',
    headers: { Authorization: 'Bearer ' + token },
    muteHttpExceptions: true,
  });
  if (response.getResponseCode() >= 300) return ContentService.createTextOutput('payment lookup failed');

  var pago = JSON.parse(response.getContentText());
  var pedidoId = pago.external_reference;
  if (!pedidoId) return ContentService.createTextOutput('sin external_reference');

  if (pago.status === 'approved') {
    return ContentService.createTextOutput(marcarPagado(pedidoId, pago));
  }
  if (pago.status === 'pending' || pago.status === 'in_process') {
    marcarPendiente(pedidoId);
  }
  return ContentService.createTextOutput('status: ' + pago.status);
}
