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
import { useHistory } from "react-router-dom";
import { styled, useTheme } from "@material-ui/core/styles";
import HeaderLinks from "components/Header/HeaderLinks";
import instance from "axios/axiosHeader";
import SecurityIcon from "@material-ui/icons/Security";


const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();
  let history = useHistory();

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
  const menuItems = ["Item1", "Item2", "Item3"];
  const [productMenu, setProductMenu] = useState(false);
  const [quickLinkMenu, setQuickLinkMenu] = useState(false);
  const [saleReportMenu, setSaleReportMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

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
          //  if (history.location.state.LoginToast === 1) {
          //     if(res.data.admin){
          //       window.location.href("/admin/courses");
          //     }
          // }
          // if(res.data.admin===true){
          //   alert(`Hello Admin -${res.data.username}`);
          // }
        }

      });
    }
  }, []);

// ---------------->> User Status variable section < End<<<----------------

  const brandComponent = (
    <Button
      className={classes.title}
      onClick={() => {
        history.push("/");
      }}
    >
      {brand?brand:"TechCyrus"}
    </Button>
  );
  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        {user.admin && (
          <Button
            round
            color="primary"
            onClick={() => {
              history.push("/admin/courses");
            }}
          >
            Admin Panel
            <SecurityIcon className={classes.icons} />
          </Button>
        )}

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
