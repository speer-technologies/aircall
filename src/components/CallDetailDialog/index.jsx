import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import { useCallContext } from "../../contexts/CallContext.jsx";

import getCalls from "../../apis/getCalls.api.js";
import updateIsArchived from "../../apis/updateIsArchived.api.js";

const useStyles = makeStyles({
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
});

CallDetailDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  callId: PropTypes.string,
};

function CallDetailDialog({ onClose, callId, ...other }) {
  const classes = useStyles();
  const { setCallData } = useCallContext();
  const [data, setData] = useState();
  const [error, setError] = useState();

  const fetchCallDetail = () => {
    try {
      fetch(`https://cerulean-marlin-wig.cyclic.app/activities/${callId}`)
        .then((response) => response.json())
        .then((callDetailData) => {
          setData(callDetailData);
          setError();
        });
    } catch (error) {
      setError(error);
      setData();
    }
  };

  const handleClose = (isPatched) => {
    onClose(isPatched);
  };

  const handleArchive = () => {
    updateIsArchived(data.id, data.is_archived).then(() => {
      getCalls().then((callData) => {
        setCallData(callData);
      });
    });

    handleClose(true);
  };

  useEffect(() => {
    if (callId.length) {
      fetchCallDetail();
    }
  }, [callId]);

  return (
    <Dialog onClose={onClose} {...other} maxWidth="xs" fullWidth>
      {!data && !error && <DialogTitle>Loading...</DialogTitle>}
      {!data && error && <DialogTitle>Fail to get call's detail</DialogTitle>}
      {data && (
        <Fragment>
          <DialogTitle>{data.from}</DialogTitle>

          <DialogContent className={classes.dialogContent}>
            <Typography variant="subtitle1">
              {moment(data.created_at).format("MMMM, D YYYY, HH:mm")}
            </Typography>
            <Divider />
            {data.direction === "inbound" && (
              <Typography variant="subtitle1">
                Incoming Call ({data.call_type})
              </Typography>
            )}
            {data.direction === "outbound" && (
              <Typography variant="subtitle1">
                Outgoing Call ({data.call_type})
              </Typography>
            )}
            <Typography variant="body2">To: {data.to}</Typography>
            <Typography variant="body2">Via: {data.via}</Typography>
            <Typography variant="caption">
              {moment.duration(data.duration).humanize()}
            </Typography>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleArchive}>
              {data.is_archived && "Unarchive"}
              {!data.is_archived && "Archive"}
            </Button>
            <Button
              onClick={() => {
                handleClose(false);
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Fragment>
      )}
    </Dialog>
  );
}

export default CallDetailDialog;
