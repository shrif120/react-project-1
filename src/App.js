import React, { Component, Fragment } from "react";
import Navbar from "../src/components/NavbarComponent/Navbar.jsx";
import { Switch, Route, Redirect } from "react-router";
import Login from "./components/LoginComponent/Login.jsx";
import Register from "./components/RegisterComponent/Register.jsx";
import Home from "./components/HomeComponent/Home.jsx";
import Notfound from "./components/NotfoundComponent/Notfound.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
export default class App extends Component {
  state = { isLoggedIn: false };
  isAuth = (isLogged) => {
    this.setState({ isLoggedIn: isLogged });
  };
  render() {
    return (
      <Fragment>
        <Navbar></Navbar>
        <Switch>
          <ProtectedRoute
            isAuth={this.state.isLoggedIn}
            path="/home"
            component={Home}
          />
          {/* <Route path="/home" component={Home} /> */}
          <Route
            path="/login"
            render={(props) => <Login {...props} isAuth={this.isAuth} />}
          />
          <Route path="/register" component={Register} />
          <Redirect exact from="/" to="login" />
          <Route path="*" component={Notfound} />
        </Switch>
      </Fragment>
    );
  }
}
