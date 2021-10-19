import React, { useEffect, useLayoutEffect, useState } from "react";
import { Card, Grid, IconButton, makeStyles } from "@material-ui/core";
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

const useStyles = makeStyles((theme) => ({
  media: {
    // this is the`className` passed to `CardMedia` later
    height: 140, // as an example I am modifying width and height
    width: "100%",
    /* marginLeft: "33%", */
  },
}));

function CourseCardInstructor({ id, name, description, image, video }) {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [enrollStatus, setEnrollStatus] = useState(false);
  const [enrolla, setEnrolla] = useState([]);
  const [wisha, setWisha] = useState([]);
  const [wish, setWish] = useState(false);
  const handledelete = () => {
    db.collection("courses").doc(id).delete();
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
                    pathname: "/instructor/update",
                    state: {
                      id: id,
                      name: name,
                      description: description,
                      image: image,
                      video: video,
                    },
                  }}
                >
                  UPDATE
                </Link>
              </Grid>

              <Grid item>
                <Button
                  onClick={handledelete}
                  style={{
                    textTransform: "none",
                    textDecoration: "none",
                    fontSize: "13px",
                  }}
                >
                  DELETE
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
}

export default CourseCardInstructor;
