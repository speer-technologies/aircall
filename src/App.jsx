import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header.jsx";
import Activities from "./components/Activities.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="container">
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <div className="container-view h-[92%] overflow-auto">
        <div className="font-semibold text-lg mb-3">Recent Calls</div>
        <Activities />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
