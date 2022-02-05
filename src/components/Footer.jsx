import React from "react";
import { HiArchive } from "react-icons/hi";
import { GrList, GrTty } from "react-icons/gr";

const Footer = (props) => {
  const { view, setView } = props;

  function goToList() {
    setView("LIST");
  }

  function goToArchive() {
    setView("ARCHIVE");
  }

  return (
    <footer>
      <div className="footerButtons">
        <button onClick={goToList}>
          <GrList />
        </button>
        {(view === "LIST" || view === "ARCHIVE") && (
          <button class="midButton" >
            <GrTty />
          </button>
        )}
        <button onClick={goToArchive}>
          Archive
          <HiArchive />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
