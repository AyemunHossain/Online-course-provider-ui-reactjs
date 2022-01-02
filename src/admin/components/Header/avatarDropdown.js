import React from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import { ExpandLess } from "@material-ui/icons";
import ExpandMore from "@material-ui/icons/ExpandMore";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import LockIcon from "@material-ui/icons/Lock";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import instance from "axios/axiosHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "250px",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("sm")]: {
      width: "90vw",
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
  active: {
    color: "#f532dd",
  },
}));

export default function DropDown(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const handleClick = () => {
    setOpen(!open);
  };

  const handleLogOut = () => {
    const response = instance.post("api/logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    instance.defaults.headers["Authorization"] = null;
    window.location.href = "/";
  };


  return (
    <List
      component="nav"
      aria-labelledby="subheader"
      subheader={
        <ListSubheader id="subheader">Hello, {props.name}</ListSubheader>
      }
      className={classes.root}
    >
      <NavLink
        exact
        to="/profile"
        activeClassName={classes.active}
        className={classes.link}
      >
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </NavLink>

      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Setting" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <NavLink
            exact
            to="/change-password"
            activeClassName={classes.active}
            className={classes.link}
          >
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary="Change Password" />
            </ListItem>
          </NavLink>
          <NavLink
            exact
            to="/delete"
            activeClassName={classes.active}
            className={classes.link}
          >
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Delete Account" />
            </ListItem>
          </NavLink>
          <NavLink
            exact
            to="/help"
            activeClassName={classes.active}
            className={classes.link}
          >
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Help" />
            </ListItem>
          </NavLink>
        </List>
      </Collapse>
      <ListItem button onClick={handleLogOut}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );
}
