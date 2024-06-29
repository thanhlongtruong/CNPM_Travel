import logo from "./logo.svg";
import "./App.css";
import Home from "./Components/Home.js";
import Header from "./Components/Header.js";
import XemDanhSachChuyenBay from "./Components/XemDanhSachChuyenBay.js";
import DoiTimKiemChuyenBay from "./Components/DoiTimKiemChuyenBay.js";

function App() {
  return (
    <div>
      <Header />
      <XemDanhSachChuyenBay />
    </div>
  );
}

export default App;
