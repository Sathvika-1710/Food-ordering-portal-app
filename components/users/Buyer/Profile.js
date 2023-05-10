import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react"

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import BuyerNavbar from "../../templates/BuyerNav";

const BProfile = () => {
    const [email, setemail] = useState(localStorage.getItem("useremail"));
    const [users, setUsers] = useState([]);
    const [name, setname] = useState("");
    const [contact, setcontact] = useState("");
    const [age, setage] = useState("");
    const [batch, setbatch] = useState("");
    const [pw, setpw] = useState("");

    const newUser = {
        email: email,
    };

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

    useEffect(() => {
        axios
            .post("http://localhost:4000/user/binfo", newUser)
            .then((response) => {
                console.log("new user details:")
                console.log(newUser);
                console.log(response.data);
                setUsers(response.data);
                setname(response.data.name);
                setcontact(response.data.contact);
                setage(response.data.age);
                setbatch(response.data.batch);
                setpw(response.data.password);
            });
    }, []);



    const onSubmit = (event) => {
        event.preventDefault();

        const Uncle = {
            name: name,
            email: email,
            contact: contact,
            age: age,
            batch: batch,
            password: pw
        };

        axios
            .post("http://localhost:4000/user/bedit", Uncle)
            .then((response) => {
                console.log(response.data);
                //failure
                if (response.data.val === 0) {
                    alert("Failure!!!");
                }
                //success
                else {
                    alert("Success ");
                }

            });

        window.location.reload(false);

    };


    return (
        <div>
            <BuyerNavbar />
            <div className="container" container-align="center" >
                <h1>Welcome to the profile page {email}!! </h1>
                <h2> Username - {users.name}</h2>
                <h2>Email - {users.email}</h2>
                <h2>Country:{users.batch}</h2>
                <h2>age - {users.age}</h2>
                <h2>Wallet - {users.money}</h2>


                <Grid container align={"left"} spacing={2}>
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
                    <Grid container align={"center"} item xs={1} >

                        <Box container align={"center"}  sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={batch}
                                    label="country"
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
                            onChange={onChangepw}
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={onSubmit}>
                            Edit
                        </Button>
                    </Grid>
                </Grid>
            </div >

        </div>

    );
};

export default BProfile;