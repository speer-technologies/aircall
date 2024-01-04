import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./Header.jsx";
import Inbox from "./pages/Index.jsx";
import BottomNavbar from "./components/bottomNavbar.jsx";
import CallDetail from "./components/callDetails.jsx";
import Archived from "./pages/ArchivedCalls.jsx";
import Blank from "./pages/blank.jsx";

const App = () => {
  return (
    <Router>
      <div className="container">
        <Header />
        <div className="container-view">
          <Routes>
            <Route path="/" element={<Inbox />} />
            <Route path="/archived" element={<Archived />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/call/:id" element={<CallDetail />} />
          </Routes>
        </div>
        <BottomNavbar />
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
