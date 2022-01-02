import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import Datetime from "react-datetime";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
// core components
import Header from "admin/components/Header/Header";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import instance from "axios/axiosHeader";
// import styles from "assets/jss/material-kit-react/views/landingPage.js";

import image from "assets/img/faces/avatar.jpg";
import typographyStyle from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import MaterialTable from "material-table";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import tableIcons from "views/table_mui/TableMui";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ToastLoad from "components/ToastLoad";
import { toast } from "react-toastify";

const useStyles = makeStyles(styles, typographyStyle);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function CourseList_Admin(props) {
  const classes = useStyles();

  const InitialOrderFormat = {
    id: "",
    refrence_code: "",
    start_date: "",
    ordered_completion_date: "",
    ordered: "",
    payment_status: "",
    user: "",
    coupon: "",
  };

  const [orderList, setOrderList] = useState([InitialOrderFormat]);
  const [updateButton, setUpdateButton] = useState(false);
  // -------------->form actions start

  const validationSchema = Yup.object({
    refrence_code: Yup.string().required("Refrence code is required for Order"),
  });

  const [formData, updateFormData] = useState({
    id: "",
    refrence_code: "",
    start_date: "",
    coupon: "",
  });

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleCourseUpdate(values);
    },
    validationSchema: validationSchema,
  });

  // -------------> form actions end

  useEffect(() => {
    instance.get(`/AdminApi/orders/`).then((res) => {
      setOrderList(res.data.results);
    });
  }, []);

    const handleCourseUpdate = (values) => {
      instance
        .patch(
          `/AdminApi/orders/${values.id}/`,
          JSON.stringify({
            refrence_code: values.refrence_code,
            start_date: values.start_date,
            coupon: values.coupon,
          })
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success("Course Updated Successfully");
            const arr = orderList;
            const index = arr.findIndex((order) => order.id === order.id);

            arr[index].refrence_code= values.refrence_code;
            arr[index].start_date= values.start_date;
            arr[index].ordered= values.ordered;
            arr[index].payment_status= values.payment_status;
            arr[index].user= values.user;
            arr[index].coupon= values.coupon;

            setOrderList(arr);
            setUpdateButton(true);
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    };

    const handleModalOpen = (index, rowData) => {
      updateFormData({
        id: rowData.id,
        refrence_code: rowData.refrence_code,
        start_date: rowData.start_date,
        coupon: (rowData.coupon? rowData.coupon:""),
      });

      setClassicModal(true);
    };

    const handleModalClose = () => {
      updateFormData({
        id: "",
        refrence_code: "",
        start_date: "",
        coupon: "",
      });
      setUpdateButton(false);
      setClassicModal(false);
    };

  const column = [
    { title: "Id", field: "id" },
    { title: "Refrence Code", field: "refrence_code" },
    { title: "Start Date", field: "start_date", type: "date" },
    { title: "Order Completed", field: "ordered", type: "boolean" },
    { title: "Order Completion Date", field: "ordered_completion_date", type: "date" },
    { title: "Payment Status", field: "payment_status", type: "boolean" },
    {
      title: "User ID",
      field: "user",
    },
    { title: "Coupon", field: "coupon" },
  ];

  const [classicModal, setClassicModal] = React.useState(false);
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  return (
    <div>
      <Header
        brand="Admin Dashboard"
        getUserDetails={true}
        fixed
        color="dark"
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
      />

      <ToastLoad />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div style={{ marginTop: "150px" }}>
          <div>
            <MaterialTable
              title="Order List"
              columns={column}
              data={orderList}
              icons={tableIcons}
              style={{
                whiteSpace: "pre",
                overflowY: "auto",
                textOverflow: "ellipsis",
              }}
              options={{
                headerStyle: {
                  position: "sticky",
                  top: "0",
                  backgroundColor: "#066791",
                  color: "#fff",
                  fontSize: "12px",
                },
                maxBodyHeight: "600px",
                width: "600px",
                actionsColumnIndex: -1,
                addRowPosition: "first",
                rowStyle: (rowData, index) => ({
                  backgroundColor: index % 2 === 0 ? "#ebffeb" : "#ffebff",
                }),
              }}
              actions={[
                {
                  icon: "edit",
                  tooltip: "Edit This Course",
                  onClick: (event, index, rowData) =>
                    handleModalOpen(rowData, index),
                },
                (rowData) => ({
                  icon: "delete",
                  tooltip: "Delete User",
                  onClick: (event, rowData) => console.log(event, rowData),
                  disabled: true,
                }),
              ]}
            />

            {/*---------------- Modal section start -----------------------*/}
            <form id="myform" onSubmit={formik.handleSubmit}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6} lg={4}>
                  <Dialog
                    classes={{
                      root: classes.center,
                      paper: classes.modal,
                    }}
                    open={classicModal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => handleModalClose()}
                    aria-labelledby="classic-modal-slide-title"
                    aria-describedby="classic-modal-slide-description"
                  >
                    <DialogTitle
                      id="classic-modal-slide-title"
                      disableTypography
                      className={classes.modalHeader}
                    >
                      <IconButton
                        className={classes.modalCloseButton}
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={() => setClassicModal(false)}
                      >
                        <Close className={classes.modalClose} />
                      </IconButton>
                      <h4 className={classes.modalTitle}>
                        Edit Course Details
                      </h4>
                    </DialogTitle>
                    <DialogContent
                      id="classic-modal-slide-description"
                      className={classes.modalBody}
                    >
                      <GridItem xs={12} sm={12} md={12} lg={12}>
                        <Box
                          sx={{
                            width: 500,
                            marginBottom: 10,
                            maxWidth: "100%",
                          }}
                        >
                          <TextField
                            fullWidth
                            label="Refrence Code"
                            id="refrence_code"
                            value={formik.values.refrence_code}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.refrence_code &&
                              Boolean(formik.errors.refrence_code)
                            }
                            helperText={
                              formik.touched.refrence_code &&
                              formik.errors.refrence_code
                            }
                          />
                        </Box>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <InputLabel className={classes.label}>
                          Start Date
                        </InputLabel>
                        <FormControl fullWidth>
                          <Datetime
                            inputProps={{ placeholder: "Datetime Picker Here" }}
                            value={
                              formik.values.start_date
                                ? moment(formik.values.start_date, "DD-MM-YYYY")
                                : null
                            }
                            onChange={(e)=>{
                                toast.error(
                                  "You Can't Change The Order Start Date"
                                );
                                e.target.value =( moment(
                                  formik.values.start_date,
                                  "DD-MM-YYYY"
                                ) || null)
                            }}
                          />
                        </FormControl>
                      </GridItem>

                      <GridItem xs={12} sm={12} md={12} lg={12}>
                        <Box
                          sx={{
                            width: 500,
                            marginBottom: 10,
                            maxWidth: "100%",
                          }}
                        >
                          <TextField
                            fullWidth
                            label="Coupon"
                            id="coupon"
                            value={formik.values.coupon}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.coupon &&
                              Boolean(formik.errors.coupon)
                            }
                            helperText={
                              formik.touched.coupon && formik.errors.coupon
                            }
                          />
                        </Box>
                      </GridItem>
                    </DialogContent>
                    <DialogActions className={classes.modalFooter}>
                      {updateButton && (
                        <Button color="primary" form="myform" type="submit">
                          Update Again
                        </Button>
                      )}

                      <Button
                        color="success"
                        form="myform"
                        type="submit"
                        disabled={updateButton}
                      >
                        Update
                      </Button>
                      <Button
                        onClick={() => handleModalClose()}
                        color="danger"
                        simple
                      >
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                </GridItem>
              </GridContainer>
            </form>
            {/*---------------- Modal section End -----------------------*/}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
