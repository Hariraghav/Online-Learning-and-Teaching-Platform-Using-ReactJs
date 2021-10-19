import React, { Component } from "react";
import "./App.css";
import fire from "./fire";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import UserWindow from "./Components/UserWindow";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PrivateRoute1 from "./PrivateRoute";
import Home from "./Components/home";
import Instructor from "./Components/Instructor";
import { useAuth } from "./AuthContext";
import Courses from "./Components/Courses";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/signIn" component={SignIn} />
          <Route exact path="/signUp" component={SignUp} />
          <PrivateRoute path="/instructor" component={Instructor} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
