import React from "react";
import { withStyles } from "@material-ui/styles";

import Button from "@material-ui/core/Button";
import MuiTab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";

import ImportExportIcon from "@material-ui/icons/ImportExport";

import { useCallContext } from "../../contexts/CallContext.jsx";

const Tab = withStyles({
  root: {
    minWidth: "92px",
  },
})(MuiTab);

const FeedTabs = () => {
  const { tab, setTab, isChronological, setIsChronological } = useCallContext();

  function handleChange(event, newValue) {
    setTab(newValue);
  }

  return (
    <Paper>
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        variant="fullWidth"
      >
        <Tab label="Inbox" value={"inbox"} />
        <Tab label="Archived" value={"archived"} />
        <Tab label="All" value={""} />
        <Button
          onClick={() => {
            setIsChronological(!isChronological);
          }}
        >
          <ImportExportIcon />
          {isChronological && "Old"}
          {!isChronological && "New"}
        </Button>
      </Tabs>
    </Paper>
  );
};

export default FeedTabs;
