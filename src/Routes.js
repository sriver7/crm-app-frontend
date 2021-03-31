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
import NewQuote from "./containers/NewQuote";
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
      <Route exact path="/newQuote">
        <NewQuote />
      </Route>
      <Route exact path='/authenticateDocuSign' component={() => {
        window.location.href = ' https://account-d.docusign.com/oauth/auth?o	response_type=codeo&scope=signatureo&client_id=45f7a7ea-f1ce-49a2-a061-f8bed9ddf945&redirect_uri=http://localhost:3000/newQuote';
      }}/>
      <Route>
        <ErrorPage />
      </Route>
    </Switch>
  );
}