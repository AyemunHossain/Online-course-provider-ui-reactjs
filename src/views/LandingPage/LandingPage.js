import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import { toast } from "react-toastify";
// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import instance from "axios/axiosHeader";
import { useHistory } from "react-router-dom";
import ToastLoad from "components/ToastLoad";
import BackDropProdcess from "components/Preloaders/BackDrop";


const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  let history = useHistory();

      const InitialCourseFormat = {
        id:"",
        title: "",
        image: "",
        image1: "",
        image2: "",
        image3: "",
        price: "",
        discount_price: "",
        slug: "",
        description: "",
        additional_info: "",
        category: [],
        featured: "",
      };

      const [courseList, setCourseList] = useState([InitialCourseFormat]);

  useEffect(() => {

    try{
      if (history.location.state.LoginToast === 1) {
        toast.success("Welcome ...");

        history.push({
          state: { LoginToast: 0 },
        });
      }
    }
    catch{
      console.log("Exception cased during the toast load.. ")
    }

    instance.get(`/api/courses/`).then((res) => {
      setCourseList(res.data.results);
    });
  }, []);
  
    if (courseList[0].id === "") {
      return (
        <BackDropProdcess />
      );
    }
  
  return (
    <div>
      <Header
        brand="TechCyrus"
        //rightLinks={<HeaderLinks />}
        getUserDetails={true}
        fixed
        color="info"
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />

      <ToastLoad />

      <Parallax filter image={require("assets/img/landing-bg.jpg").default}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your Story Starts With Us.</h1>
              <h4>
                Now we are in a era of online learning system. But sadly
                bangladesh is really far behind in this sector as compare to
                other developing country. Our efforts for our country to this
                sector. BROWSE OUR LATEST COURSES....
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                //href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                HOW TO GET STARTED ???
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection courses={courseList[0].id ? courseList : []} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
