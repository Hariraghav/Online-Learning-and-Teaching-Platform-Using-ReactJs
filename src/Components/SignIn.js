import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from '../AuthContext';
import Alert from '@material-ui/lab/Alert';
import { InputLabel, Select,FormControl, MenuItem } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 30,
    paddingRight: 30,
    paddingBottom: 50,
    paddingLeft: 30,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#313330",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    marginTop: theme.spacing(2),
  },
  select: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(30),
  },

}));

export default function SignIn() {
  const classes = useStyles();
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login,userState } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [user, setUser] = React.useState("student");

  const handleChange = (event) => {
    setUser( event.target.value,
    );
    userState(event.target.value)
    
  };

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      if(user=="student"){
        history.push("/")
      }
      else{
        history.push("/instructor")
      }
      
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }


  return (
    <Container   maxWidth="xs" >
      <CssBaseline />
      <Box boxShadow ={1} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">as</InputLabel>
        <Select className ={classes.select}
         /*  native */

          value={user}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'age-native-simple',
          }}
        >
          {/* <option aria-label="None" value="" /> */}
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="instructor">Instructor</MenuItem>
        </Select>
      </FormControl>
        {error && <Alert className = {classes.alert}severity="error">{error}</Alert>}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            inputRef={emailRef}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            inputRef={passwordRef} 
            autoComplete="current-password"
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={handleSubmit}
            style = {{ backgroundColor : "#313330",color:"white"}}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link style = {{ color : "#313330"}} href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link style = {{ color : "#313330"}}href="/signUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>

    </Container>
  );
}