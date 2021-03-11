import React, {useState, useEffect} from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Routes from "./Routes";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap";
import {useHistory} from "react-router-dom";
import {AppContext} from "./libs/contextLib";
import {onError} from "./libs/errorLib";
import {Auth} from "aws-amplify";

function App() {
  const history = useHistory();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  /* useEffect reruns function when variables change */
  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }
    
    setIsAuthenticating(false);
  }
  
  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/login");
  }

  return (
    !isAuthenticating && (
      <div className="App container py-3">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
            <LinkContainer to="/">
              <Navbar.Brand className="font-weight-bold text-muted">
                RML CRM Application
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Nav activeKey={window.location.pathname}>
                {isAuthenticated ? 
                  (
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  ) 
                : (
                  <><LinkContainer to="/login"><Nav.Link>Login</Nav.Link></LinkContainer></>
                )}
                  {isAuthenticated ? 
                  (
                    <><LinkContainer to="/customer/new"><Nav.Link>Add Customer</Nav.Link></LinkContainer></>
                  ) 
                : (
                  <></>
                )}
              </Nav>
            </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
      </div>
    )
  );
}

export default App;