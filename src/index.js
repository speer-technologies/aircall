import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./css/body.css";
import "./css/app.css";
import "./css/header.css";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
