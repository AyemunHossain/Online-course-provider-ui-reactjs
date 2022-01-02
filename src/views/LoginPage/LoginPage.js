import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import image from "assets/img/bg7.jpg";
import instance from "axios/axiosHeader"
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import ToastLoad from "components/ToastLoad";



const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const history = useHistory();
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  const validationSchema = Yup.object({
    email: Yup.string().email("Enter a valid Email").required("Email is required"),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handleSubmit();
    },
    validationSchema: validationSchema,
  });

  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();
  const { ...rest } = props;

  //start-> Login input handle

      const handleSubmit = () => {
        instance
          .post("api/token/", {
            email: formik.values.email,
            password: formik.values.password,
          })
          .then((res) => {
            if (res.status === 200) {
              localStorage.setItem("access_token", res.data.access);
              localStorage.setItem("refresh_token", res.data.refresh);
              instance.defaults.headers["Authorization"] =
                "JWT " + localStorage.getItem("access_token");
              debugger;

              history.push({
                pathname: "/",
                state: { LoginToast: 1 },
              });
            } else console.log(res);
          })
          .catch((err) => {
              
              toast.error("Username or password is wrong")
          });
      };


  //end-> Login input handle
  return (
    <div>
      <Header
        absolute
        color="info"
        brand="TechCyrus"
        getUserDetails={false}
        // rightLinks={<HeaderLinks />}
        {...rest}
      />
    <ToastLoad />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login Here</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>Or Be Classical</p>
                  <CardBody>
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      name="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={formik.values.email}
                      onChangeFunction={formik.handleChange}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                    <CustomInput
                      labelText="Password"
                      id="password"
                      name="password"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      onChangeFunction={formik.handleChange}
                      value={formik.values.password}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    {formik.errors.name && (
                      <div id="feedback">{formik.errors.name}</div>
                    )}
                    <Button
                      simple
                      color="primary"
                      size="lg"
                      type="submit"
                      //onClick={handleSubmit}
                    >
                      Login
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
