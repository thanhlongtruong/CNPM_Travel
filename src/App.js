import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import DatChoCuaToi from "./Components/DatChoCuaToi.js";
import Home from "./Components/Home.js";
import { Setting } from "./Components/Setting.js";
import XemDanhSachChuyenBay from "./Components/XemDanhSachChuyenBay.js";

function App() {
  return (
    <Routes>
      <Route path="/cnpm_travel" element={<Home />} />
      <Route path="/Setting/InfoAccount" element={<Setting />} />
      <Route path="/Setting/HistoryTicket" element={<Setting />} />
      <Route path="/XemDanhSachChuyenBay" element={<XemDanhSachChuyenBay />} />
      <Route
        path="//XemDanhSachChuyenbBay/DatChoCuaToi"
        element={<DatChoCuaToi />}
      />
    </Routes>
  );
}

export default App;
