import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import { useLocation } from "react-router-dom";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import instance from "axios/axiosHeader";
import typographyStyle from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";
import "./styles.css";
import Styled from "styled-components";
import QueryString from 'query-string';
import { useDispatchCart, useCart } from "views/CartManagement/cart";
import { toast } from "react-toastify";
import ToastLoad from "components/ToastLoad";
import BackDropProdcess from "components/Preloaders/BackDrop";

const useStyles = makeStyles(styles, typographyStyle);
const Overall = Styled.div`
  display: flex;
  // width: 680px;
  height: 370px;
  // max-width: 680px;
  // max-height: 370px;
  margin: 0 auto;
  background-color: #fff;
  [class*="col-"] {
    padding: 12px;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  .col-1 img {
    width: 100%;
    max-width: 145px;
  }
  .ty-text { margin: 0; }
  .thankyou-main-text {
    color: #2C3345;
    font-size: 50px;
  }
  .thankyou-sub-text { color: rgba(44, 51, 69, 0.6); }
  
  ${({ type }) =>
    type === "normal" &&
    `
    justify-content: center;
    flex-direction: column;
  `}
  ${({ type }) =>
    type.indexOf("column") > -1 &&
    `
    align-items: center;
    [class*="col-"] {
      flex: 1 1;
      height: 100%;
    }
  `}
  ${({ reverseCol }) =>
    reverseCol &&
    `
    .col-1 { order: 2; }
    .col-2 { order: 1; }
  `}
  ${({ col1Width, col2Width, col1Height, col2Height }) =>
    `
    .col-1 {
      flex-basis: ${col1Width}%;
      min-height: ${col1Height}%;
    }
    .col-2 {
      flex-basis: ${col2Width}%;
      min-height: ${col2Height}%;
    }
  `}
  ${({ hasBG }) =>
    hasBG &&
    `
    background: url('https://www.sirfrancisdrake.com/images/1700-960/istock-1136437406-sfbridge-493862f1.jpg') center;
  `}
  ${({ col1BG }) =>
    col1BG &&
    `
    .col-1 { background-color: rgb(255 255 255 / 28%); }
  `}
  ${({ col2BG }) =>
    col2BG &&
    `
    .col-2 { background-color: rgb(255 255 255 / 28%); }
  `}
  ${({ col1XA }) => `.col-1 { align-items: ${col1XA}; }`}
  ${({ col2XA }) => `.col-2 { align-items: ${col2XA}; }`}
  ${({ col1YA }) => `.col-1 { justify-content: ${col1YA}; }`}
  ${({ col2YA }) => `.col-2 { justify-content: ${col2YA}; }`}
`;


export default function DetailsPage(props) {
  const classes = useStyles();
  const [type, setType] = useState("normal");
  const [col1XA, setCol1XA] = useState("center");
  const [arr, setArr] = useState([]);
  const cartItems = useCart();
  const dispatch = useDispatchCart();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    try{
      const paymentCheckout = QueryString.parse(location.search);
      if (paymentCheckout.success) {
        setLoading(false)
         instance
           .post("api2/strip-payment-status-check/", {
             checkoutId: paymentCheckout.session_id,
           })
           .then((res) => {
             if (res.status === 200) {
               setArr(res.data);
              dispatch({ type: "CLEAR" });
              toast.success("Your payment is recieved")
             }
             else if (res.status === 226) {
               toast.error("Payment Already Recieved");
             }
           })
           .catch((err) => {
             toast.error(err)
           });
        
      }

    }
    catch{
      setLoading(false);
    }

   
  }, []);
  
  if (loading) {
    return <BackDropProdcess />;
  }



  return (
    <div>
      <Header color="info" brand="TechCyrus" getUserDetails={true} fixed />
      <ToastLoad />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div style={{ marginTop: "150px" }}>
          {arr.status === "complete" && arr.payment_status === "paid" ? (
            <Overall
              className="wrapper"
              stylisOptions={{ prefix: false }}
              {...{
                type,
                col1XA,
              }}
            >
              <div className="col-1 thank-you-icon">
                <img
                  src="https://cms.jotform.com/uploads/image_upload/image_upload/global/128011_Group%20742.png"
                  alt=""
                />
              </div>
              <div className="col-2">
                <h1 className="thankyou-main-text ty-text">Thank You!</h1>
                <p className="thankyou-sub-text ty-text">
                  Your Payment has been received.
                </p>
              </div>
            </Overall>
          ) : (
            <Overall
              className="wrapper"
              stylisOptions={{ prefix: false }}
              {...{
                type,
                col1XA,
              }}
            >
              <div className="col-2">
                <h1 className="thankyou-main-text ty-text">Thank You!</h1>
                <p className="thankyou-sub-text ty-text">
                  Your Payment was canceled. please try from{" "}
                  <a href="/cart"> Checkout</a> page again.
                </p>
              </div>
            </Overall>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
