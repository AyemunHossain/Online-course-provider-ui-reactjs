/** @jsxImportSource @emotion/react */
import React, { useEffect,useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { css, jsx } from "@emotion/react";
import Button from "components/CustomButtons/Button.js";
import { useLocation } from "react-router-dom";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import QueryString from "query-string";
import { useDispatchCart } from "views/CartManagement/cart";
import { toast } from "react-toastify";
import instance from "axios/axiosHeader";



const useStyles = makeStyles(styles);

const css_card = css`
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  height: 380px;
  width: 100%;
  margin-top: 1rem;
  position: relative;
  text-align: left;
  position: relative;
  overflow: hidden;
`;

const css_header = css`
  padding-left: 1rem;
  padding-top: 1rem;
`;

const css_subheader = css`
  padding-left: 1rem;
`;

const css_review = css`
  padding-left: 2rem;
`;

const css_price = css`
  padding-left: 1rem;
`;

export default function ProductSection(props) {
  const classes = useStyles();
  const courses = props.courses;
  const location = useLocation();
  const [query, setQuery] = useState('');
  const dispatch = useDispatchCart();
  const [mobile, setMobile] = useState(false);
  
    const addToCart = async (item) => {
      await instance
        .post("api2/cart/", { item: item })
        .then((res) => {
          if (res.status === 201) {
            dispatch({ type: "ADD", item });
            toast.success("Course Added");
          }
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.error("Already Added this course to cart");
          } else if (err.response.status === 401) {
            toast.error("Please Login To Use this service");
          }
        });
    };

 useEffect(() => {
   if (window.innerWidth < 720) {
     setMobile(true);
   }

   try {
     const search = QueryString.parse(location.search);
     if (search.query) {
       setQuery(search.query)
     }
   } catch {
     //
   }
 }, []);

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          {courses.length > 0 && (
            <h3 className={classes.title}>'{query}' Query Courses</h3>
          )}
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          {courses.map((course, index) => (
            <GridItem xs={12} sm={12} md={4}>
              <div css={css_card}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#d4e4ff",
                    }}
                  >
                    <a href={`/course/${course.slug}`}>
                      <img
                        height="190"
                        width="100%"
                        src={"https://backend.techcyrus.com" + course.image}
                        alt="profile"
                      />
                    </a>
                  </div>

                  <div css={css_header}>
                    <h4
                      className={classes.title}
                      style={{ color: "black", margin: 0, padding: 0 }}
                    >
                      <a href={`/course/${course.slug}`}>{course.title}</a>
                    </h4>
                  </div>

                  <div css={css_subheader}>
                    {course.discount_price > 0 &&
                    course.discount_price < course.price ? (
                      <h4
                        style={{
                          display: "inline",
                          color: "black",
                          margin: 0,
                          padding: 0,
                        }}
                      >
                        <b>{course.discount_price} TK</b>
                      </h4>
                    ) : (
                      <h4
                        style={{
                          display: "inline",
                          color: "black",
                          margin: 0,
                          padding: 0,
                        }}
                      >
                        <b>{course.price} TK</b>
                      </h4>
                    )}
                    {course.discount_price > 0 &&
                      course.discount_price < course.price && (
                        <h4
                          style={{
                            marginLeft: "30px",
                            display: "inline",
                            color: "red",
                            padding: 0,
                          }}
                        >
                          <u>20% Off</u>
                        </h4>
                      )}
                    <h6
                      className={classes.note}
                      style={{ color: "black", margin: 0, padding: 0 }}
                    >
                      {mobile && course.title.length > 24
                        ? course.description.slice(0, 60)
                        : course.description.slice(0, 100)}
                      ...
                    </h6>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                    className={classes.btngroup}
                  >
                    <Button
                      color="info"
                      onClick={(e) => {
                        addToCart(course.id);
                        e.disabled = true;
                      }}
                    >
                      Add to cart
                    </Button>
                    <Button color="primary">Buy Now</Button>
                  </div>
                </div>
              </div>
            </GridItem>
          ))}
        </GridContainer>{" "}
      </div>
    </div>
  );
}
