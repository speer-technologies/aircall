import React from "react";
import Activities from "./components/Activities.jsx";

const Archived = () => {
  return (
    <div>
      <div className="font-semibold text-lg mb-3">Archived Calls</div>

      <Activities archivedActivities={true} />
    </div>
  );
};

export default Archived;
