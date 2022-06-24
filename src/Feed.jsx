import React, { useState, useEffect } from "react";
import { TbPhoneIncoming } from "react-icons/tb";

// function Seperator(props) {
//   if (
//     props.index == 0 ||
//     props.feed[props.index].time[0].toLocaleDateString() !=
//       props.feed[props.index - 1].time[0].toLocaleDateString()
//   ) {
//     return (
//       <div className="date">
//         <h3>{props.feed[props.index].time[0].toLocaleDateString()}</h3>
//       </div>
//     );
//   }
//   return <span></span>;
// }

// The component used for retrieving, sorting, and rendering calls.
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
              <h5>{entry.direction == "inbound" ? entry.from : entry.to}</h5>
              <h6>{entry.direction == "outbound" ? entry.from : entry.to}</h6>
            </div>
          </div>

          <h6>
            {new Date(entry.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            - {entry.call_type}
          </h6>
        </li>
      );
    });
  }

  return <ul className="calls">{entries}</ul>;
}

export default Feed;
