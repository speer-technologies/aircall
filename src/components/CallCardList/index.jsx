import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

import Collapse from "@material-ui/core/Collapse";

import CallCard from "../CallCard/index.jsx";

const useStyles = makeStyles({
  callListContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: "8px 4px",
    marginLeft: "2%",
  },
});

CallCardList.propTypes = {
  call: PropTypes.object,
};

function CallCardList({ call }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const newCall = { ...call, repeat: 1 };

  return (
    <Fragment>
      <CallCard
        call={call}
        withDialog={false}
        cardAction={() => {
          setOpen(!open);
        }}
      />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className={classes.callListContainer}>
          <CallCard call={newCall} />
          {call.nextCalls.map((nextCall) => (
            <CallCard key={`nextCall-${nextCall.id}`} call={nextCall} />
          ))}
        </div>
      </Collapse>
    </Fragment>
  );
}

export default CallCardList;
