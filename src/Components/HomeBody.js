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
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useAuth } from "../AuthContext";
import image from "./image.jpg";
import CourseCard from "./CourseCard";
import { db } from "../fire";

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
    width: 500,
  },
  lbutton: {
    marginLeft: theme.spacing(29),
  },
  wbutton: {
    marginLeft: theme.spacing(3),
  },
  img: {
    marginTop: theme.spacing(8),
  },
  container: {
    position: "relative",
  },

  textblock: {
    position: "absolute",
    top: 100,
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
function HomeBody(props) {
  const classes = useStyles();
  const [courses, setCourses] = useState([]);
  const { logout, currentUser } = useAuth();
  useEffect(() => {
    getCouses();
  }, []);
  const getCouses = () => {
    db.collection("courses").onSnapshot((quereySnapshot) => {
      setCourses(
        quereySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          image: doc.data().image,
          video: doc.data().video,
          test: doc.data().test,
        }))
      );
    });
  };

  return (
    <div>
      <div className={classes.container}>
        <img
          className={classes.img}
          src={image}
          width="120%" /* height="350" */
        />
        <Box boxShadow={4} className={classes.textblock}>
          <h1 style={{ fontSize: "40px", fontFamily: "Playfair Display" }}>
            Experts within reach
          </h1>
          <p style={{ fontSize: "20px" }}>
            Learn from knowledgeable instructors around the world
          </p>
        </Box>
      </div>
      {/* <Button color="primary" style = {{backgroundColor:"#04d3b5"}} variant = "outlined"className = {classes.gets}style={{textTransform: 'none'}}> Get Started</Button>  */}
      <div>
        <h2 style={{ float: "left", marginLeft: "10px" }}>
          {" "}
          What to Learn Next?
        </h2>
        <Grid container spacing={2}>
          {courses.map((courses) => (
            <CourseCard
              name={courses.name}
              description={courses.description}
              id={courses.id}
              image={courses.image}
              video={courses.video}
              test={courses.test}
            />
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default HomeBody;
