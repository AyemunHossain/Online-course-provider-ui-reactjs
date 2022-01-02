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
import BackDropProdcess from "components/Preloaders/BackDrop";
import NotFound from "views/404Page/NotFound";

const useStyles = makeStyles(styles);

export default function CategoryPage(props) {
  const classes = useStyles();
  const { slug } = useParams();
  
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
  const [loading, setLoading] = useState(true);
  const [courseLength, setCourseLength] = useState(0);
  useEffect(() => {
   
    console.log("Page Loaded")
    instance
      .get(`/api/courses-by-category/?category=${slug}`)
      .then((res) => {
        setCourseList(res.data.results);
        setCourseLength(res.data.results.length);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
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
          <ProductSection courses={courseList} category={slug} />
        )}

        {courseLength === 0 && <NotFound />}
      </div>
      <Footer />
    </div>
  );
}
