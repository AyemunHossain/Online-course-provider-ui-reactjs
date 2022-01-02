import React,{useEffect,useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import PersonIcon from "@material-ui/icons/Person";
import RateReviewIcon from "@material-ui/icons/RateReview";
import LocalLibraryTwoToneIcon from "@material-ui/icons/LocalLibraryTwoTone";
import AddAlertIcon from "@material-ui/icons/AddAlert";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";

import profile from "assets/img/faces/christian.jpg";

import studio1 from "assets/img/examples/studio-1.jpg";
import studio2 from "assets/img/examples/studio-2.jpg";
import studio3 from "assets/img/examples/studio-3.jpg";
import studio4 from "assets/img/examples/studio-4.jpg";
import studio5 from "assets/img/examples/studio-5.jpg";
import work1 from "assets/img/examples/olu-eletu.jpg";
import work2 from "assets/img/examples/clem-onojeghuo.jpg";
import work3 from "assets/img/examples/cynthia-del-rio.jpg";
import work4 from "assets/img/examples/mariya-georgieva.jpg";
import work5 from "assets/img/examples/clem-onojegaw.jpg";
import { useParams } from "react-router-dom";
import styles from "assets/jss/material-kit-react/views/profilePage.js";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import {useDispatchCart} from "views/CartManagement/cart";
import instance from "axios/axiosHeader";
import Info from "components/Typography/Info.js";
import typographyStyle from "assets/jss/material-kit-react/views/componentsSections/typographyStyle";
import { toast } from "react-toastify";
import ToastLoad from "components/ToastLoad";
import BackDropProdcess from "components/Preloaders/BackDrop";

const useStyles2 = makeStyles((theme) => ({
  root: {
    color: "#FFF",
    width: "100%",
    backgroundColor: "gray",
    boxShadow: "inset 1px -1px 1px gray",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    marginLeft: "6px",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const useStyles = makeStyles(styles, typographyStyle, {
  root: {
    maxWidth: 345,
  },
});

export default function DetailsPage(props) {
  const classes = useStyles();
  const classes2 = useStyles2();
  const { slug } = useParams();
  const { ...rest } = props;
  const loads = { status: 0 };
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
    const dispatch = useDispatchCart();
    const [addToCartButton, setAddToCartButton] = useState(false)

    const addToCart = async(item) => {
        await instance
          .post("api2/cart/", { item: item })
          .then((res) => {
            loads.status=1;
            if (res.status === 201) {
              dispatch({ type: "ADD", item });
              toast.success("Course Added")
            }else{
              toast.error("Unknow error occoured");
            }
          })
          .catch((err) => {
            loads.status = 1;
            if (err.response.status === 400) {
               toast.error("Already Added this course to cart");
            } else {
              toast.error("Unknow error occoured");
            }
          });
    };



    const InitialCourseFormat = {
      title: "",
      id:"",
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

  const[course, setCourse] = useState(InitialCourseFormat);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance
    .get(`/api/courses/${slug}`)
    .then((res)=>{
       setLoading(false)
       setCourse(res.data);
    })
    
  }, [])
  
  
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  const AccordionHeaderTemplate = (props) => {
    return (
      <React.Fragment>
        {expanded === props.panelName ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        <Typography {...props}>{props.label}</Typography>
      </React.Fragment>
    );
  };

  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

   if (loading) {
     return <BackDropProdcess />;
   }
   
  return (
    <div>
      
      <Header
        color="info"
        brand="TechCyrus"
        getUserDetails={true}
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 100,
          color: "white",
        }}
        {...rest}
      />
      <ToastLoad />
      <Parallax
        small
        filter
        image={require("assets/img/profile-bg.jpg").default}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <h3 className={classes.title} style={{ justify: "center" }}>
                  {course.title}
                </h3>
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                {/*----------------- card section --Start---------------*/}
                <div>
                  <Card style={{ width: "80%" }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt={course.title}
                        height="140"
                        image={"http://127.0.0.1:8000" + course.image}
                        title={course.title}
                      />
                      <CardContent>
                        <GridContainer
                          style={{ margin: "0px", padding: "0px" }}
                        >
                          <div display="inline" style={{ marginRight: "10px" }}>
                            <Info>
                              <h3>
                                <b>{course.price}</b>
                              </h3>
                            </Info>
                          </div>
                          <div display="inline" style={{ marginTop: "10px" }}>
                            <h5>
                              <del>{course.price}</del>
                            </h5>
                          </div>
                          <div
                            display="inline"
                            style={{ marginLeft: "20px", marginTop: "10px" }}
                          >
                            <h5>
                              <i>% Off sale is going on</i>
                            </h5>
                          </div>
                        </GridContainer>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        color="primary"
                        disabled={addToCartButton}
                        style={{ width: "100%" }}
                        onClick={(e) => {
                          addToCart(course.id);
                          setAddToCartButton(true);
                        }}
                      >
                        Add to cart
                      </Button>
                    </CardActions>
                    <CardActions
                      style={{ marginTop: "0px", paddingTop: "0px" }}
                    >
                      <Button color="rose" style={{ width: "100%" }}>
                        Buy now
                      </Button>
                    </CardActions>
                  </Card>
                </div>

                {/*----------------- card section --end---------------*/}
              </GridItem>
              {/*------------------- Accordion Section ---------Start--------------------*/}
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes2.root} style={{ marginTop: "20px" }}>
                  {/* <Accordion
                    square
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                    classes2={{
                      root: classes2.root,
                    }}
                  >
                    <AccordionSummary
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <AccordionHeaderTemplate
                        panelName="panel1"
                        label="Technology Will Learn"
                        className={classes2.heading}
                      />
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Here We will list the Technology That we will gonna cover
                      </Typography>
                    </AccordionDetails>
                  </Accordion> */}

                  <Accordion
                    square
                    expanded={expanded === "panel3"}
                    onChange={handleChange("panel3")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3bh-content"
                      id="panel3bh-header"
                    >
                      <Typography className={classes2.heading}>
                        Details About Course
                      </Typography>
                      <Typography className={classes2.secondaryHeading}>
                        {expanded !== "panel3" &&
                          course.description.slice(0, 20)}
                        ...
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{course.description}</Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    square
                    expanded={expanded === "panel4"}
                    onChange={handleChange("panel4")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel4bh-content"
                      id="panel4bh-header"
                    >
                      <Typography className={classes.heading}>
                        Additional information
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{course.additional_info}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </GridItem>
              {/*------------------- Accordion Section ---------End--------------------*/}
            </GridContainer>

            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Course Module",
                      tabIcon: ViewModuleIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={studio1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio2}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={studio5}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio4}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      ),
                    },
                    {
                      tabButton: "About Course Instructor",
                      tabIcon: PersonIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work2}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work3}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work4}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work5}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      ),
                    },
                    {
                      tabButton: "Announcement",
                      tabIcon: AddAlertIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work4}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio3}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work2}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio1}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      ),
                    },
                    {
                      tabButton: "Students Review",
                      tabIcon: RateReviewIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work4}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio3}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work2}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio1}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      ),
                    },

                    {
                      tabButton: "Success Story",
                      tabIcon: LocalLibraryTwoToneIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work4}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio3}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work2}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio1}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      ),
                    },
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
