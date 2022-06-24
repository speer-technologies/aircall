import React, { useState, useEffect } from "react";
import { TbPhoneIncoming } from "react-icons/tb";

function Feed(props) {
  const feed = props.feed;
  let entries;

  if (feed) {
    entries = feed.map((entry, index) => {
      // Check if current page matches entry type

      if (entry.is_archived == props.recent) {
        return null;
      }

      return (
        <li key={entry.id} onClick={() => props.onSelect(entry)}>
          <div className="left">
            <TbPhoneIncoming />
            <div className="detail">
              <h4>{entry.direction == "inbound" ? entry.from : entry.to}</h4>
              <h5>{entry.direction == "outbound" ? entry.from : entry.to}</h5>
            </div>
          </div>

          <h5>
            {new Date(entry.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            - {entry.call_type}
          </h5>
        </li>
      );
    });
  }

  return <ul className="calls">{entries}</ul>;
}

export default Feed;
