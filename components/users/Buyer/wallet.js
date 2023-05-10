import BuyerNavbar from "../../templates/BuyerNav";
import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Wallet = (props) => {
    const [money, setmoney] = useState("");
    const [email, setemail] = useState(localStorage.getItem("useremail"));


    
    const onSubmit = () => {
        console.log(money);
        console.log(email);

        const nuser = {
            email: email,
            money:money
        }
        axios
            .post("http://localhost:4000/user/addmoney", nuser)
            .then(response => {
                if (response.data.val ===1)
                    alert("Money added successfully!!");
                else{
                    console.log(response.data.val)
                    alert("Failed to add money!!");
                }

            })
            .catch((error) => {
                console.log(error);
            });
        // window.location.reload(false);
    };

    const onChangemoney = (event) => {
        setmoney(event.target.value);
    };


    return (
        <div>
            <BuyerNavbar />
            <div className="container">
                <Grid container align={"left"} spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Enter Money"
                            variant="outlined"
                            value={money}
                            onChange={onChangemoney}
                        />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={onSubmit}>
                            Add Money
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>

    );
};

export default Wallet;