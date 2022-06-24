import React, { useState, useEffect } from "react";

function Navigator(props) {
  let slider = "nav-slider" + (props.recent ? " left" : " right");
  return (
    <nav>
      <button onClick={() => props.onPageChange(true)} >
        Inbox
      </button>
      <button onClick={() => props.onPageChange(false)} >
        Archived
      </button>
      <div>
        <span className={slider}></span>
      </div>
    </nav>
  );
}

export default Navigator;
