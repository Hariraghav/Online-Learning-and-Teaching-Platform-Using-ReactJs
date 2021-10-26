import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { db } from "../fire";
import { useLocation } from "react-router";
import { Alert } from "@material-ui/lab";
function CategoryWiseCourses(props) {
  const [courses, setCourses] = useState([]);
  const loc = useLocation();

  useEffect(() => {
    getCouses();
  }, [loc.state.c]);
  const getCouses = () => {
    db.collection("courses")
      .where("category", "==", loc.state.c)
      .onSnapshot((quereySnapshot) => {
        setCourses(
          quereySnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            image: doc.data().image,
            video: doc.data().video,
          }))
        );
      });
  };
  if (courses.length > 0) {
    return (
      <div style={{ marginTop: "75px" }}>
        <Grid container spacing={2}>
          {courses.map((courses) => (
            <CourseCard
              name={courses.name}
              description={courses.description}
              id={courses.id}
              image={courses.image}
              video={courses.video}
            />
          ))}
        </Grid>
      </div>
    );
  } else {
    return (
      <div style={{ marginTop: "200px" }}>
        <Alert
          style={{
            width: "250px",

            margin: "auto",
          }}
          severity="info"
        >
          No course is available yet in this category!
        </Alert>
      </div>
    );
  }
}

export default CategoryWiseCourses;
