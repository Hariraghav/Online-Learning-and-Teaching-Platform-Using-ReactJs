import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  makeStyles,
  Tab,
} from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { Assessment } from "@material-ui/icons";
import { useAuth } from "../AuthContext";
import { db } from "../fire";

const useStyles = makeStyles((theme) => ({
  video: {
    marginRi: theme.spacing(0),
  },
}));
function Courses(props) {
  const loc = useLocation();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handlelink = (e) => {
    window.location.href = loc.state.test;
    return null;
  };
  const [name, setName] = useState();
  const { currentUser } = useAuth();
  const getName = () => {
    db.collection("users")
      .doc(loc.state.author)
      .get()
      .then((doc) => {
        setName(doc.data().name);
      });
  };
  useEffect(() => {
    getName();
  }, []);

  return (
    <div>
      <Box boxShadow={1}>
        <video width="100%" height="460" controls>
          <source src={loc.state.video} type="video/mp4" />
        </video>
      </Box>

      <Box
        style={{ margin: "auto", width: "80%" }}
        sx={{ width: "100%", typography: "body1" }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
            >
              <Tab
                style={{ textTransform: "none" }}
                label="Overview"
                value="1"
              />
              <Tab
                style={{ textTransform: "none" }}
                label="Assessments"
                value="2"
              />
              <Tab
                style={{ textTransform: "none" }}
                label="About author"
                value="3"
              />
            </TabList>
            <Divider />
          </Box>
          <Box style={{ alignItems: "center", textAlign: "center" }}>
            <TabPanel value="1">
              <Grid
                container
                direction="column"
                spacing={2}
                /* alignItems="center" */
                /* justifyContent="center" */
              >
                <Grid item style={{ float: "left" }}>
                  Course Description:
                </Grid>
                <Grid item>{loc.state.description}</Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="2">
              <Chip
                icon={<Assessment />}
                clickable
                label="Take Test"
                variant="outlined"
                onClick={handlelink}
                color="primary"
              />
            </TabPanel>
            <TabPanel value="3">Author Name : {name}</TabPanel>
          </Box>
        </TabContext>
      </Box>
    </div>
  );
}

export default Courses;
