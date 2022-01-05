import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
// Sections for this page
import ProductSection from "./ProductSection";
import instance from "axios/axiosHeader";
import { useHistory, useParams } from "react-router-dom";
import ToastLoad from "components/ToastLoad";
import NotFound from "views/404Page/NotFound";
import { toast } from "react-toastify";
import BackDropProdcess from "components/Preloaders/BackDrop";


const useStyles = makeStyles(styles);

export default function SearchPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  let history = useHistory();
  const [loading, setLoading] = useState(true);


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
  const [courseLength, setCourseLength] = useState(0);

    useEffect(() => {
      instance
        .get("/api/courses-search/" + history.location.search)
        .then((res) => {
          setCourseList(res.data);
          setCourseLength(res.data.length);
          setLoading(false);
          if (res.data.length === 0) {
            toast.error("Course Not Found");
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error("Course Not Found");
        });
    }, []);

    if (loading) {
      return <BackDropProdcess />;
    }

  return (
    <div>
      <Header
        brand="TechCyurs"
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
      <div
        className={classNames(classes.main, classes.mainRaised)}
        style={{ marginTop: 10 }}
      >
        {courseLength > 0 && (
          <div className={classes.container}>
            <ProductSection courses={courseList} />
          </div>
        )}

        {courseLength === 0 && loading === false && <NotFound />}
      </div>
      <Footer />
    </div>
  );
}
