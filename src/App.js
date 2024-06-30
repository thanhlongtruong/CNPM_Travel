import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home.js";
import { Setting } from "./Components/Setting.js";
function App() {
  return (
    <Routes>
      <Route path="/HomePage" element={<Home />} />
      <Route path="/Setting/InfoAccount" element={<Setting />} />
      <Route path="/Setting/HistoryTicket" element={<Setting />} />
    </Routes>
  );
}

export default App;
