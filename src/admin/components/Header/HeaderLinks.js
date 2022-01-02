/*eslint-disable*/
import React, { useState,useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import CodeIcon from "@material-ui/icons/Code";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import SecurityIcon from "@material-ui/icons/Security";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import DropDown from "./avatarDropdown"
import { Avatar, Collapse, Menu } from "@material-ui/core";
import instance from "axios/axiosHeader";
import { useHistory } from "react-router-dom";
import { Button as CoreButton } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import Badge from "@material-ui/core/Badge";
const useStyles = makeStyles(styles, {
  avatar: {
    height: "50px",
    width: "50px",
    float: "right",
    cursor: "pointer",
  },
  headerMenu: {
    marginTop: "10px",
  },
  profileMenu: {
    minWidth: 265,
  },
});


export default function HeaderLinks(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null) 
  const history = useHistory();
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); 
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const imageStyles = { root: { width: 30, height: 30, marginBottom: 0 } };

  const Image = withStyles(imageStyles)(({ classes }) => (
    <ShoppingCartOutlinedIcon classes={classes} />
  ));


  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Programming"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={CodeIcon}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              Fundamental Programming
            </Link>,
            <a href="#" target="_blank" className={classes.dropdownLink}>
              Python
            </a>,
            <a href="#" target="_blank" className={classes.dropdownLink}>
              JavaScript
            </a>,
            <a href="#" target="_blank" className={classes.dropdownLink}>
              PHP
            </a>,
            <a href="#" target="_blank" className={classes.dropdownLink}>
              C#
            </a>,
            <a href="#" target="_blank" className={classes.dropdownLink}>
              .Net Core
            </a>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Developing"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={DeveloperBoardIcon}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              Fundamental Developing
            </Link>,
            <a href="#" target="_blank" className={classes.dropdownLink}>
              Python Dev
            </a>,
            <a href="#" target="_blank" className={classes.dropdownLink}>
              Django Developing
            </a>,
            <a href="#" target="_blank" className={classes.dropdownLink}>
              Laravel Developing
            </a>,
            <a href="#" target="_blank" className={classes.dropdownLink}>
              Ruby & Rails Developing
            </a>,
            <a href="#" target="_blank" className={classes.dropdownLink}>
              Wardpress Developing
            </a>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="CyberSecurity"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={SecurityIcon}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              Fundametal CyberSecurity
            </Link>,
            <a href="#" target="_blank" className={classes.dropdownLink}>
              CyberSecurity For Dev
            </a>,
            <a href="#" target="_blank" className={classes.dropdownLink}>
              Theoritical CEH
            </a>,
            <a href="#" target="_blank" className={classes.dropdownLink}>
              Practical CEH
            </a>,
            <a href="#" target="_blank" className={classes.dropdownLink}>
              Pro in CyberSecurity
            </a>,
          ]}
        />
      </ListItem>

      {/* <ListItem className={classes.listItem}>
        <Button
          href=""
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <CloudDownload className={classes.icons} /> Download
        </Button>
      </ListItem> */}

      {/* <ListItem className={classes.listItem}>
        <Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/CreativeTim?ref=creativetim"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem> */}
      {/* <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/CreativeTim?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem> */}
      {/* <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem> */}
      <ListItem
        className={classes.listItem}
        style={{ marginTop: "5px", marginLeft: "10px" }}
      >
        {props.user.auth === true ? (
          <Avatar
            className={classes.avatar}
            sizes="large"
            alt="S"
            src={
              props.user.avatar != null
                ? "http://127.0.0.1:8000" + props.user.avatar
                : "http://127.0.0.1:8000/cdn/media/UserAvatar/df_Avatar.jpg"
            }
            aria-haspopup="true"
            onClick={handleClick}
          />
        ) : (
          <React.Fragment>
            <Button color="rose" onClick={() => history.push("/login")}>
              LogIn
            </Button>
            <Button color="primary" onClick={() => history.push("/signup")}>
              Singup
            </Button>
          </React.Fragment>
        )}
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          TransitionComponent={Collapse}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <DropDown name={props.user.username} />
        </Menu>
      </ListItem>
    </List>
  );
}

HeaderLinks.propTypes = {
  user: PropTypes.object,
};
