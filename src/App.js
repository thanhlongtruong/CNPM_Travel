import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import DatChoCuaToi from "./Components/DatChoCuaToi.js";
import Home from "./Components/Home.js";

import Header from "./Components/Header.js";
import XemDanhSachChuyenBay from "./Components/XemDanhSachChuyenBay.js";
import DoiTimKiemChuyenBay from "./Components/DoiTimKiemChuyenBay.js";

import { Setting } from "./Components/Setting.js";
// function App() {
//   return (
//     <Routes>
//       <Route path="/HomePage" element={<XemDanhSachChuyenBay />} />
//       <Route path="/Setting/InfoAccount" element={<Setting />} />
//       <Route path="/Setting/HistoryTicket" element={<Setting />} />
//     </Routes>
//   );
// }
function App() {
  return (
    <div>
      <Header />
      <XemDanhSachChuyenBay />
    </div>
  );
}

export default App;
