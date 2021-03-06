import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Routes from "./Routes";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

function App() {
  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <Navbar.Brand href="/" className="font-weight-bold text-muted">
          RML CRM Application
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            {/*/ Link Container to avoid refreshing for SPA */}
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        {/* Collapse for mobile devices*/}
        </Navbar.Collapse> 
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;