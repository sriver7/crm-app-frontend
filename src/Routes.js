import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import ErrorPage from "./containers/ErrorPage";
import Login from "./containers/Login";
import NewCustomer from "./containers/NewCustomer";
import Customer from "./containers/Customer";
import Location from "./containers/Location";
import NewLocation from "./containers/NewLocation";
import NewInvoice from "./containers/NewInvoice";
import NewPayment from "./containers/NewPayment";
//import ResetPassword from "./containers/ResetPassword";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/customer/new">
        <NewCustomer />
      </Route>
      <Route exact path="/customer/:id">
        <Customer />
      </Route>
      <Route exact path="/locations/:id">
        <Location />
      </Route>
      <Route exact path="/locations/new/:id">
        <NewLocation />
      </Route>
      <Route exact path="/invoice/new/:id">
        <NewInvoice />
      </Route>
      <Route exact path="/payment/new/:id">
        <NewPayment />
      </Route>
      <Route>
        <ErrorPage />
      </Route>
    </Switch>
  );
}