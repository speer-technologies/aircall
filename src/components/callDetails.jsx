// CallDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCallDetails, updateCall } from "../apis/calllog.js";

const CallDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [call, setCall] = useState({});
  useEffect(() => {
    getCallDetails(id)
      .then((callDetail) => setCall(callDetail))
      .catch((error) => console.error("Error fetching user:", error));
  }, []);
  if (!id) {
    return <div>No call ID provided</div>;
  }
  const callDate = new Date(call.created_at).toLocaleDateString("en-GB");
  const handleArchiveCall = () => {
    updateCall(id, true)
      .then((response) => {
        console.log("Call made successfully:", response);
      })
      .catch((error) => console.error("Error making call:", error));
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <div>
      <h1>Call Detail Page</h1>
      <p>Call ID: {call.id}</p>
      <p>Call Direction: {call.direction}</p>
      <p>Call Duration: {call.duration}</p>
      <p>Call Type: {call.call_type}</p>
      <p>Call Time: {callDate}</p>
      <button onClick={handleArchiveCall}>Archive Call</button>
    </div>
  );
};

export default CallDetail;
