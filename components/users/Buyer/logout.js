import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Grid from "@mui/material/Grid";
import BuyerNavbar from '../../templates/BuyerNav';
import { useNavigate } from "react-router-dom";

const BLogout = () => {
    const navigate = useNavigate();

    return (
        <div>
            <BuyerNavbar />
            <Grid className="container">
            </Grid>

            <div container align={"center"}>

                <h2>Are you sure, you want to logout..?</h2>

                <Button variant="contained" color="success" onClick={() => navigate("/")}>
                    Yes
                </Button>
                <span>
                    &nbsp;&nbsp;&nbsp;
                </span>
                <Button variant="outlined" color="error" onClick={() => navigate("/buyer")}>
                    No
                </Button>

            </div>
        </div>
    );
}

export default BLogout;