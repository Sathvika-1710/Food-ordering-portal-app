import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BReg = (props) => {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [contact, setcontact] = useState("");
    const [age, setage] = useState("");
    const [batch, setbatch] = useState("");
    const [pw, setpw] = useState("");

    const onChangeUsername = (event) => {
        setname(event.target.value);
    };

    const onChangeemail = (event) => {
        setemail(event.target.value);
    };

    const onChangepw = (event) => {
        setpw(event.target.value);
    };

    const onChangecontact = (event) => {
        setcontact(event.target.value);
    };

    const onChangeage = (event) => {
        setage(event.target.value);
    };

    const onChangebatch = (event) => {
        setbatch(event.target.value);
    };

    const resetInputs = () => {
        setname("");
        setemail("");
        setcontact("");
        setage("");
        setbatch("");
        setpw("");
    };

    
    var present = 0;
    const onSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            name: name,
            email: email,
            contact: contact,
            age:age,
            batch:batch,
            password:pw
        };

        axios
            .post("http://localhost:4000/user/bregister", newUser)
            .then((response) => {
                console.log(response.data);
                //failure
                if (response.data.val === 0) {
                    alert("Already registered!!\nLogin now!!!");
                }
                //success
                else {
                    alert("Created "+response.data.name);              
                    present = 1;
                }

            });

        resetInputs();
    };

    
    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={onChangeUsername}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={onChangeemail}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Contact Number"
                    variant="outlined"
                    value={contact}
                    onChange={onChangecontact}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Age"
                    variant="outlined"
                    value={age}
                    onChange={onChangeage}
                />

            </Grid>
            <Grid item xs={12} container align={"center"} >

                <Box container align={"center"}  sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Country</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={batch}
                            label="Batch"
                            onChange={onChangebatch}
                        >
                            <MenuItem value={1}>India</MenuItem>
                            <MenuItem value={2}>USA</MenuItem>
                            <MenuItem value={3}>ENGLAND</MenuItem>
                            <MenuItem value={4}>IRAN</MenuItem>
                            <MenuItem value={5}>IRAQ</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            
            <Grid item xs={12}>
                <TextField
                    label="password"
                    variant="outlined"
                    value={pw}
                    type="password"
                    onChange={onChangepw}
                />

            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={onSubmit}>
                    Register
                </Button>
            </Grid>
        </Grid>
    );
};


export default BReg;