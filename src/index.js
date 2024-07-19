import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./css/body.css";
import "./css/app.css";
import "./css/header.css";
import "./output.css";

const Index = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

ReactDOM.render(<Index />, document.getElementById("app"));
