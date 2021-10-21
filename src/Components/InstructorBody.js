import { AppBar, Box, Button, makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import image2 from "./image2.jpg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
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
}));
function InstructorBody(props) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.container}>
        <img
          className={classes.image}
          width="100%"
          height="552"
          src={image2}
        ></img>
        <div
          style={{ backgroundColor: "inherit" }}
          className={classes.textblock}
        >
          <h1
            style={{
              fontSize: "60px",
              fontFamily: "Playfair Display",
              lineHeight: "50px",
            }}
          >
            Come teach <br /> with us
          </h1>
          <p
            className={classes.para}
            style={{ fontSize: "20px" /* lineHeight: "40px"  */ }}
          >
            Become an instructor and change <br />
            lives — including your own
          </p>
          <Button
            fullWidth
            href="/instructor/createCourse"
            style={{
              textTransform: "none",
              backgroundColor: "black",
              color: "white",
              textAlign: "center",
              height: "50px",
            }}
          >
            <b> Create new course</b>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InstructorBody;
