import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Card,
  Grid,
  IconButton,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { BrowserRouter as Router, Link } from "react-router-dom";
import app, { db } from "../fire";
import { useAuth } from "../AuthContext";
import firebase from "firebase/app";
import FavoriteSharpIcon from "@material-ui/icons/FavoriteSharp";
import FavoriteBorderSharpIcon from "@material-ui/icons/FavoriteBorderSharp";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  media: {
    // this is the`className` passed to `CardMedia` later
    height: 140, // as an example I am modifying width and height
    width: "100%",
    /* marginLeft: "33%", */
  },
}));

function CourseCard({ id, name, description, image, video, test, author }) {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [enrollStatus, setEnrollStatus] = useState(false);
  const [enrolla, setEnrolla] = useState([]);
  const [wisha, setWisha] = useState([]);
  const [wish, setWish] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleEnroll = () => {
    console.log("hello");
    console.log(currentUser.uid);
    db.collection("courses")
      .doc(id)
      .update({
        EnrolledBy: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
      });
  };
  const handleWishlist = () => {
    /* setWish(!wish); */
    db.collection("courses")
      .doc(id)
      .update({
        WishlistedBy: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
      });
  };
  const handleWishlistRemove = () => {
    /* setWish(!wish); */
    db.collection("courses")
      .doc(id)
      .update({
        WishlistedBy: firebase.firestore.FieldValue.arrayRemove(
          currentUser.uid
        ),
      });
  };
  useLayoutEffect(() => {
    estatus();
    enrollb();
    wstatus();
    wishb();
  }, [enrolla]);
  console.log(test);

  /*   useEffect(() => {
    wstatus();
    wishb();
  }, [wisha]); */

  const estatus = () => {
    db.collection("courses")
      .doc(id)
      .get()
      .then((doc) => {
        setEnrolla(doc.data().EnrolledBy);
      });
  };
  const enrollb = () => {
    if (enrolla.indexOf(currentUser.uid) !== -1) {
      setEnrollStatus(true);
    } else {
      setEnrollStatus(false);
    }
  };
  const wstatus = () => {
    db.collection("courses")
      .doc(id)
      .get()
      .then((doc) => {
        setWisha(doc.data().WishlistedBy);
      });
  };
  const wishb = () => {
    if (wisha.indexOf(currentUser.uid) !== -1) {
      setWish(true);
    } else {
      setWish(false);
    }
  };
  const handlelink = (e) => {
    if (!enrollStatus) {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <React.Fragment>
      <Grid item xs="3">
        <Card id={id} sx={{ maxWidth: 345 }}>
          <CardMedia
            className={classes.media}
            component="img"
            alt={name}
            /* width="100%" */
            /*  height="140" */
            image={image}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
            {/*     <Typography variant="body2" color="text.secondary">
          {description}
        </Typography> */}
          </CardContent>
          <CardActions>
            <Grid
              container
              spacing={3}
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <Link
                  style={{
                    marginBottom: "0px",
                    textDecoration: "none",
                    fontSize: "13px",
                    color: "black",
                  }}
                  to={{
                    pathname: "courses",
                    state: {
                      id: id,
                      name: name,
                      description: description,
                      video: video,
                      test: test,
                      author: author,
                    },
                  }}
                  onClick={handlelink}
                >
                  VIEW
                </Link>
              </Grid>

              <Grid item>
                <Button
                  onClick={handleEnroll}
                  style={{
                    textDecoration: "none",
                    fontSize: "13px",
                    marginBottom: "0px",
                  }}
                  disabled={enrollStatus}
                >
                  {enrollStatus ? "Enrolled" : "Enroll"}
                </Button>
                {/*  </Link> */}
              </Grid>
              {wish ? (
                <IconButton onClick={handleWishlistRemove}>
                  <FavoriteSharpIcon style={{ color: "black" }} />
                </IconButton>
              ) : (
                <IconButton onClick={handleWishlist}>
                  <FavoriteBorderSharpIcon style={{ color: "black" }} />
                </IconButton>
              )}

              {/*  </Link> */}
            </Grid>
          </CardActions>
        </Card>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Enroll the course to view the content
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default CourseCard;
