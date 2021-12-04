import React, { useEffect, useState } from "react";
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
  Avatar,
  Divider,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useAuth } from "../AuthContext";
import image from "./image.jpg";
import { db } from "../fire";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  picon: {
    marginRight: theme.spacing(0),
    marginLeft: "auto",
  },
  cbutton: {
    marginLeft: theme.spacing(4),
  },
  search: {
    marginLeft: theme.spacing(7),
    width: 450,
  },
  lbutton: {
    marginLeft: theme.spacing(5),
  },
  wbutton: {
    marginLeft: theme.spacing(3),
  },
  img: {
    marginTop: theme.spacing(100),
  },
  container: {
    position: "relative",
  },

  textblock: {
    position: "absolute",
    top: 50,
    left: 50,
    backgroundColor: "white",
    color: "black",
    paddingLeft: 20,
    paddingRight: 20,
  },
  gets: {
    marginTop: theme.spacing(5),
  },
}));
function Topnav(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const { logout, currentUser } = useAuth();
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  useEffect(() => {
    getCategory();
  }, []);
  const getCategory = () => {
    db.collection("category")
      .doc("categories")
      .onSnapshot((doc) => {
        setCategory(doc.data().categories);
      });
  };
  console.log(category);

  const getName = () => {
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        setName(doc.data().name);
      });
  };
  getName();
  console.log(name);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const handlelogout = () => {
    logout();
  };
  return (
    <div>
      <AppBar
        /* className = {classes.appbar} */ position="absolute"
        color="white"
      >
        <Toolbar>
          <Link
            to="/"
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
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick1}
            className={classes.cbutton}
            style={{ textTransform: "none" }}
          >
            Categories
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl1}
            keepMounted
            open={Boolean(anchorEl1)}
            onClose={handleClose1}
          >
            {category.map((c) => (
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "13px",
                  color: "black",
                }}
                to={{
                  pathname: "categorywise",
                  state: {
                    c: c,
                  },
                }}
              >
                <MenuItem onClick={handleClose1}>{c}</MenuItem>
              </Link>
            ))}

            {/*    <MenuItem onClick={handleClose1}>Web Development</MenuItem>
            <MenuItem onClick={handleClose1}>Android App Development</MenuItem>
            <MenuItem onClick={handleClose1}>Progamming Languages</MenuItem> */}
          </Menu>
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
            to="/mylearning"
            className={classes.lbutton}
            style={{ textTransform: "none" }}
          >
            My learning
          </Button>

          <Button
            component={Link}
            to="/wishlist"
            className={classes.wbutton}
            style={{ textTransform: "none" }}
          >
            Wishlist
          </Button>
          <Button
            component={Link}
            to="/brainteaser"
            className={classes.wbutton}
            style={{ textTransform: "none" }}
          >
            Brain Teaser
          </Button>
          <Button
            component={Link}
            to="/chat"
            className={classes.wbutton}
            style={{ textTransform: "none" }}
          >
            Chat
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
            <MenuItem onClick={handleClose}>
              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "black" }}
              >
                My Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={(handleClose, handlelogout)}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Divider />
    </div>
  );
}

export default Topnav;
