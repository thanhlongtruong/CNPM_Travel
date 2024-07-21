import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import DatChoCuaToi from "./Components/Plane/DatChoCuaToi.js";
import Home from "./Components/Home/Home.js";
import { Setting } from "./Components/Setting/Setting.js";
import { XemDanhSachChuyenBay } from "./Components/Plane/XemDanhSachChuyenBay.js";
import TrangThanhToan from "./Components/TrangThanhToan.js";

function App() {
  return (
    <Routes>
      <Route path="/CNPM_Travel" element={<Home />} />
      <Route path="/Setting/InfoAccount" element={<Setting />} />
      <Route path="/Setting/HistoryTicket" element={<Setting />} />
      <Route path="/XemDanhSachChuyenBay" element={<XemDanhSachChuyenBay />} />
      <Route
        path="/XemDanhSachChuyenbBay/DatChoCuaToi"
        element={<DatChoCuaToi />}
      />
      <Route
        path="/XemDanhSachChuyenbBay/DatChoCuaToi/ThanhToan"
        element={<TrangThanhToan />}
      />
    </Routes>
  );
}

export default App;
