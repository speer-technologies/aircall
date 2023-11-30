import React from "react";
import { makeStyles } from "@material-ui/styles";

import BlackPhoneCallbackIcon from "@material-ui/icons/PhoneCallback";

const useStyles = makeStyles({
  icon: {
    color: "#2AC420",
  },
});

const PhoneCallbackIcon = () => {
  const classes = useStyles();
  return <BlackPhoneCallbackIcon className={classes.icon} />;
};

export default PhoneCallbackIcon;
