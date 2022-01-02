import React from "react";
import Button from "@material-ui/core/Button";
import ImageScarecrow from "./Scarecrow.png";
import styles from "./notfound.module.css";
import { useLocation } from "react-router-dom";


const NotFound = () => {
  const location = useLocation();
  return (
    <div className={styles.main} style={{marginTop:80}}>
      <div>
        <img
          className={styles.image}
          src={ImageScarecrow}
          alt="404 Image"
          loading="lazy"
        />
      </div>
      <div className={styles.info}>
        <h2>I have bad news for you</h2>
        <p>
          The Item you are looking for might be not existed or is temporarily
          unavailable
        </p>
        <Button variant="outlined" onClick={()=>{location.push("/")}}>Return to home page</Button>
      </div>
    </div>
  );
};

export default NotFound;
