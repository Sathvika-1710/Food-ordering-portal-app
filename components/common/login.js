import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "../templates/Navbar";

const Login = (props) => {
  const navigate = useNavigate();

  const [pw, setpw] = useState("");
  const [email, setEmail] = useState("");

  const onChangepw = (event) => {
    setpw(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const resetInputs = () => {
    setpw("");
    setEmail("");
  };



  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      pw: pw,
      email: email,
    };

    axios
      .post("http://localhost:4000/user/login", newUser)
      .then((response) => {
        console.log(response.data);
        if (response.data.val === 0) {
          alert("Invalid Credentials!!");
        }
        else if (response.data.val === 1) {
          localStorage.setItem("useremail", email);
          navigate("/buyer");

        }
        else if (response.data.val === 2) {
          localStorage.setItem("shop",response.data.name);
          localStorage.setItem("useremail", email);
          console.log(email);
          navigate("/vendor");

        }
      });

    resetInputs();
  };


  return (
    <div>
      <Navbar />
      <div className="container">
      </div>
      <Grid container align={"center"} spacing={2}>

        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={onChangeEmail}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            value={pw}
            onChange={onChangepw}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={onSubmit}>
            Login
          </Button>
        </Grid>
      </Grid>
    </div>

  );
};


export default Login;