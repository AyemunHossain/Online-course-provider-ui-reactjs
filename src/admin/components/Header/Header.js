import React, { useState,useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import Menu from "@material-ui/icons/Menu";
import styles from "assets/jss/material-kit-react/components/headerStyle.js";
import MenuIcon from "@material-ui/icons/Menu";
import { styled, useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import { Collapse, ListSubheader, Typography } from "@material-ui/core";
import {
  ShowChart as ShowChartIcon,
  ShoppingCart as ShoppingCartIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Inbox as InboxIcon,
} from "@material-ui/icons";
import HeaderLinks from "./HeaderLinks";
import instance from "axios/axiosHeader";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();
  const history = useHistory();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  };
  const { color, rightLinks, leftLinks, brand, fixed, absolute } = props;
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed,
  });

  // ---------------->> Drawer section
  const [open, setOpen] = React.useState(false);
  const drawerWidth = 240;
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const theme = useTheme();
  const [saleMenu, setSaleMenu] = useState(false);
  const [orderMenu, setOrderMenu] = useState(false);
  const menuItems = ["Item1", "Item2", "Item3"];
  const [productMenu, setProductMenu] = useState(false);
  const [quickLinkMenu, setQuickLinkMenu] = useState(false);
  const [saleReportMenu, setSaleReportMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

          //-------Drawer Item Declarations

          const courseManagement = [
            { name: "List All Courses", link: "/admin/courses" },
            { name: "Create A Course", link: "/admin/create-course" },
          ];

          const OrderManagement = [{ name: "List All Orders", link: "/admin/orders" }];

          ///----------------End Declartions


  // ---------------->> end Drawer section

  // ---------------->> User Status variable section < Start<<<----------------
  const [user, setUser] = useState({
    auth: false,
    admin: false,
    username: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    if (props.getUserDetails) {
      instance.get("api/user-status/").then((res) => {
        if (res.status === 200) {
          setUser(res.data);
          if(res.data.admin!==true){
            history.push("/")
          }
        }
      });
    }
  }, []);

  // ---------------->> User Status variable section < End<<<----------------

  const brandComponent = <Button className={classes.title}>{brand}</Button>;
  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        {user.admin && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <Toolbar className={classes.drawerHeader}>
            <Typography className={classes.drawerBrandingText}>
              Admin Action
            </Typography>
          </Toolbar>

          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <ListSubheader className={classes.listSubheader}>
            <Typography>Dashboard</Typography>
          </ListSubheader>
          <ListItem
            className={classes.drawerListItem}
            onClick={() => setSaleMenu(!saleMenu)}
          >
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Course Management" />
            {saleMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse
            in={saleMenu}
            timeout="auto"
            unmountOnExit
            collapsedSize="auto"
          >
            <List
              component="nav"
              aria-labelledby="nested-list-staff-subheader"
              disablePadding
            >
              {courseManagement.map((item, index) => (
                <ListItem button onClick={() => history.push(item.link)}>
                  <ListItemText key={index} primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>

          <ListSubheader className={classes.listSubheader}>
            <Typography>Order Base</Typography>
          </ListSubheader>
          <ListItem
            className={classes.drawerListItem}
            onClick={() => setOrderMenu(!orderMenu)}
          >
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Order Management" />
            {orderMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse
            in={orderMenu}
            timeout="auto"
            unmountOnExit
            collapsedSize="auto"
          >
            <List
              component="nav"
              aria-labelledby="nested-list-staff-subheader"
              disablePadding
            >
              {OrderManagement.map((item, index) => (
                <ListItem button onClick={() => history.push(item.link)}>
                  <ListItemText key={index} primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>

          <ListSubheader className={classes.listSubheader}>
            <Typography>Reports</Typography>
          </ListSubheader>

          <ListItem
            className={classes.drawerListItem}
            onClick={() => setSaleReportMenu(!saleReportMenu)}
          >
            <ListItemIcon>
              <ShowChartIcon />
            </ListItemIcon>
            <ListItemText primary="Sale Report" />
            {saleReportMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse
            in={saleReportMenu}
            timeout="auto"
            unmountOnExit
            collapsedSize="auto"
          >
            <List
              component="nav"
              aria-labelledby="nested-list-staff-subheader"
              disablePadding
            >
              {menuItems.map((item) => (
                <ListItem button>
                  <ListItemText key={item} primary={item} />
                </ListItem>
              ))}
            </List>
          </Collapse>

          <ListSubheader className={classes.listSubheader}>
            <Typography>User Management</Typography>
          </ListSubheader>
          <ListItem
            className={classes.drawerListItem}
            onClick={() => setUserMenu(!userMenu)}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
            {userMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse
            in={userMenu}
            timeout="auto"
            unmountOnExit
            collapsedSize="auto"
          >
            <List
              component="nav"
              aria-labelledby="nested-list-staff-subheader"
              disablePadding
            >
              {menuItems.map((item) => (
                <ListItem button>
                  <ListItemText key={item} primary={item} />
                </ListItem>
              ))}
            </List>
          </Collapse>

          {/* <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
        </Drawer>

        {leftLinks !== undefined ? brandComponent : null}
        <div className={classes.flex}>
          {leftLinks !== undefined ? (
            <Hidden smDown implementation="css">
              {leftLinks}
            </Hidden>
          ) : (
            brandComponent
          )}
        </div>
        <Hidden smDown implementation="css">
          <HeaderLinks user={user} />
        </Hidden>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classes.appResponsive}>
            {leftLinks}

            {/*---------- Right Links section start --------------*/}
            <HeaderLinks user={user} />
            {/*---------- Right Links section end --------------*/}
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  );
}

Header.defaultProp = {
  color: "white",
};

Header.propTypes = {
  getUserDetails: PropTypes.bool,
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark",
  ]),
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark",
    ]).isRequired,
  }),
};
