import React, { useEffect, useState } from "react";
import Test from "./Test";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Grid,
  Box,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useAuth } from "../AuthContext";
import image from "./image.jpg";
import Topnav from "./topnav";
import HomeBody from "./HomeBody";
import { db } from "../fire";
import CourseCard from "./CourseCard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import Courses from "./Courses";
import CategoryWiseCourses from "./categoryWiseCourses";
import MyLearning from "./MyLearning";
import WishList from "./Wishlist";
import Studentprofile from "./Studentprofile";
import BrainTeaser from "./BrainTeaser";
import Chat from "./Chat";

const useStyles = makeStyles((theme) => ({}));
function Home(props) {
  const classes = useStyles();

  return (
    <Router>
      <div>
        <Topnav></Topnav>
        <Switch>
          <Route exact path="/" component={HomeBody}></Route>
          <Route path="/brainteaser" component={BrainTeaser} />
          <Route path="/courses" component={Courses} />
          <Route path="/categorywise" component={CategoryWiseCourses} />
          <Route path="/mylearning" component={MyLearning} />
          <Route path="/wishlist" component={WishList} />
          <Route path="/test" component={Test} />
          <Route path="/profile" component={Studentprofile} />
          <Route path="/chat" component={Chat} />
        </Switch>
      </div>
    </Router>
  );
}

export default Home;
