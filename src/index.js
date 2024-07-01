import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
<<<<<<< HEAD
<<<<<<< HEAD

// import { OrderProvider } from "./Context/WindowLogin";

=======
>>>>>>> d93ff91 (file kiet done)
=======
>>>>>>> d93ff91 (file kiet done)
import { OrderProvider } from "./Context/DoiTimKiemChuyenBay";
// import { OrderProvider } from "./Context/WindowLogin";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <OrderProvider>
        <App />
      </OrderProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
