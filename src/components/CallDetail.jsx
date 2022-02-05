import React from "react";
import TimeAgo from "timeago-react";
import { ImDrawer, ImPhone, ImUser } from "react-icons/im";
import { HiPhoneOutgoing, HiPhoneIncoming, HiAnnotation } from "react-icons/hi";

const CallDetail = (props) => {
  const { view, setView, archiveCall, unarchiveCall } = props;

  // Use state to return to main list
  function returnHome() {
    setView("LIST");
  }

  return (
    <div className="callContainer">
      <div className="callProfile">
        <div className="userImage">
          <ImUser size={75} />
        </div>
        <div className="userNumber">
          {view.direction === "inbound" && (
            <div className="callIcon">
              <HiPhoneIncoming size={30} color={"crimson"} />
              <h1>{view.from}</h1>
            </div>
          )}
          {view.direction === "outbound" && (
            <div className="callIcon">
              <HiPhoneOutgoing size={30} color={"green"} />
              <h1>{view.to}</h1>
            </div>
          )}
        </div>
        <div className="callData">
          {view.via && <h2>{view.via}</h2>}
          {view.duration && (
            <div>
              <p>{view.call_type.toUpperCase()}</p>
              <p>{view.duration} minutes</p>
              <p>{view && <TimeAgo datetime={view.created_at} />}</p>
            </div>
          )}
        </div>
      </div>
      <div className="buttonContainer">
        <button onClick={returnHome}>
          <HiAnnotation size={30} />
          <p>SMS</p>
        </button>
        <button onClick={returnHome}>
          <ImPhone size={30} />
          <p>CALL BACK</p>
        </button>
        {!view.is_archived && (
          <button
            onClick={() => {
              archiveCall();
              returnHome();
            }}
          >
            <ImDrawer size={30} />
            <p>ARCHIVE</p>
          </button>
        )}
        {view.is_archived && (
          <button
            onClick={() => {
              unarchiveCall();
              returnHome();
            }}
          >
            <ImDrawer size={30} />
            <p>UN-ARCHIVE</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default CallDetail;
