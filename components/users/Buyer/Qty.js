import BuyerNavbar from "../../templates/BuyerNav";
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import axios from "axios";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";


const Qty = (props) => {
    const navigate = useNavigate();
    const email = localStorage.getItem("useremail");
    const [value, setValue] = React.useState(2);
    console.log(value);
    const id = localStorage.getItem("foodid");
    const [qty, setqty] = React.useState('');
    const [vemail, setvemail] = useState("");
    const [item, setitem] = useState("");
    const [shop, setshop] = useState("");
    const [price, setprice] = useState("");

    const handleChange = (event) => {
        setqty(event.target.value);
    };

    const nuser = {
        vemail: vemail,
        bemail: email,
        item: item,
        qty: qty,
        status: "placed",
        shop: shop,
        price: price,
        id: id
    };

    useEffect(() => {
        axios
            .post("http://localhost:4000/user/getbyid", nuser)
            .then(response => {
                setvemail(response.data.email);
                setshop(response.data.shop);
                setprice(response.data.price);
                setitem(response.data.name);            
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    const onSubmitOrder = () => {
        axios
            .post("http://localhost:4000/user/addorder", nuser)
            .then(response => {
                if (response.data.val === 1){

                    alert("Order placed Successfully!!");
                }
                else
                {
                    console.log(response.data.val);
                    alert("Failed to place Order!!");
                }

            })
            .catch((error) => {
                console.log(error);
            });
            navigate("/buyer/items");
    };

    return (
        <div>
            <BuyerNavbar />
            <div className="container" style={{ textAlign: "center" }}>

                <div className="container" style={{ textAlign: "center" }}>

                    <Grid container align={"center"} item xs={1}>

                        <div className="container" style={{ textAlign: "center" }}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={qty}
                                        label="Qty"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>

                                    </Select>
                                </FormControl>
                            </Box>
                            <>
                                <br></br>
                            </>
                            <div container align={"center"}>

                                <Button variant="contained" onClick={() => onSubmitOrder(qty)} color="success">
                                    Order Item
                                </Button>

                            </div>

                        </div>
                    </Grid>
                </div>
            </div>
        </div>

    );
};

export default Qty;