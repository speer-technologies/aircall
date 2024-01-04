// Archive.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaEnvelope, FaCog } from "react-icons/fa";
import "../css/Archive.css";
import { updateCall, resetCalls } from "../apis/calllog.js";

const Archive = ({ finalCallLogs, archiveFlag }) => {
  const navigate = useNavigate();
  const handleArchiveCall = () => {
    // Loop through finalCallLogs and perform API call for each id
    if (archiveFlag) {
      finalCallLogs.forEach((call) => {
        const { id, is_archived } = call;
        if (!is_archived) {
          updateCall(id, true)
            .then((response) => {
              console.log(
                `Call with id ${id} archived successfully:`,
                response
              );
              // You can update the UI or perform additional actions as needed
            })
            .catch((error) =>
              console.error(`Error archiving call with id ${id}:`, error)
            );
        }
        setTimeout(() => {
          window.location.reload();
        }, 100 * finalCallLogs.length);
      });
    }
    if (!archiveFlag) {
      resetCalls()
        .then((response) => {
          console.log(`Calls unarchived successfully:`, response);
          // You can update the UI or perform additional actions as needed
        })
        .catch((error) => console.error(`Error unarchiving call:`, error));
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };
  return (
    <div
      className="heading"
      onClick={handleArchiveCall}
      style={{ cursor: "pointer" }}
    >
      {archiveFlag ? (
        <FaEnvelope className="icon" />
      ) : (
        <FaCog className="icon" />
      )}
      {archiveFlag ? "Archive all calls" : "Unarchive all calls"}
    </div>
  );
};

export default Archive;
