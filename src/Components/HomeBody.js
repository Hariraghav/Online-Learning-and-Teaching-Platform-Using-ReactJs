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
import image from "./image1.jpg";
import image1 from "./image3.jpg";
import CourseCard from "./CourseCard";
import { db } from "../fire";
import { Divider } from "@material-ui/core";
import image2 from "./companies.jpg";
import image3 from "./image4.jpg";
import transform from "./transform.jpg";
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
          width="100%" /* height="350" */
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
      <Divider style={{ marginTop: "20px" }}></Divider>
      <Box>
        <img
          className={classes.img}
          src={image1}
          style={{ float: "left", marginLeft: "100px" }}
          width="30%" /* height="350" */
        />
        <div
          style={{
            textAlign: "left",
            paddingLeft: "700px",
          }}
        >
          <h1 style={{ paddingTop: "200px" }}>Become an instructor</h1>
          <p style={{ fontSize: "20px" }}>
            Instructors from around the world teach
            <br /> millions of students on Udemy. We provide
            <br /> the tools and skills to teach what you love.
          </p>
        </div>
      </Box>
      <Box style={{ marginTop: "170px" }}>
        <h2>Trusted by companies of all sizes</h2>
        <img src={image2} width="35%" />
      </Box>
      <Box>
        <img
          src={image3}
          style={{ float: "right", marginRight: "100px" }}
          width="30%"
        />
        <div
          style={{
            textAlign: "left",
            paddingLeft: "90px",
            paddingTop: "100px",
          }}
        >
          <h1>Get Learny Bussiness</h1>
          <p style={{ fontSize: "20px" }}>
            Instructors from around the world teach
            <br /> millions of students on Udemy. We provide
            <br /> the tools and skills to teach what you love.
          </p>
        </div>
      </Box>
      <Box style={{ marginTop: "100px" }}>
        <img
          className={classes.img}
          src={transform}
          style={{ float: "left", marginLeft: "100px" }}
          width="30%" /* height="350" */
        />
        <div
          style={{
            textAlign: "left",
            paddingLeft: "700px",
          }}
        >
          <h1 style={{ paddingTop: "200px" }}>
            Transform your life
            <br /> through education
          </h1>
          <p style={{ fontSize: "20px" }}>
            Learners around the world are launching new
            <br /> careers, advancing in their fields, and enriching <br />
            their lives.
          </p>
        </div>
      </Box>
      <Box
        style={{ marginTop: "70px", backgroundColor: "black", height: "200px" }}
      ></Box>
    </div>
  );
}

export default HomeBody;
