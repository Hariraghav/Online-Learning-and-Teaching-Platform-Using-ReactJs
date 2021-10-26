import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { db } from "../fire";
import { useLocation } from "react-router";
import { useAuth } from "../AuthContext";
import { Alert } from "@material-ui/lab";
function MyLearning(props) {
  const [courses, setCourses] = useState([]);
  const { logout, currentUser } = useAuth();
  const loc = useLocation();

  useEffect(() => {
    getCouses();
  }, []);
  const getCouses = () => {
    db.collection("courses")
      .where("EnrolledBy", "array-contains-any", [currentUser.uid])
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
          Please enroll in a course to start learnng!
        </Alert>
      </div>
    );
  }
}

export default MyLearning;
