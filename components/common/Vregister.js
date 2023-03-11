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
import Stack from '@mui/material/Stack';


const VReg = (props) => {

    const [name, setname] = useState("");
    const [shop, setshop] = useState("");
    const [email, setemail] = useState("");
    const [contact, setcontact] = useState("");
    const [canteenopen, setcanteenopen] = useState("");
    const [canteenclose, setcanteenclose] = useState("");
    const [pw, setpw] = useState("");

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

    const resetInputs = () => {
        setname("");
        setshop("");
        setemail("");
        setcontact("");
        setcanteenopen("");
        setcanteenclose("");
        setpw("");
    };


    var present = 0;
    const onSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            name: name,
            shop: shop,
            email: email,
            contactno: contact,
            canteenopen: canteenopen,
            canteenclose: canteenclose,
            password: pw
        };

        axios
            .post("http://localhost:4000/user/vregister", newUser)
            .then((response) => {
                console.log(response.data);
                //failure
                if (response.data.val === 0) {
                    alert("Already registered!!\nLogin now!!!");
                }
                //success
                else {
                    alert("Created " + response.data.name);
                    present = 1;
                }

            });

        resetInputs();
    };


    return (
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
            <br>
            </br>
            <br />
            <div className="container" style={{ textAlign: "center" }}>


                <Grid container align={"center"} item xs={12} >

                    <Box container align={"center"}  sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Open</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={canteenopen}
                                label="Open"
                                onChange={onChangeopen}
                            >
                                <MenuItem value={1}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={11}>11</MenuItem>
                                <MenuItem value={12}>12</MenuItem>
                                <MenuItem value={13}>13</MenuItem>
                                <MenuItem value={14}>14</MenuItem>
                                <MenuItem value={15}>15</MenuItem>
                                <MenuItem value={16}>16</MenuItem>
                                <MenuItem value={17}>17</MenuItem>
                                <MenuItem value={18}>18</MenuItem>
                                <MenuItem value={19}>19</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={21}>21</MenuItem>
                                <MenuItem value={22}>22</MenuItem>
                                <MenuItem value={23}>23</MenuItem>

                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                 <br/>
                 <br/>
                <Grid container align={"center"} item xs={1} align="center">

                    <Box container align={"center"} align="center" sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Close</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={canteenclose}
                                label="Close"
                                onChange={onChangeclose}
                            >
                                <MenuItem value={1}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={11}>11</MenuItem>
                                <MenuItem value={12}>12</MenuItem>
                                <MenuItem value={13}>13</MenuItem>
                                <MenuItem value={14}>14</MenuItem>
                                <MenuItem value={15}>15</MenuItem>
                                <MenuItem value={16}>16</MenuItem>
                                <MenuItem value={17}>17</MenuItem>
                                <MenuItem value={18}>18</MenuItem>
                                <MenuItem value={19}>19</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={21}>21</MenuItem>
                                <MenuItem value={22}>22</MenuItem>
                                <MenuItem value={23}>23</MenuItem>

                            </Select>
                        </FormControl>
                    </Box>
                </Grid>

                <br />
            </div>

            <Grid item xs={12}>
                <TextField
                type="password"
                    label="password"
                    variant="outlined"
                    value={pw}
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


export default VReg;