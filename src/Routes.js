import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import ErrorPage from "./containers/ErrorPage";
import Login from "./containers/Login";
import NewCustomer from "./containers/NewCustomer";
import Customer from "./containers/Customer";
import NewLocation from "./containers/NewLocation";
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
      <Route exact path="/locations/new/:id">
        <NewLocation />
      </Route>
      <Route>
        <ErrorPage />
      </Route>
    </Switch>
  );
}

/*
      <UnauthenticatedRoute exact path="/login/reset">
        <ResetPassword />
      </UnauthenticatedRoute>
*/

//https://stackoverflow.com/questions/52064303/reactjs-pass-props-with-redirect-component