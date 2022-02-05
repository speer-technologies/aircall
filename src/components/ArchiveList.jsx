import React from "react";
import ArchiveItem from "./ArchiveItem.jsx";

const ArchiveList = (props) => {
  const { archive, setArchive, setView } = props;

  return (
    <main>
      <h1>Archive</h1>
      <div className="callContainer">
        {archive.map((archiveCall) => (
          <ArchiveItem
            key={archiveCall.id}
            archiveCall={archiveCall}
            setView={setView}
          />
        ))}
      </div>
    </main>
  );
};

export default ArchiveList;
 