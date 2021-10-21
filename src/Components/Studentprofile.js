import { Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { db } from "../fire";
import MyLearning from "./MyLearning";

function Studentprofile(props) {
  const [name, setName] = useState();
  const { currentUser } = useAuth();
  const getName = () => {
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        setName(doc.data().name);
      });
  };
  useEffect(() => {
    getName();
  }, []);
  console.log(name);
  return (
    <div>
      <Box
        style={{
          marginTop: "60px",
          height: "150px",
          backgroundColor: "#3e4145",
        }}
      >
        <h1
          style={{
            textAlign: "left",
            color: "white",
            paddingLeft: "50px",
            paddingTop: "30px",
          }}
        >
          Welcome {name}
        </h1>
      </Box>
      <Box style={{ marginTop: "50px" }}>
        <Typography variant="h5"> Courses you have enrolled</Typography>
        <MyLearning />
      </Box>
    </div>
  );
}

export default Studentprofile;
