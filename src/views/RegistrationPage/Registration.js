import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
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
import instance from "axios/axiosHeader";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useFormik } from "formik";
import * as Yup from "yup";
import Danger from "components/Typography/Danger";
import BackDropProdcess from "components/Preloaders/BackDrop";
import { toast } from "react-toastify";
import ToastLoad from "components/ToastLoad";

const useStyles = makeStyles(styles);

export default function Registration(props) {
  const history = useHistory();
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object({
      email: Yup.string()
        .email("Enter a valid Email")
        .required("Please enter your email"),
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    });

    const formik = useFormik({
      initialValues: {
        email: "",
        username:"",
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

  //start-> Registration input handle

const handleSubmit = () => {
  setLoading(true);
  instance
    .post("api/register/", {
      email: formik.values.email,
      username: formik.values.email,
      password: formik.values.password,
    })
    .then((res) => {
      formik.resetForm();
      setLoading(false);
      if (res.status === 201) {
        handleSuccessClickOpen();
      } else {
        formik.resetForm();
        toast.error("Please try again to different email or username");
        console.log(res);
      }
    })
    .catch((err) => {
      formik.resetForm();
      setLoading(false);
      toast.error("Please try again to different email or username");
      console.log(err);
    });

  setLoading(false);
};

  // const handleSubmit = (e) => {
  //   e.preventDefault();
    
  //   instance
  //     .post("api/register/", {
  //       email: formData.email,
  //       username: formData.username,
  //       password: formData.password,
  //     })
  //     .then((res) => {
  //       if(res.request.status==201){
  //           handleSuccessClickOpen();
  //       }
  //     });
  // };
  //end-> Registration input handle



  //start-> dialog setion 
  const [successOpen, setSuccessOpen] = useState(false);
  
  const handleSuccessClickOpen = () => {
    setSuccessOpen(true);
  };
  const handleSuccessClose = () => {
    setSuccessOpen(false);
     history.push({
       pathname: "/login",
       state: { RegisterToast: 1 },
     });
  };
  

  //end-> dialog setion 


  if (loading) {
    return <BackDropProdcess />;
  }
  return (
    <div>
      <Header absolute color="info" brand="TechCyrus" {...rest} />
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
                <form
                  id="registration"
                  className={classes.form}
                  onSubmit={formik.handleSubmit}
                >
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Registration Here</h4>
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
                      labelText="User Name"
                      id="username"
                      name="username"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      onChangeFunction={formik.handleChange}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end"></InputAdornment>
                        ),
                      }}
                      error={
                        formik.touched.username &&
                        Boolean(formik.errors.username)
                      }
                      helperText={
                        formik.touched.username && formik.errors.username
                      }
                    />
                    <CustomInput
                      labelText="Password"
                      id="password"
                      name="password"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      onChangeFunction={formik.handleChange}
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
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div style={{ margin: 0, padding: 0 }}>
                        <Danger>{formik.errors.password}</Danger>
                      </div>
                    ) : null}
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      simple
                      color="primary"
                      size="lg"
                      form="registration"
                      type="submit"
                    >
                      SignUp
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>

          <Dialog
            open={successOpen}
            onClose={handleSuccessClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Your Registration Application Status?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Your Registration Is Completed, Now you can login and use this
                website as an authorised user.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSuccessClose} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
