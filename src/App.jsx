import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header.jsx";
import Activities from "./components/Activities.jsx";
import { Toaster } from "react-hot-toast";

import Home from "./Home.jsx"; // Assuming you have a Home component
import Archived from "./Archived.jsx";

const App = () => {
  return (
    <div className="container">
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <div className="container-view h-[92%] overflow-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="archived" element={<Archived />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
