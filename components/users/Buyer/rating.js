import BuyerNavbar from "../../templates/BuyerNav";
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import axios from "axios";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Navigate } from "react-router";
import { useNavigate } from "react-router-dom";


const Ratingg = (props) => {
    const navigate = useNavigate();

    const [value, setValue] = React.useState(2);
    console.log(value);
    const id = localStorage.getItem("orderid");
    
    const onSubmitrating = () => {

        const nuser = {
            id: id,
            rating: value
        }
        axios
            .post("http://localhost:4000/user/rate", nuser)
            .then(response => {
                if (response.data.val === 1){
                    alert("Rating Submitted!!");

                }
                else
                    alert("Failed to rate item!!");
            })

            .catch((error) => {
                console.log(error);
            });

            navigate("/buyer/order");
    }

    return (
        <div>
            <BuyerNavbar />
            <div className="container" style={{ textAlign: "center" }}>
                <Box
                    sx={{
                        '& > legend': { mt: 2 },
                    }}
                >
                    <Typography component="legend">Rate Food Item</Typography>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                </Box>
                <>
                    <br></br>
                </>
                <div container align={"center"}>

                    <Button variant="contained" onClick={() => onSubmitrating()} color="success">
                        Submit Rating!!
                    </Button>

                </div>

            </div>
        </div>

    );
};

export default Ratingg;