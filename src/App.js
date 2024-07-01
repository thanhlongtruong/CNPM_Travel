import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import DatChoCuaToi from "./Components/DatChoCuaToi.js";
import Home from "./Components/Home.js";
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
    <Routes>
      <Route path="/HomePage" element={<Home />} />
      <Route path="/Setting/InfoAccount" element={<Setting />} />
      <Route path="/Setting/HistoryTicket" element={<Setting />} />
    </Routes>

    // <div>
    //   <Header />
    //   <XemDanhSachChuyenBay />
    // </div>
  );
}

export default App;
