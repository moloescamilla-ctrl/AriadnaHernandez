import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import Landing from "./pages/Landing.jsx";
import Checkout from "./pages/Checkout.jsx";
import Confirmation from "./pages/Confirmation.jsx";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/comprar/:formato" element={<Checkout />} />
        <Route path="/comprar" element={<Checkout />} />
        <Route path="/confirmacion" element={<Confirmation />} />
        <Route path="*" element={<Landing />} />
      </Routes>
      <WhatsAppButton />
    </>
  );
}

export default App;
