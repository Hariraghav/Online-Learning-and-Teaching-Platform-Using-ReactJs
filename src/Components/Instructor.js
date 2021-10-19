import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  makeStyles,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import image2 from "./image2.jpg";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import InstructorBody from "./InstructorBody";
import AddCourse from "./AddCourse";
import SearchIcon from "@material-ui/icons/Search";
import { useAuth } from "../AuthContext";
import { db } from "../fire";
import MyCourses from "./MyCourses";
import UpdateCourse from "./UpdateCourse";
const useStyles = makeStyles((theme) => ({
  /*   container: {
    marginTop: theme.spacing(20),
  }, */
  search: {
    marginLeft: theme.spacing(16),
    width: 800,
  },
  image: {
    marginTop: theme.spacing(7),
  },
  para: {
    marginTop: theme.spacing(-4),
  },
  textblock: {
    position: "absolute",
    top: 150,
    left: 50,
    backgroundColor: "white",
    color: "black",
    paddingLeft: 20,
    paddingRight: 20,
  },
  picon: {
    marginRight: theme.spacing(0),
    marginLeft: "auto",
  },
  cicon: {
    marginLeft: theme.spacing(10),
  },
}));
function Instructor(props) {
  const classes = useStyles();
  const { logout, currentUser } = useAuth();
  const [name, setName] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const getName = () => {
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        setName(doc.data().name);
      });
  };
  getName();
  const handlelogout = () => {
    logout();
  };
  return (
    <Router>
      <div>
        <AppBar position="absolute" color="white">
          <Toolbar>
            <Link
              to="/instructor"
              style={{
                textTransform: "none",
                color: "black",
                textDecoration: "none",
              }}
            >
              <Typography
                style={{
                  fontFamily: "cursive",
                  textTransform: "none",
                  color: "black",
                  textDecoration: "none",
                }}
                variant="h5"
              >
                Learny
              </Typography>
            </Link>
            <TextField
              className={classes.search}
              id="input-with-icon-textfield"
              label="Search"
              variant="outlined"
              type="search"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              component={Link}
              to="/instructor/mycourses"
              className={classes.lbutton}
              style={{ textTransform: "none", marginLeft: "40px" }}
            >
              My Courses
            </Button>

            <IconButton onClick={handleClick} className={classes.picon}>
              {/* <AccountCircleIcon/> */}
              <Avatar
                style={{
                  height: "30px",
                  width: "30px",
                  fontSize: "10px",
                  backgroundColor: "#676e69",
                }}
              >
                <b>{name.charAt(0).concat(name.charAt(1)).toUpperCase()}</b>
              </Avatar>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={(handleClose, handlelogout)}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
      <Route exact path="/instructor" component={InstructorBody} />
      <Route path="/instructor/createCourse" component={AddCourse} />
      <Route path="/instructor/mycourses" component={MyCourses} />
      <Route path="/instructor/update" component={UpdateCourse} />
    </Router>
  );
}

export default Instructor;
