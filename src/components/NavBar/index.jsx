import React from "react";
import { makeStyles } from "@material-ui/styles";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Fab from "@material-ui/core/Fab";

import CallIcon from "@material-ui/icons/Call";
import ContactsIcon from "@material-ui/icons/Contacts";
import DialpadIcon from "@material-ui/icons/Dialpad";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles({
  navBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: "1px solid rgba(0, 0, 0, 0.1)",
  },
  dialBtnContainer: {
    position: "fix",
    top: -20,
    background: "#2AC420",
  },
  dialBtn: {
    width: 30,
    height: 30,
    color: "white",
  },
  statusOn: {
    color: "#2AC420",
    padding: 1,
    border: "1px solid gray",
    borderRadius: "50%",
  },
  statusOff: {
    color: "gray",
    padding: 1,
    border: "1px solid gray",
    borderRadius: "50%",
  },
});

function NavBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.navBar}
    >
      <BottomNavigationAction label="Calls" icon={<CallIcon />} />
      <BottomNavigationAction
        label="Contacts"
        icon={<ContactsIcon />}
        disabled
      />
      <BottomNavigationAction
        className={classes.dialBtnContainer}
        component={Fab}
        icon={<DialpadIcon className={classes.dialBtn} />}
        disabled
      />
      <BottomNavigationAction
        label="Settings"
        icon={<SettingsIcon />}
        disabled
      />
      <BottomNavigationAction
        label="Status"
        icon={<FiberManualRecordIcon className={classes.statusOn} />}
        disabled
      />
    </BottomNavigation>
  );
}

export default NavBar;
