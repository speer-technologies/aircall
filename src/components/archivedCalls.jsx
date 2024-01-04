// Archive.jsx
import React, { useState, useEffect } from "react";
import Archive from "./archiveBar.jsx";
import Call from "./call.jsx";
import "../css/callLog.css";
import { getCallLogs } from "../apis/calllog.js";
const Breaker = ({ date }) => {
  return <div className="divider">{date}</div>;
};
const CallsDetails = () => {
  const [calls, setCalls] = useState([]);
  useEffect(() => {
    // Call the getUser function when the component mounts
    getCallLogs()
      .then((callLogs) => setCalls(callLogs))
      .catch((error) => console.error("Error fetching user:", error));
  }, []);
  const finalCallLogs = calls;
  for (let i = 0; i < finalCallLogs.length; i++) {
    finalCallLogs[i].count = i;
  }
  let currentDate = null;
  return (
    <div className="log-container">
      <Archive finalCallLogs={finalCallLogs} archiveFlag={false} />
      <div>
        {finalCallLogs.map((call, index) => {
          const callDate = new Date(call.created_at).toLocaleDateString(
            "en-GB"
          );
          // Add a check for is_archived property
          if (!call.is_archived) {
            // Skip rendering if is_archived is true
            return null;
          }
          if (index === 0 || callDate !== currentDate) {
            currentDate = callDate;
            return (
              <React.Fragment key={`fragment-${index}`}>
                <Breaker key={`divider-${index}`} date={callDate} />
                <Call key={`call-${index}`} call={call} />
              </React.Fragment>
            );
          }

          return <Call key={`call-${index}`} call={call} />;
        })}
      </div>
    </div>
  );
};

export default CallsDetails;
