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
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import VendorNavbar from "../../templates/VendorNav";


const FoodItems = (props) => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [email, setemail] = useState(localStorage.getItem("useremail"));
    const [edit, setedit] = useState("0");
    const [index, setindex] = useState(-1);

    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [rating, setrating] = useState("");
    const [veg, setveg] = useState("");

    useEffect(() => {

        const newu = {
            email: email
        };

        axios
            .post("http://localhost:4000/user/items", newu)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const onSubmitedit = (index, ID) => {
        console.log(index)
        setedit("1");
        setindex(index);

        const newuser = {
            id: ID
        };

        axios
            .post("http://localhost:4000/user/foodbyid", newuser)
            .then(response => {
                setname(response.data.name);
                setveg(response.data.veg);
                setprice(response.data.price);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onChangename = (event) => {
        setname(event.target.value);
    };

    const onChangeprice = (event) => {
        setprice(event.target.value);
    };

    const onChangeveg = (event) => {
        setveg(event.target.value);
    };

    const onSubmitdel = (id) => {
        console.log(id)
        const newuser = {
            id: id
        };
        axios
            .post("http://localhost:4000/user/delitem", newuser)
            .then(response => {
                if (response.data.val === 1)
                    alert("Deleted Sucessfully!!")
                else
                    alert("Failed to delete!!");
            })
            .catch((error) => {
                console.log(error);
            });
        window.location.reload(false);

    };

    const onSubmitcancel = () => {
        setindex(-1);
        setedit("0");
    };

    const onSubmitsave = (Id) => {
        setindex(-1);
        setedit("0");
        const newuser = {
            id: Id,
            name: name,
            price: price,
            veg: veg,
            email: email
        };

        console.log(newuser);

        axios
            .post("http://localhost:4000/user/edititem", newuser)
            .then(response => {
                if (response.data.val === 1)
                    alert("Edited Successfully!!");
                else {
                    alert("Failed to Edit!!");
                }
            })
            .catch((error) => {
                console.log(error);
            });
        window.location.reload(false);
    };

    return (
        <div>
            <div>
                <VendorNavbar />

                <div className="container">
                    <Button variant="contained" onClick={() => navigate("/vendor/additem")} >ADD </Button>
                </div>

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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user, ind) => (

                                        <TableRow key={ind}>
                                            {edit === "1" && index === ind ?
                                                <>
                                                    <TableCell>{ind + 1}</TableCell>
                                                    <TableCell> <input value={name} onChange={onChangename} /></TableCell>
                                                    <TableCell><input value={price} onChange={onChangeprice} /></TableCell>
                                                    {user.rating === 0 || user.peep === 0 ?

                                                        <TableCell>0</TableCell>
                                                        :
                                                        <>
                                                            <TableCell>{(user.rating / user.peep).toFixed(2)}</TableCell>

                                                        </>
                                                    }
                                                    <TableCell><input value={veg} onChange={onChangeveg} /></TableCell>
                                                    <TableCell><Grid item xs={12}>
                                                        <Button variant="contained" color="success" onClick={() => onSubmitsave(user._id)}>
                                                            Save
                                                        </Button>
                                                    </Grid></TableCell>
                                                    <TableCell>
                                                        <Grid item xs={12}>
                                                            <Button variant="contained" color="error" onClick={onSubmitcancel}>
                                                                Cancel
                                                            </Button>
                                                        </Grid>
                                                    </TableCell>
                                                </>
                                                :
                                                <>
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
                                                    <TableCell><Grid item xs={12}>
                                                        <Button variant="contained" onClick={() => onSubmitedit(ind, user._id)}>
                                                            Edit
                                                        </Button>
                                                    </Grid></TableCell>
                                                    <TableCell>
                                                        <Grid item xs={12}>
                                                            <Button variant="contained" onClick={() => onSubmitdel(user._id)}>
                                                                Delete
                                                            </Button>
                                                        </Grid>
                                                    </TableCell>
                                                </>
                                            }
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

export default FoodItems;