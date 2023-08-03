import React from "react";
import ReactDOM from "react-dom/client.js";
import App from "./App.jsx";
import "./css/body.css";
import "./css/app.css";
import "./css/header.css";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
