import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveIcon from "@material-ui/icons/Unarchive";

import { useCallContext } from "../../contexts/CallContext.jsx";
import CallCardList from "../CallCardList/index.jsx";
import CallCard from "../CallCard/index.jsx";

import updateIsArchived from "../../apis/updateIsArchived.api.js";
import getCalls from "../../apis/getCalls.api.js";
import resetAllIsArchived from "../../apis/resetAllIsArchived.api.js";

import { stackCalls } from "../../utils/dataPreprocess.js";

const useStyles = makeStyles({
  feedContainer: {
    textAlign: "center",
  },
  callContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: 8,
  },
});

const ActivityFeed = () => {
  const classes = useStyles();
  const { tab, callData, setCallData, isChronological } = useCallContext();
  const [processedData, setProcessedData] = useState([]);
  const [error, setError] = useState("");

  const fetchData = () => {
    try {
      getCalls().then((data) => {
        setCallData(data);
        setProcessedData(stackCalls(data, tab));
        setError();
      });
    } catch (error) {
      setError(error.message);
      setData();
    }
  };

  const archiveAllCalls = () => {
    let updated = [];

    callData.forEach((call) => {
      if (!call.is_archived)
        updated.push(updateIsArchived(call.id, call.is_archived));
    });

    Promise.allSettled(updated).then(() => {
      fetchData();
    });
  };

  const unarchiveAllCalls = () => {
    try {
      resetAllIsArchived().then(() => {
        fetchData();
      });
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isChronological) {
      setProcessedData(stackCalls(callData, tab));
    } else {
      setProcessedData(stackCalls(callData, tab).reverse());
    }
  }, [tab, callData, isChronological]);

  return (
    <Fragment>
      {!callData && !error && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {callData && !error && (
        <div className={classes.feedContainer}>
          {processedData.length > 0 && (
            <Fragment>
              {tab === "inbox" && (
                <Button variant="outlined" onClick={archiveAllCalls}>
                  <ArchiveIcon />
                  Archive all calls
                </Button>
              )}
              {tab === "archived" && (
                <Button variant="outlined" onClick={unarchiveAllCalls}>
                  <UnarchiveIcon />
                  Unarchive all calls
                </Button>
              )}

              {processedData.map((call) => (
                <div key={`call-${call.id}`} className={classes.callContainer}>
                  <Typography variant="subtitle2" align="center">
                    {moment(call.created_at).format("MMMM, D YYYY")}
                  </Typography>
                  {call.repeat > 1 && <CallCardList call={call} />}
                  {call.repeat <= 1 && <CallCard call={call} />}
                </div>
              ))}
            </Fragment>
          )}
          {processedData.length === 0 && <p>No data</p>}
        </div>
      )}
    </Fragment>
  );
};

export default ActivityFeed;
