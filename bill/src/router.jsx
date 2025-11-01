import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import InvoiceForm from "./pages/InvoiceForm";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/invoice" element={<InvoiceForm />} />
      </Routes>
    </BrowserRouter>
  );
}
