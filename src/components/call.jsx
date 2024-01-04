import React from "react";
import { FaHome, FaPhone, FaVolumeUp } from "react-icons/fa";
import { FcVoicemail } from "react-icons/fc";
import { FcMissedCall } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { FcCallback } from "react-icons/fc";
import "../css/callLog.css";
const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
const CountComponent = ({ count }) => (
  <div className="count-component">{count}</div>
);
const CallIcon = ({ callType }) => {
  // Define mappings between call types and corresponding icons
  const iconMappings = {
    missed: <FcMissedCall />, // Replace with the actual icon you want for missed calls
    voicemail: <FcVoicemail />, // Replace with the actual icon you want for voicemail
    answered: <FcCallback />, // Replace with the actual icon you want for answered calls
  };

  // Default icon if the call type is not recognized
  const defaultIcon = <FcCallback />;

  // Determine the appropriate icon based on the call type
  const selectedIcon = iconMappings[callType] || defaultIcon;

  return <div className="icon">{selectedIcon}</div>;
};
const Call = ({ call }) => {
  const navigate = useNavigate();
  const formattedTime = formatTime(call.created_at);
  const [time, ampm] = formattedTime.split(" ");
  const handleCallClick = () => {
    // Navigate to the new route programmatically
    navigate(`/call/${call.id}`);
  };
  return (
    <div
      className="call-row"
      onClick={handleCallClick}
      style={{ cursor: "pointer" }}
    >
      <div className="icon">
        <CallIcon callType={call.call_type} />
      </div>
      <div>
        <div className="number">
          {call.to || "Unknown"}
          {call.count && <CountComponent count={call.count} />}
        </div>
        <div className="via">
          tried to call on <strong>{call.via || "Unknown"}</strong>
        </div>
      </div>
      <div className="time">
        {time} <strong>{ampm}</strong>
      </div>
    </div>
  );
};

export default Call;
