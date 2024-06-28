import logo from "./logo.svg";
import "./App.css";
import Home from "./Components/Home.js";
import Header from "./Components/Header.js";
import XemDanhSachChuyenBay from "./Components/XemDanhSachChuyenBay.js";

function App() {
  return (
    <div>
      <Header />
      <XemDanhSachChuyenBay />
    </div>
  );
}

export default App;
