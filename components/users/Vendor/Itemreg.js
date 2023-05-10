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
import VendorNavbar from "../../templates/VendorNav";


const AddItem = (props) => {
    const navigate = useNavigate();
    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [type, settype] = useState("");
    const [email, setemail] = useState(localStorage.getItem("useremail"));
    const [shop,setshop]=useState(localStorage.getItem("shop"))

    const onChangename = (event) => {
        setname(event.target.value);
    };

    const onChangeprice = (event) => {
        setprice(event.target.value);
    };

    const onChangetype = (event) => {
        settype(event.target.value);
    };

    const resetInputs = () => {
        setname("");
        setprice("");
        settype("");       
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            name: name,
            price: price,
            type: type,
            email: email,
            shop:shop
        };

        axios
            .post("http://localhost:4000/user/additem", newUser)
            .then((response) => {
                console.log(response.data);
                //failure
                if (response.data.val === 0) {
                    alert("Item already added!!");
                }
                //success
                else {
                    alert("Created " + response.data.name);
                }

            });

        resetInputs();
    };


    return (
        <div>
            <VendorNavbar />

            <div className="container">

                <Grid container align={"center"} spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Item Name"
                            variant="outlined"
                            value={name}
                            onChange={onChangename}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Price"
                            variant="outlined"
                            value={price}
                            onChange={onChangeprice}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Food-Type"
                            variant="outlined"
                            value={type}
                            onChange={onChangetype}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={onSubmit}>
                            Add Item
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={() => navigate("/vendor/menu")}>
                            Back
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};


export default AddItem;