import React, { Fragment, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";

import CallDetailDialog from "../CallDetailDialog/index.jsx";
import PhoneCallbackIcon from "../PhoneCallBackIcon.jsx";
import PhoneForwardedIcon from "../PhoneForwardedIcon.jsx";

const useStyles = makeStyles({
  avatar: {
    width: "20px",
    height: "20px",
    background: "transparent",
    color: "gray",
    border: "solid 1px",
  },
  callContent: {
    padding: "16px",
    display: "flex",
    gap: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  callSubContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
    textAlign: "left",
  },
});

CallCard.propTypes = {
  call: PropTypes.object,
  cardAction: PropTypes.func,
  withDialog: PropTypes.bool,
};

function CallCard({ call, withDialog = true, cardAction = () => {} }) {
  const classes = useStyles();
  const [isDetailOpened, setIsDetailOpened] = useState(false);
  const [selectedCallId, setSelectedCallId] = useState("");

  const openDetailDialog = (callId) => {
    setSelectedCallId(callId);
    setIsDetailOpened(true);
  };

  const handleDetailDialogClose = (patched) => {
    setIsDetailOpened(false);
  };

  const handleClick = () => {
    openDetailDialog(call.id);
    cardAction();
  };

  return (
    <Fragment>
      <Card>
        <CardActionArea onClick={handleClick}>
          <div className={classes.callContent}>
            {call.direction === "inbound" && <PhoneCallbackIcon />}
            {call.direction === "outbound" && <PhoneForwardedIcon />}
            <div className={classes.callSubContent}>
              <div>
                <Typography variant="h6">
                  {call.from}
                  {call.repeat > 1 && ` (${call.repeat})`}
                </Typography>
                <Typography variant="caption">
                  tried to call on {call.to}
                </Typography>
              </div>

              <Typography variant="caption">
                {moment(call.created_at).format("HH:mm")}
              </Typography>
            </div>
          </div>
        </CardActionArea>
      </Card>
      {withDialog && (
        <CallDetailDialog
          open={isDetailOpened}
          onClose={handleDetailDialogClose}
          callId={selectedCallId}
        />
      )}
    </Fragment>
  );
}

export default CallCard;
