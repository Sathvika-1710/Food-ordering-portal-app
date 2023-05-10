import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useNavigate } from "react-router-dom";
import BuyerNavbar from "../../templates/BuyerNav";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";



const Items = (props) => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [email, setemail] = useState(localStorage.getItem("useremail"));
    const [edit, setedit] = useState("0");
    const [index, setindex] = useState(-1);
    const [qty, setqty] = useState(-1);

    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [rating, setrating] = useState("");
    const [veg, setveg] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:4000/user/fooditems")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const onSubmitOrder = (id) => {

        localStorage.setItem("foodid", id);
        navigate("/buyer/qty");
    };

    const onSubmitAvailable = (id) => {
        const nuser = {
            itemid: id
        }
        axios
            .post("http://localhost:4000/user/foodavail", nuser)
            .then(response => {
                if (response.data.val === 1)
                    alert("Currently Available!!");
                else if (response.data.val === 0) {
                    alert("Not available!!");
                }

            })
            .catch((error) => {
                console.log(error);
            });
    };


    const onSubmitFav = (id) => {
        const nuser = {
            itemid: id,
            bemail: email,
        }

        axios
            .post("http://localhost:4000/user/addfav", nuser)
            .then(response => {
                if (response.data.val === 1)
                    alert("Added to favourites!!");
                else if (response.data.val === 2)
                    alert("Already added to favourites!!");
                else {
                    alert("Failed to add to favourites!!");
                }

            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div>
            <div>
                <BuyerNavbar />
                <div className="container">                
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell> Sr No.</TableCell>
                                        <TableCell>Item Name</TableCell>
                                        <TableCell>Item Cost</TableCell>
                                        <TableCell>Rating</TableCell>
                                        <TableCell>Food Type</TableCell>
                                        <TableCell>Shop</TableCell>
                                        <TableCell>Vendor email</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user, ind) => (

                                        <TableRow key={ind}>
                                            <TableCell>{ind + 1}</TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.price}</TableCell>
                                            {user.rating === 0 || user.peep === 0 ?
                                                <TableCell>0</TableCell>
                                                :
                                                <>
                                                    <TableCell>{(user.rating / user.peep).toFixed(2)}</TableCell>

                                                </>
                                            }
                                            <TableCell>{user.veg}</TableCell>
                                            <TableCell>{user.shop}</TableCell>
                                            <TableCell>{user.email}</TableCell>


                                            <Button color="secondary" onClick={() => onSubmitAvailable(user._id)}>Check Availabitliy</Button>


                                            <TableCell><Grid item xs={12}>
                                                <Button variant="contained" color="success" onClick={() => onSubmitOrder(user._id)}>
                                                    Order
                                                </Button>
                                            </Grid></TableCell>
                                            <TableCell><Grid item xs={12}>
                                                <Button variant="contained" onClick={() => onSubmitFav(user._id)}>
                                                    Add to Favourites
                                                </Button>
                                            </Grid></TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </div>
            </div>
        </div >
    );
};

export default Items;