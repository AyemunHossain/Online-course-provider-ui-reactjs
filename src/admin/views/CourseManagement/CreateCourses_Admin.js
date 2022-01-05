import React,{useEffect,useState} from "react";
import TextField from "@material-ui/core/TextField";
import { Card, CardContent, Grid, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import ToastLoad from "components/ToastLoad";
import { toast } from "react-toastify";
import Box from "@material-ui/core/Box";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Header from "admin/components/Header/Header";
import Footer from "components/Footer/Footer.js";
import axios from "axios";
import instance from "axios/axiosHeader"
import BackDropProdcess from "components/Preloaders/BackDrop";


const useStyles = makeStyles((theme) => ({
  card: {
    width: "60%",
    margin: "auto",
    marginTop: "2rem",
    padding: "1%",
  },
  root: {
    "& .MuiTextField-root": {
      marginLeft: "1rem",
      width: "96.5%",
    },
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  mr: {
    marginBottom: "1rem",
  },
  grid: {
    marginBottom: "1rem",
  },
}));

const useStylesTwo = makeStyles((theme) => ({
  

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
}));

const useStylesThree = makeStyles((theme) => ({
  root: {
    "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
      transform: "translate(34px, 20px) scale(1);",
    },
  },
  inputRoot: {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "gray",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "purple",
    },
  },
}));


  
export default function FormPropsTextFields() {
  const classes = useStyles();
  const classesTwo = useStylesTwo();
  const classesThree = useStylesThree();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([])
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [postimage, setPostImage] = useState();


  const handleAutoCompleteChange = (event, value) => {
    setSelectedCategory(value)
  };

  const handleImageChange = (e)=>{
    if ([e.target.name] == "image") {
      setPostImage({
        image: e.target.files,
      });
    }
  }

    const defaultProps = {
      options: (category? category : []),
      getOptionLabel: (option) => option.name,
    };

      const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        price: Yup.string().required("Price is required"),
        category: Yup.array().required("At least one category is required"),
        description: Yup.string().required("Description is required"),
      });

      const formik = useFormik({
        initialValues: {
          title: "",
          price: "",
          image:"",
          discount_price: "",
          slug: "",
          description: "",
          additional_info: "",
          category: [],
          featured: "",
        },
        
        onSubmit: (values) =>
          handleSubmitCourse(values),
        validationSchema: validationSchema,
      });


  useEffect(() => {
    setLoading(true);
    instance
      .get("AdminApi/category-list/")
      .then((res) => {
        if (res.status === 200) {
          setCategory(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err);
      });

  }, [])


  const handleSubmitCourse =(values)=>{

    

    if (selectedCategory.length > 0) {
      //you may find this if condition really lame but i could
      //handle this here without this yup MF didn't work with this  selectedCategory
      //field currectly
      setLoading(true);
      debugger;

      const arr = [];
      selectedCategory.forEach((element) => {
        arr.push(element.id);
      });
      values.category = arr;
      values.featured = true;
      try {
        values.image = postimage.image[0];
      } catch {
        values.image = null;
      }

      let formData = new FormData();
      formData.append("title", values.title);
      formData.append("price", values.price);
      formData.append("image", values.image);
      formData.append(
        "discount_price",
        values.discount_price ? values.discount_price : 0
      );
      formData.append("description", values.description);
      formData.append("additional_info", values.additional_info);
      formData.append("category", values.category);
      formData.append("featured", values.featured);
      instance
        .post("AdminApi/courses/", formData)
        .then((res) => {
          if (res.status === 201) {
            formik.resetForm();
            setLoading(false);
            toast.success("CourseCreated Successfully");
            setSelectedCategory([]);
            document.getElementById("image").value = "";
          } else {
            setLoading(false);
            toast.error(res.status);
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      toast.error("Please Select one or multiple category");
    }
  }
  
    // if (loading) {
    //   return <BackDropProdcess />;
    // }


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
      <div
        style={{
          marginTop: "90px",
        }}
      >
        <Card className={classes.card}>
          <div
            style={{
              textAlign: "center",
              alignContent: "center",
              fontSize: "1.5rem",
            }}
          >
            <h1>Create A New Course</h1>
            <p>
              {" "}
              Let's get some information to make your interesting course
            </p>
          </div>
          <form
            className={classes.root}
            id="createCourse"
            onSubmit={formik.handleSubmit}
            //enctype="multipart/form-data"
          >
            <GridContainer>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <Box
                  sx={{
                    width: 1000,
                    marginBottom: 10,
                    maxWidth: "100%",
                  }}
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Title"
                    id="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                </Box>
              </GridItem>

              <GridItem xs={12} sm={12} md={12} lg={12}>
                <Box
                  sx={{
                    width: 1000,
                    marginBottom: 10,
                    maxWidth: "100%",
                  }}
                >
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    //style={{ height:100 }}
                    variant="outlined"
                    label="Description"
                    id="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                  />
                </Box>
              </GridItem>

              <GridItem xs={6} sm={6} md={6} lg={6}>
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
                    variant="filled"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                  />
                </Box>
              </GridItem>
              <GridItem xs={6} sm={6} md={6} lg={6}>
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
                    variant="filled"
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
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <Box
                  sx={{
                    width: 1000,
                    marginBottom: 10,
                    maxWidth: "100%",
                  }}
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Slug"
                    id="slug"
                    disabled={true}
                    value={"!Server info : This is an auto genarated filed"}
                    //value={formik.values.title}
                    //onChange={formik.handleChange}
                    //error={formik.touched.title && Boolean(formik.errors.title)}
                    //helperText={formik.touched.title && formik.errors.title}
                  />
                </Box>
              </GridItem>

              <GridItem xs={12} sm={12} md={12} lg={12}>
                <Box
                  sx={{
                    width: 1000,
                    marginBottom: 10,
                    maxWidth: "100%",
                  }}
                >
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    //style={{ height:100 }}
                    variant="outlined"
                    label="Additional Info"
                    id="additional_info"
                    value={formik.values.additional_info}
                    onChange={formik.handleChange}
                  />
                </Box>
              </GridItem>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <div>
                  <Autocomplete
                    multiple
                    onChange={handleAutoCompleteChange}
                    value={selectedCategory}
                    id="category"
                    classes={{ inputRoot: classesThree.inputRoot }}
                    {...defaultProps}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        error={
                          formik.touched.category &&
                          Boolean(selectedCategory.length === 0)
                        }
                        helperText={formik.touched.category && Boolean(selectedCategory.length === 0)}
                        placeholder="Select One or more category..."
                      />
                    )}
                  />
                </div>
              </GridItem>

              <GridItem xs={12} sm={12} md={12} lg={12}>
                <div style={{ marginLeft: "20px" }}>
                  <h4>Select an Image</h4>
                  <input
                    accept="image/*"
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    id="image"
                  />
                </div>
              </GridItem>

              <GridItem
                xs={3}
                sm={3}
                md={3}
                lg={3}
                style={{ marginTop: 20 }}
              ></GridItem>
              <GridItem xs={6} sm={6} md={6} lg={6} style={{ marginTop: 20 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  className={classesTwo.buttonone}
                  form="createCourse"
                  type="submit"
                >
                  SAVE COURSE
                </Button>
              </GridItem>
            </GridContainer>
          </form>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
