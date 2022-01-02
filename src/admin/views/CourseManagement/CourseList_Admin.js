import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
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
  const InitialCourseFormat = 
    {
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
  const [updateButton, setUpdateButton] = useState(false);
  const [deleteID, setdDeleteID] = useState(null);
  const [deleteRow, setdDeleteRow] = useState(null);
  // -------------->form actions start
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required for course"),
    price: Yup.string().required("Price is required for course"),
    discount_price: Yup.string().notRequired(),
  });

  const [formData, updateFormData] = useState({
    id:"",
    rowId:"",
    title: "",
    price: "",
    discount_price: "",
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
    instance.get(`/api/courses/`).then((res) => {
      setCourseList(res.data.results);
      //console.log(res.data.results);
    });
  }, []);

  const handleDeleteModalOpen = (index, rowData) => {
    
    setClassicDeleteModal(true)
    setdDeleteID(rowData.id)
    setdDeleteRow(index)
  };

  

    const handleDelete = () => {
      

      

      instance
      .delete(`AdminApi/courses/${deleteID}/`)
      .then((res) => {
        if(res.status===204){
          toast.success("Course Deleted Successfully");

          const newArr = [...courseList];
          newArr.splice(deleteRow, 1);
          setCourseList(newArr);
            setdDeleteID(null);
            setdDeleteRow(null);
            setClassicDeleteModal(false);
        }
        else{
          toast.error(`${res.statusText}`);
        }        
      });



      //       toast.success("Course Deleted Successfully");
      //       // const arr = courseList;
      //       // const index = arr.findIndex((course) => course.id === values.id);
      //       // arr[index].title = values.title;
      //       // arr[index].price = values.price;
      //       // arr[index].discount_price = values.discount_price;
      //       // setCourseList(arr);
      //       // setUpdateButton(true);
      //     }
      //   })
      //   .catch((err) => {
      //     toast.error(err);
      //   });
    };


  const handleCourseUpdate = (values) => {
    instance
      .patch(
        `AdminApi/courses/${values.id}/`,
        JSON.stringify({
          title: values.title,
          price: values.price,
          discount_price: values.discount_price,
        })
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Course Updated Successfully");
          const arr = courseList;
          const index = arr.findIndex((course) => course.id === values.id);
          arr[index].title = values.title;
          arr[index].price = values.price;
          arr[index].discount_price = values.discount_price;
          setCourseList(arr);
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
      rowId: index,
      title: rowData.title,
      price: rowData.price,
      discount_price: rowData.discount_price ? rowData.discount_price : "",
      
    });

    setClassicModal(true);
  };

  const handleModalClose = () => {
    updateFormData({
      id: "",
      rowId: "",
      title: "",
      price: "",
      discount_price: "",
    });
    setUpdateButton(false)
    setClassicModal(false);
  };

  const column = [
    { title: "Id", field: "id" },
    { title: "Title", field: "title" },
    { title: "Price", field: "price", type: "numeric" },
    { title: "Discount Price", field: "discount_price", type: "numeric" },
    {
      title: "Link",
      field: "slug",
    },
    { title: "Featured", field: "featured", type: "boolean" },
  ];

  const [classicModal, setClassicModal] = React.useState(false);
   const [classicDeleteModal, setClassicDeleteModal] = React.useState(false);
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
              title="Courses List"
              columns={column}
              data={courseList}
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
                {
                  icon: "delete",
                  tooltip: "Delete This Course",
                  onClick: (event, index, rowData) =>
                    handleDeleteModalOpen(rowData, index),
                },
              ]}
            />

            {/*----------------Edit Modal section start -----------------------*/}
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
                    onClose={() => {
                      setClassicDeleteModal(false);
                    }}
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
                            label="Title"
                            id="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.title &&
                              Boolean(formik.errors.title)
                            }
                            helperText={
                              formik.touched.title && formik.errors.title
                            }
                          />
                        </Box>
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
                            type="number"
                            label="Price"
                            id="price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.price &&
                              Boolean(formik.errors.price)
                            }
                            helperText={
                              formik.touched.price && formik.errors.price
                            }
                          />
                        </Box>
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
                            type="number"
                            label="Discount Price"
                            id="discount_price"
                            value={formik.values.discount_price}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.discount_price &&
                              Boolean(formik.errors.discount_price)
                            }
                            helperText={
                              formik.touched.discount_price &&
                              formik.errors.discount_price
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
            {/*---------------- Edit Modal section End -----------------------*/}

            {/*  ------------- Delete Modal section End -------------------*/}

            <GridContainer>
              <GridItem xs={12} sm={12} md={6} lg={4}>
                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal,
                  }}
                  open={classicDeleteModal}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => setClassicDeleteModal(false)}
                  aria-labelledby="classic-modal-slide-title"
                  aria-describedby="classic-modal-slide-description"
                >
                  <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}
                  >
                    <h4 className={classes.modalTitle}>
                      Are You Sure To Delete This Course
                    </h4>
                  </DialogTitle>
                  <DialogActions className={classes.modalFooter}>
                    <Button color="success" onClick={() => handleDelete()}>
                      Delete
                    </Button>
                    <Button
                      onClick={() => {
                        setClassicDeleteModal(false);
                      }}
                      color="danger"
                      simple
                    >
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
              </GridItem>
            </GridContainer>

            {/*  ------------- Delete Modal section End -------------------*/}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
