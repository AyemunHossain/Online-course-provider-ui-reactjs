import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import Registration from "views/RegistrationPage/Registration";
import DetailsPage from "views/CourseDetailsPage/DetailsPage";
import {CartProvider} from "views/CartManagement/cart";
import CheckoutPage from "views/OrderManagement/CheckoutPage";
import OrderComplete from "views/OrderManagement/OrderComplete";
import CourseList_Admin from "admin/views/CourseManagement/CourseList_Admin";
import CreateCourses_Admin from "admin/views/CourseManagement/CreateCourses_Admin";
import OrderList_Admin from "admin/views/OrderManagement/OrderList_Admin";
import MyCourses from "views/MyCourses/MyCourses";
import CategoryPage from "views/QueryViews/Category/CategoryPage";
import SearchPage from "views/QueryViews/SearchResult/SearchPage";

var hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist} basename={process.env.PUBLIC_URL}>
      <Switch>
        <CartProvider>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/my-courses" component={MyCourses} />
          <Route exact path="/course/:slug" component={DetailsPage} />
          <Route exact path="/cart" component={CheckoutPage} />
          <Route exact path="/category/:slug" component={CategoryPage} />
          <Route exact path="/order-payment-status" component={OrderComplete} />
          <Route exact path="/search" component={SearchPage} />
        </CartProvider>
      </Switch>

      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={Registration} />
        <Route exact path="/components" component={Components} />
      </Switch>

      <Switch>
        <Route exact path="/admin/courses" component={CourseList_Admin} />
        <Route exact path="/admin/orders" component={OrderList_Admin} />
        <Route
          exact
          path="/admin/create-course"
          component={CreateCourses_Admin}
        />
      </Switch>
    </Router>,
  document.getElementById("root")
);
