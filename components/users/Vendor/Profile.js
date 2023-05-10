import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import VendorNavbar from "../../templates/VendorNav";

const VProfile = () => {
    const [email, setemail] = useState(localStorage.getItem("useremail"));
   console.log(email);
    const [users, setUsers] = useState([]);
    const [name, setname] = useState("");
    const [shop, setshop] = useState("");
    const [contact, setcontact] = useState("");
    const [canteenopen, setcanteenopen] = useState("");
    const [canteenclose, setcanteenclose] = useState("");
    const [pw, setpw] = useState("");

    const newUser = {
        email: email,
    };

    const onChangename = (event) => {
        setname(event.target.value);
    };

    const onChangeshop = (event) => {
        setshop(event.target.value);
    };

    const onChangeemail = (event) => {
        setemail(event.target.value);
    };

    const onChangecontact = (event) => {
        setcontact(event.target.value);
    };

    const onChangeopen = (event) => {
        setcanteenopen(event.target.value);
    };

    const onChangeclose = (event) => {
        setcanteenclose(event.target.value);
    };

    const onChangepw = (event) => {
        setpw(event.target.value);
    };

    useEffect(() => {
        axios
            .post("http://localhost:4000/user/vinfo", newUser)
            .then((response) => {
                console.log("new user details:")
                console.log(newUser);
                console.log(response.data);
                setUsers(response.data);
                setname(response.data.name);
                setcontact(response.data.contactno);
                setshop(response.data.shop);
                setcanteenopen(response.data.canteenopen);
                setcanteenclose(response.data.canteenclose);
                setpw(response.data.password);
            });
    }, []);



    const onSubmit = (event) => {
        event.preventDefault();

        const Uncle = {
            name: name,
            email: email,
            contact: contact,
            shop: shop,
            open: canteenopen,
            close: canteenclose,
            password: pw
        };

        axios
            .post("http://localhost:4000/user/vedit", Uncle)
            .then((response) => {
                console.log(response.data);
                //failure
                if (response.data.val === 0) {
                    alert("Incorrect data enetered");
                }
                //success
                else {
                    alert("Success ");
                }

            });

        // resetInputs();
        window.location.reload(false);

    };


    return (
        <div>
            <VendorNavbar />
            <div className="container" >
                <h1>Welcome to the profile page {email}!! </h1>
                <h2> Username-{users.name}</h2>
                <h2>Email-{users.email}</h2>
                <h2>Shop Name-{users.shop}</h2>
                <h2>Contact No.-{users.contactno}</h2>
                <h2>Timings: {users.canteenopen}-{users.canteenclose}</h2>
                <h2>Working orders {users.working}</h2>
            </div >

            <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Manager's Name"
                    variant="outlined"
                    value={name}
                    onChange={onChangename}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Shop Name"
                    variant="outlined"
                    value={shop}
                    onChange={onChangeshop}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Email Address"
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
                    label="Shop Opening time"
                    variant="outlined"
                    value={canteenopen}
                    onChange={onChangeopen}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label="Shop Closing time"
                    variant="outlined"
                    value={canteenclose}
                    onChange={onChangeclose}
                />
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
        </div>

    );
};

export default VProfile;