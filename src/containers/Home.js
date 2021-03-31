import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table"
import { useAppContext } from "../libs/contextLib";
import {onError} from "../libs/errorLib";
import "./Home.css";
import {API} from "aws-amplify";
import {BsFillPersonPlusFill, BsFillEnvelopeFill} from "react-icons/bs";
import {LinkContainer} from "react-router-bootstrap";
import {Link} from "react-router-dom";
import { ListGroupItem } from "react-bootstrap";

export default function Home() {
  const [customers, setCustomers] = useState([]);
  const [customerCount, setCustomerCount] = useState([]);
  const {isAuthenticated} = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const customers = await loadCustomers();
        const customers_json = customers.Items;
        const customerCount = customers.Count;
        setCustomerCount(customerCount);
        setCustomers(customers_json);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }
    onLoad();
  }, [isAuthenticated]);

function loadCustomers() {
  console.log(API.get("rml-crm-app", "/customers"));
  return API.get("rml-crm-app", "/customers");
}

function renderCustomersList(customers) {
  return (
    <>
      <LinkContainer to="/customer/new">
        <ListGroup.Item action className="py-3 text-nowrap text-truncate">
          <BsFillPersonPlusFill size={17} />
          <span className="ml-2 font-weight-bold">Create a new customer</span>
          <span className="ml-2 font-weight-bold float-right">Customers: {customerCount}</span>
        </ListGroup.Item>
      </LinkContainer>



      <LinkContainer to="/authenticateDocuSign">
        <ListGroup.Item action className="py-3 text-nowrap text-truncate">
          <BsFillEnvelopeFill size={17} />
          <span className="ml-2 font-weight-bold">Generate a Quote</span>
        </ListGroup.Item>
      </LinkContainer>
      <br></br>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Mailing Address</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(({customerId, customer_name, customer_phone_1, customer_address_1}) => (
          <LinkContainer key={customerId} to={`/customer/${customerId}`}>
            <tr action role="button">
              <td>{customer_name}</td>
              <td>{customer_phone_1}</td>
              <td>{customer_address_1}</td>
            </tr>
          </LinkContainer>
          ))}
        </tbody>
      </Table>
    </>
  );
}

  function renderLander() {
    return (
      <div className="lander">
        <h1>RML CRM App</h1>
        <p className="text-muted">Customer Management</p>
      </div>
    );
  }

  function renderCustomers() {
    return (
      <div className="customers">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Customers</h2>
        <ListGroup>{!isLoading && renderCustomersList(customers)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderCustomers() : renderLander()}
    </div>
  );
}