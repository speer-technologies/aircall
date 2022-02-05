import React from "react";
import TimeAgo from "timeago-react";
import { HiPhoneOutgoing, HiPhoneIncoming } from "react-icons/hi";

const ActivityItem = (props) => {
  const { call, view, setView } = props;

  function selectCall() {
    setView(call);
  }

  return (
    <div className="activityItem" onClick={selectCall}>
      <div className="archiveButton">
        {call.direction === "inbound" && (
          <HiPhoneIncoming size={30} color={"crimson"} />
        )}
        {call.direction === "outbound" && (
          <HiPhoneOutgoing size={30} color={'#2ea100'} />
        )}
      </div>
      <div className="mainInfo">
        {call.direction === "inbound" && <span>{call.from} </span>}
        {call.direction === "outbound" && <span>{call.to}</span>}
        <p>{call.duration} minutes</p>
      </div>
      <div className="timeInfo">
        {call && <TimeAgo datetime={call.created_at} />}
      </div>
    </div>
  );
};

export default ActivityItem;
