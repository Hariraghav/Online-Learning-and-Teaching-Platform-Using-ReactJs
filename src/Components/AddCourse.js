import {
  AppBar,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  Input,
  LinearProgress,
  Tab,
  Tabs,
  TextField,
  FormControlLabel,
  Toolbar,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  TabPanel,
  TabContext,
  TabList,
  Alert,
  AlertTitle,
} from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import app from "../fire";
import { db } from "../fire";
import "firebase/storage";
import { useAuth } from "../AuthContext";

export default function AddCourse() {
  const [value, setValue] = useState(1);
  const [showprev, setShowprev] = useState(false);
  const [prev, setPrev] = useState("none");
  const [next, setNext] = useState("block");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [videourl, setVideourl] = useState("");
  const [test, setTest] = useState("");
  const [progress, setProgress] = useState(0);
  const [errorimg, setErrorimg] = useState();
  const [progressOfVideo, setProgressOfVideo] = useState(0);
  const [dimg, setDimg] = useState("none");
  const [dvideo, setDvideo] = useState("none");
  const [valert, setValert] = useState("none");
  const [ialert, setIalert] = useState("none");
  const [falert, setFalert] = useState("none");
  const [submit, setSubmit] = useState(true);
  const [categories, setCategories] = useState([]);
  const { logout, currentUser } = useAuth();
  useEffect(() => {
    getCategory();
  }, []);
  const getCategory = () => {
    db.collection("category")
      .doc("categories")
      .onSnapshot((doc) => {
        setCategories(doc.data().categories);
      });
  };
  /*   const handleChange = (event, newValue) => {
    setValue(newValue);
  }; */
  const handleClick = (e) => {
    if (value !== 6) {
      setValue(value + 1);
    }
    if (value >= 1) {
      setPrev("block");
    }
    if (value == 5) {
      setNext("none");
    }
  };
  const handlePrev = (e) => {
    if (value !== 1) {
      setValue(value - 1);
    }
    if (value == 2) {
      setPrev("none");
    }
    if (value <= 6) {
      setNext("block");
    }
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleTest = (e) => {
    setTest(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const uploadImage = (e) => {
    setDimg("block");
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => setErrorimg(error),
      () => {
        fileRef.getDownloadURL().then((url) => setImageurl(url));
        setIalert("flex");
      }
    );
  };
  console.log(imageurl);
  const togglefalert = () => {
    setFalert("flex");
  };
  const uploadVideo = (e) => {
    setDvideo("block");
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressOfVideo(progress);
      },
      (error) => setErrorimg(error),
      () => {
        fileRef.getDownloadURL().then((url) => setVideourl(url));
        setValert("flex");
        setSubmit(false);
      }
    );
  };
  console.log(videourl);
  const setCourse = async (e) => {
    await db.collection("courses").add({
      name: title,
      description: description,
      category: category,
      image: imageurl,
      video: videourl,
      author: currentUser.uid,
      test: test,
      EnrolledBy: [],
      WishlistedBy: [],
    });
  };
  console.log(title);
  return (
    <Box
      style={{ margin: "auto", width: "100%", marginTop: "70px" }}
      sx={{ width: "100%", typography: "body1" }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList /* onChange={handleChange} */ centered>
            <Tab style={{ textTransform: "none" }} label="Title" value={1} />
            <Tab style={{ textTransform: "none" }} label="Category" value={2} />
            <Tab
              style={{ textTransform: "none" }}
              label="Description"
              value={3}
            />
            <Tab
              style={{ textTransform: "none" }}
              label="Course Avatar"
              value={4}
            />
            <Tab style={{ textTransform: "none" }} label="Video" value={5} />
            <Tab
              style={{ textTransform: "none" }}
              label="Practice Test"
              value={6}
            />
          </TabList>
          <Divider />
        </Box>
        <Box style={{ alignItems: "center", textAlign: "center" }}>
          <TabPanel value={1}>
            <h1>How about a working title?</h1>
            <p>
              It's ok if you can't think of a good title now. You can change it
              later.
            </p>
            <TextField
              onChange={handleTitle}
              value={title}
              style={{ width: "50%", marginTop: "50px" }}
              variant="outlined"
            ></TextField>
          </TabPanel>
          <TabPanel value={2}>
            <h1>What category best fits the knowledge you'll share?</h1>
            <p>
              If you're not sure about the right category, you can change it
              later.
            </p>
            {/*            <TextField
              onChange={handleCategory}
              value={category}
              style={{ width: "50%", marginTop: "50px" }}
              variant="outlined"
            ></TextField> */}
            <FormControl style={{ alignItems: "center" }}>
              <Select
                style={{ width: "200%" }}
                value={category}
                onChange={handleCategory}
                inputProps={{
                  name: "age",
                  id: "age-native-simple",
                }}
              >
                {/* <option aria-label="None" value="" /> */}
                {categories.map((c) => (
                  <MenuItem value={c}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </TabPanel>
          <TabPanel value={3}>
            <h1>Describe your course in few words</h1>
            <p>
              It's ok if you can't think of a good description now. You can
              change it later.
            </p>
            <TextField
              onChange={handleDescription}
              value={description}
              style={{ width: "50%", marginTop: "50px" }}
              variant="outlined"
            ></TextField>
          </TabPanel>
          <TabPanel value={4}>
            <h1>Select a beautiful avatar for your course</h1>
            <p>
              It's ok if you don't have a nice avatar now. You can change it
              later.
            </p>
            <Box mt={5}>
              <label style={{ alignItems: "center", marginTop: "100px" }}>
                <Input
                  onChange={uploadImage}
                  style={{ display: "none" }}
                  accept="image/*"
                  type="file"
                />
                <Button
                  style={{ backgroundColor: "black", color: "white" }}
                  variant="outlined"
                  component="span"
                >
                  Upload
                </Button>
              </label>
              <Box mt={2}>
                <LinearProgress
                  color="primary"
                  style={{
                    display: dimg,
                    marginTop: "20px",
                    width: "50%",
                    margin: "auto",
                  }}
                  variant="determinate"
                  value={progress}
                />
              </Box>
              <Box mt={2}>
                <Alert
                  style={{ display: ialert, width: "10%", margin: "auto" }}
                  severity="success"
                >
                  <AlertTitle>Success!</AlertTitle>
                </Alert>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={6}>
            <h1>Wollah! You are only a step away to create a new course</h1>
            <p>Provide the link of the practice test to finslize the course</p>
            <Box mt={3}>
              <TextField
                onChange={handleTest}
                value={test}
                style={{ width: "50%", marginTop: "50px" }}
                variant="outlined"
              ></TextField>
              <Box mt={2}>
                <Button
                  color="primary"
                  style={{ marginTop: "40px" }}
                  variant="outlined"
                  onClick={() => {
                    setCourse();
                    togglefalert();
                  }}

                  /* disabled={submit} */
                >
                  Finalize
                </Button>
                <Box mt={2}>
                  <Alert
                    style={{ display: falert, width: "10%", margin: "auto" }}
                    severity="success"
                  >
                    <AlertTitle>Success!</AlertTitle>
                  </Alert>
                </Box>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={5}>
            <h1>Mesmerize the learner by an amazing content</h1>
            <p>Upload your course video </p>
            <Box mt={5}>
              <label style={{ alignItems: "center", marginTop: "100px" }}>
                <Input
                  onChange={uploadVideo}
                  style={{ display: "none" }}
                  accept="image/*"
                  type="file"
                />
                <Button
                  style={{ backgroundColor: "black", color: "white" }}
                  variant="outlined"
                  component="span"
                >
                  Upload
                </Button>
              </label>
            </Box>
            <Box mt={2}>
              <LinearProgress
                color="primary"
                style={{
                  display: dvideo,
                  marginTop: "20px",
                  width: "50%",
                  margin: "auto",
                }}
                variant="determinate"
                value={progressOfVideo}
              />
              <Box mt={2}>
                <Alert
                  style={{ display: valert, width: "10%", margin: "auto" }}
                  severity="success"
                >
                  <AlertTitle>Success!</AlertTitle>
                </Alert>
              </Box>
            </Box>
          </TabPanel>
        </Box>
        <AppBar
          position="fixed"
          color="white"
          style={{ top: "auto", bottom: 0 }}
        >
          <Toolbar>
            <Button
              size="large"
              style={{
                textTransform: "none",
                margin: "auto",
                marginLeft: "0",
                width: "150px",
                backgroundColor: "black",
                color: "white",
                display: prev,
              }}
              variant="outlined"
              onClick={handlePrev}
            >
              Previous
            </Button>
            <Button
              size="large"
              style={{
                textTransform: "none",
                margin: "auto",
                marginRight: "0",
                width: "150px",
                backgroundColor: "black",
                color: "white",
                display: next,
              }}
              variant="outlined"
              onClick={handleClick}
            >
              Continue
            </Button>
          </Toolbar>
        </AppBar>
      </TabContext>
    </Box>
  );
}
