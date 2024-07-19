import React from "react";
import Activities from "./components/Activities.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="font-semibold text-lg mb-3">Recent Calls</div>

      <Activities archivedActivities={false} />
    </div>
  );
};

export default Home;
