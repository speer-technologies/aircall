import React, { useState, useEffect } from "react";
import { BsFillPersonFill, BsArrowLeftCircle } from "react-icons/bs";

function moveCall(call, update) {
  fetch("https://aircall-job.herokuapp.com/activities/" + String(call.id), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ is_archived: !call.is_archived }),
  }).then((response) => {
    if (response.ok) {
      update(call);
    }
  });
}

function Call(props) {
  return (
    <div className="call">
      <BsFillPersonFill/>

      <div>
        <h3>
          {props.info.direction == "inbound" ? props.info.from : props.info.to}
        </h3>

        <h5>
          Call via: {props.info.via}
        </h5>
      </div>

      <div>
        <h5>
          {parseInt(props.info.duration / 60)} mins {props.info.duration % 60}{" "}
          seconds{" "}
        </h5>
      </div>

      <div className="call-nav">
        <BsArrowLeftCircle onClick={() => props.onBack()} />
        <button onClick={() => moveCall(props.info, props.onUpdate)}>
          {props.info.is_archived ? "Unarchive" : "Archive"}
        </button>
      </div>
    </div>
  );
}

export default Call;
