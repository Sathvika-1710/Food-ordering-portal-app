import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import VendorNavbar from '../../templates/VendorNav';

const VLogout = () => {
    const navigate = useNavigate();

    return (
        <div>
            <VendorNavbar />
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
                <Button variant="outlined" color="error" onClick={() => navigate("/vendor")}>
                    No
                </Button>

            </div>
        </div>
    );
}

export default VLogout;