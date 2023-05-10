import VendorNavbar from "../../templates/VendorNav";
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
import BuyerNavbar from "../../templates/BuyerNav";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Stats = (props) => {
    const [users, setUsers] = useState([]);
    const [orderusers, setorderUsers] = useState([]);
    const [email, setemail] = useState(localStorage.getItem("useremail"));
    const [userstop, setUsersTop] = useState([]);
    const [sortName, setSortName] = useState(true);

    var placed = 0;
    var pending = 0;
    let completed = 0;
    let rejected = 0;

    const user = {
        email: email
    }

    const sortChange = () => {
        let usersTemp = users;
        usersTemp.sort((a, b) => (b.buyers - a.buyers));
        setUsersTop(usersTemp.slice(0, 5))
        setUsers(usersTemp);
        setSortName(!sortName);
    };

    useEffect(() => {
        axios
            .post("http://localhost:4000/user/vorderitems", user)
            .then((response) => {
                setorderUsers(response.data);
                // console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .post("http://localhost:4000/user/ufforderitems", user)
            .then((response) => {
                setUsers(response.data);
                // console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <VendorNavbar />
            <div className="container" style={{ textAlign: "center" }}>
                <h1>Top 5 Sold Items</h1>
                <h5>Click on the arrow to view</h5>
                <Grid container>

                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell> Sr No.</TableCell>
                                        <TableCell>
                                            {" "}
                                            <Button onClick={sortChange}>
                                                {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                                            </Button>
                                        
                                        </TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Rating</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userstop.map((user, ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{ind}</TableCell>
                                            <TableCell>{user.buyers}</TableCell>
                                            <TableCell>{user.name}</TableCell>

                                            {user.rating === 0 || user.peep === 0 ?

                                                <TableCell>0</TableCell>
                                                :
                                                <>
                                                    <TableCell>{(user.rating / user.peep).toFixed(2)}</TableCell>

                                                </>
                                            }
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </div>

            <div className="container">
                <Grid item xs={12} md={9} lg={9}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderusers.map((user, ind) => (
                                    <>
                                        {(() => {
                                            if (user.status === "placed") {
                                                placed = placed + 1;
                                                console.log(placed);
                                            }
                                            else if (user.status === "completed") {
                                                completed = completed + 1;
                                                console.log(completed)
                                            }
                                            else if (user.status === "rejected") {
                                                rejected = rejected + 1;
                                            }
                                            else {
                                                pending = pending + 1;
                                            }
                                        }
                                        )()}
                                    </>
                                ))}

                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
                <br/>
                <br/>
                <div className="container" style={{ textAlign: "center" }}>
                    <h1>Status of the orders</h1>
                    <div className="container" style={{ textAlign: "center" }}>
                        <h2>Count for placed orders - {placed}</h2>
                        <h2>Count for completed orders - {completed}</h2>
                        <h2>Count for pending orders - {pending}</h2>
                        <h2>Count for rejected orders - {rejected}</h2>
                    </div>
                </div>
            </div>
        </div >

    );
};

export default Stats;