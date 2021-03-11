import React, {useState, useEffect} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import {useAppContext} from "../libs/contextLib";
import {onError} from "../libs/errorLib";
import "./Home.css";

export default function Home() {
    const [customers, setCustomers] = useState([]);
    const {isAuthenticated} = useAppContext();
    const [isLoading, setIsLoading] = useState(true);

    function renderCustomersList(customers) {
        return null;
    }

    function renderLander(){
        return (
            <div className="lander">
                <h1>RML CRM Application</h1>
                <p className="text-muted">Customer Managment Application</p>
            </div>
        );
    }

    function rednerCustomers(){
        return (
            <div className="customers">
                <h2 className="pb-3 mt-4 mb-3 border-bottom">Customers List</h2>
                <ListGroup>{!isLoading && renderCustomersList(customers)}</ListGroup>
            </div>  
        );
    }

    return (
        <div className="Home">
            {isAuthenticated ? rednerCustomers():renderLander()}
        </div>
    );
}