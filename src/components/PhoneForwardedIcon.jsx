import React from "react";
import { makeStyles } from "@material-ui/styles";

import BlackPhoneForwardedIcon from "@material-ui/icons/PhoneForwarded";

const useStyles = makeStyles({
  icon: {
    color: "#C42A20",
  },
});

const PhoneForwardedIcon = () => {
  const classes = useStyles();
  return <BlackPhoneForwardedIcon className={classes.icon} />;
};

export default PhoneForwardedIcon;
