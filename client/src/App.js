import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/user/Dashboard";
import BusinessDashboard from "./components/business/Dashboard"

import { Navbar, Nav, NavDropdown } from "react-bootstrap";



if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }

}

class App extends Component {
  render() {

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
              <Navbar.Brand className="material-icons">fastfood </Navbar.Brand>
              <Navbar.Brand href="/" >ReadyEats</Navbar.Brand>

              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">

                </Nav>
                <Nav>
                  <Nav.Link href="/register">Register</Nav.Link>
                  <Nav.Link href="login">Login</Nav.Link>

                </Nav>
              </Navbar.Collapse>
            </Navbar>

            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" role="user" component={Dashboard} />
              <PrivateRoute exact path="/businessdashboard" role="business" component={BusinessDashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>

    );
  }
}

export default App;