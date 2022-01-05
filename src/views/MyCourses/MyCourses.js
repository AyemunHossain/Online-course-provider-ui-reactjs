import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import instance from "axios/axiosHeader";
import typographyStyle from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";
import { useDispatchCart } from "views/CartManagement/cart";
import { useHistory } from "react-router-dom";
import BackDropProdcess from "components/Preloaders/BackDrop";


const useStyles = makeStyles(styles, typographyStyle);
const useStylesTwo = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(90deg, #D9DAEB, #EBE5E3)",
    flexGrow: 1,
    padding: 14,
  },
  productgrid: {
    maxWidth: 1200,
    margin: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor: "#EBE5E3",
  },
  card: {
    backgroundColor: "#EBE5E3",
    display: "flex",
    marginTop: 10,
  },
  h1: {
    fontFamily: '"Sofia-Pro", sans-serif',
    fontSize: 72,
    fontWeight: 600,
    lineHeight: 1.2,
    color: "rgba(80,80,80,1)",
  },
  h2: {
    fontFamily: '"Sofia-Pro", sans-serif',
    fontSize: 60,
    fontWeight: 300,
    lineHeight: 1.2,
    color: "rgba(80,80,80,1)",
  },
  h3: {
    fontFamily: '"Sofia-Pro", sans-serif',
    fontSize: 48,
    fontWeight: 600,
    lineHeight: 1.2,
    color: "rgba(80,80,80,1)",
  },
  h4: {
    fontFamily: '"Sofia-Pro", sans-serif',
    fontSize: 30,
    fontWeight: 600,
    lineHeight: 1.2,
    color: "rgba(80,80,80,1)",
  },
  h5: {
    fontFamily: '"Sofia-Pro", sans-serif',
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.2,
    color: "rgba(80,80,80,1)",
  },
  h6: {
    fontFamily: '"Sofia-Pro", sans-serif',
    fontSize: 15,
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: -0.5,
    color: "rgba(80,80,80,1)",
  },
  subtitle1: {
    fontFamily: '"Rubik", sans-serif',
    fontSize: 14,
    letterSpacing: "0.1em",
    fontStyle: "normal",
    fontWeight: 400,
    color: "rgba(80,80,80,1)",
  },
  subtitle2: {
    fontFamily: '"Rubik", sans-serif',
    fontSize: 12,
    letterSpacing: "0.1em",
    fontWeight: 300,
    color: "rgba(80,80,80,1)",
  },
  body1: {
    fontFamily: '"Rubik", sans-serif',
    fontSize: 18,
    lineHeight: 1.5,
    color: "rgba(80,80,80,1)",
  },
  body2: {
    fontFamily: '"Rubik", sans-serif',
    fontSize: 16,
    lineHeight: 1.5,
    fontWeight: 300,
    color: "rgba(80,80,80,1)",
  },
  caption1: {
    fontFamily: '"Rubik", sans-serif',
    fontSize: 12,
    lineHeight: 1.4,
    color: "rgba(80,80,80,1)",
  },

  spacer: {
    display: "block",
    height: 10,
  },

  typography: {
    font: "system-ui",
  },

  icons: {
    fontSize: 30,
  },

  buttonone: {
    width: "100%",
    borderRadius: "8px",
    marginBottom: "20px",
    backgroundColor: "#3D77F9",
    letterSpacing: "1px",
    fontWeight: 300,
    height: 48,
  },
  buttontwo: {
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(61,119,249, .15)",
    borderRadius: "8px",
    marginBottom: "20px",
    color: "#3D77F9",
    letterSpacing: "1px",
    fontWeight: 400,
    backgroundColor: "rgba(61,119,249, .15)",
    height: 48,
  },
  buttoncircle: {
    borderRadius: "21px",
    borderColor: "rgba(61,119,249, .15)",
    borderWidth: 1,
    color: "#3D77F9",
    letterSpacing: "1px",
    fontWeight: 400,
    height: 36,
    backgroundColor: "rgba(61,119,249, .15)",
  },
  label: {
    color: "red",
    letterSpacing: "1px",
    fontWeight: 400,
    fontsize: 6,
  },
  dividerFullWidth: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(0)}px 0`,
  },
  nested: {
    margin: `0 0 0 0`,
    color: "rgba(0, 0, 0, 0.54)",
  },
  list: {
    padding: `0 0 0 0`,
    margin: `0 0 0 0`,
  },
  quote: {
    fontStyle: "italic",
  },
  source: {
    textAlign: "right",
    paddingBottom: `${theme.spacing(3)}px 0 ${theme.spacing(30)}px 0`,
    display: "block",
  },
  media: {
    height: 280,
    width: 212,
    backgroundSize: "contain",
    backgroundPosition: "top",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  roundedbox: {
    marginTop: 30,
    borderRadius: 8,
    borderColor: "grey",
    padding: 15,
  },
  cartbutton: {},
  itemgrid: {
    padding: 5,
  },
  cover: {
    minWidth: 232,
  },
  subitem: {},
  content: {
    padding: 0,
  },
  bigspacer: {
    height: 30,
  },
  textField: {
    backgroundColor: "rgba(198,205,252,0.5)",
    borderBottomWidth: 2,
    width: "100%",
    borderRadius: `6px 6px 0 0`,
  },
}));

export default function MyCourses(props) {
  const classesTwo = useStylesTwo();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    instance
      .get("api2/my-courses/")
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          console.log(res.data);
          setArr(res.data);
        }
      })
      .catch((err) => {
       setLoading(false);
      });
  }, []);




  const dispatch = useDispatchCart();
  let total = 0;
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  
  if (loading) {
    return <BackDropProdcess />;
  }


  return (
    <div>
      <Header color="info" brand="TechCyrus" getUserDetails={true} fixed />

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div style={{ marginTop: "150px" }}>
          <div className={classesTwo.container}>
            <GridContainer>
              <Grid container spacing={4} className={classesTwo.productgrid}>
                <Grid item xs={12} sm={8}>
                  {arr.length !== 0 && (
                    <Typography
                      component="h5"
                      variant="h5"
                      className={classesTwo.h4}
                      style={{ marginBottom: "10px" }}
                    >
                      Your Enrolled Courses
                    </Typography>
                  )}
                  {arr.map((obj, index) => (
                    // {
                    //   /*- - - - - -  Single Product - - -Start - - - */
                    // }
                    <Card className={classesTwo.card}>
                      <Grid
                        container
                        spacing={4}
                        className={classesTwo.itemgrid}
                      >
                        <GridItem xs={12} sm={2} className={classes.marginLeft}>
                          <a
                            href={`https://backend.techcyrus.com/course/${obj.item__slug}`}
                          >
                            <img
                              src={`https://backend.techcyrus.com/media/${obj.item__image}`}
                              alt="..."
                              className={
                                classes.imgRaised +
                                " " +
                                classes.imgRounded +
                                " " +
                                classes.imgFluid
                              }
                            />
                          </a>
                        </GridItem>

                        <Grid
                          item
                          xs={12}
                          sm={6}
                          className={classesTwo.subitem}
                        >
                          <CardContent
                            className={classesTwo.content}
                            style={{ paddingBottom: "0px" }}
                          >
                            <Typography
                              component="h5"
                              variant="h5"
                              className={classesTwo.h5}
                            >
                              {obj.item__title}
                            </Typography>
                            <div className={classesTwo.spacer} />
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                              className={classesTwo.subtitle1}
                            >
                              by Clifford Rogers and Ty Seidule
                            </Typography>
                          </CardContent>
                        </Grid>
                      </Grid>
                    </Card>
                    //
                    //   /*- - - - - -  Single Product - - -End - - - */
                    //
                  ))}

                  {arr.length === 0 && (
                    <GridContainer justify="center">
                      <Card style={{ margin: 20 }}>
                        <Typography
                          align="center"
                          component="h4"
                          variant="h4"
                          className={classesTwo.h4}
                          style={{ marginBottom: "10px" }}
                        >
                          You Don't Have Any Enrolled Courses
                        </Typography>
                      </Card>
                      <Button
                        color="success"
                        onClick={() => {
                          history.push("/");
                        }}
                      >
                        See Our Latest Courses
                      </Button>
                    </GridContainer>
                  )}
                </Grid>
              </Grid>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
