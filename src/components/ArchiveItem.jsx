import React from "react";
import TimeAgo from "timeago-react";
import { HiPhoneOutgoing, HiPhoneIncoming } from "react-icons/hi";

const ArchiveItem = (props) => {
  const { archiveCall, setView } = props;

  function selectArchiveCall() {
    setView(archiveCall);
  }

  return (
    <div className="activityItem" onClick={selectArchiveCall}>
      <div className="archiveButton">
        {archiveCall.direction === "inbound" && (
          <HiPhoneIncoming size={30} color={"crimson"} />
        )}
        {archiveCall.direction === "outbound" && (
          <HiPhoneOutgoing size={30} color={"green"} />
        )}
      </div>
      <div className="mainInfo">
        {archiveCall.direction === "inbound" && (
          <span>{archiveCall.from} </span>
        )}
        {archiveCall.direction === "outbound" && <span>{archiveCall.to}</span>}
        <p>{archiveCall.duration} minutes</p>
      </div>
      <div className="timeInfo">
        {archiveCall && <TimeAgo datetime={archiveCall.created_at} />}
      </div>
    </div>
  );
};

export default ArchiveItem;
