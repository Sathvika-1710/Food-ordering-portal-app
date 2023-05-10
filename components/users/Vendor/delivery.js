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
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import emailjs from "emailjs-com";


const Selling = (props) => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [email, setemail] = useState(localStorage.getItem("useremail"));
    const [shop, setshop] = useState(localStorage.getItem("shop"));
    const [edit, setedit] = useState("0");
    const [index, setindex] = useState(-1);
    const [qty, setqty] = useState(-1);

    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [rating, setrating] = useState("");
    const [veg, setveg] = useState("");

    useEffect(() => {
        const user = {
            vemail: email
        };

        axios
            .post("http://localhost:4000/user/delivery", user)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const onSubmitStage = (id, status,item) => {

        const nuser = {
            id: id,
            email: email
        };
        console.log(nuser);

        if (status == "placed") {

            var templateParams = {
                name: 'James',
                notes: 'Check this out!',
                to_name: 'nithil99m2@gmail.com',
                from_name: 'amaranenigreeshma@gmail.com',
                message: 'Your order '+ item+' got accepted with item-id: ' + id+'',
                subject:shop
            };

            emailjs.send('service_fl137g5', 'template_jci7q35', templateParams, 'user_UhVXnLqFJsP3dCqybseRn')
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                }, function (error) {
                    console.log('FAILED...', error);
                });
        }

        axios
            .post("http://localhost:4000/user/stageedit", nuser)
            .then(response => {
                if (response.data.pop === 1)
                    alert("Cookers are busy!!\nAccept later");
                else if (response.data.val === 1)
                    alert("Order Edited Successfully!!");
                else
                    alert("Failed to edit Order!!");
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onSubmitreject = (id,item) => {

        const nuser = {
            id: id
        };

        console.log(nuser);
        var templateParams = {
            name: 'James',
            notes: 'Check this out!',
            to_name: 'nithil99m2@gmail.com',
            from_name: 'amaranenigreeshma@gmail.com',
            message: 'Your order '+item+ ' got rejected with item-id!!'+id
        };

        emailjs.send('service_fl137g5', 'template_jci7q35', templateParams, 'user_UhVXnLqFJsP3dCqybseRn')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });

        axios
            .post("http://localhost:4000/user/reject", nuser)
            .then(response => {
                if (response.data.val === 1 || response.data.val === 2)
                    alert("Rejected Successfully!!");
                else {
                    console.log(response.data.val);
                    alert("Failed to reject Order!!");
                }
                window.location.reload(false);

            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onChangeqty = (event, ind) => {
        setedit("1");
        setindex(ind);
        setqty(event);
    };


    return (
        <div>
            <div>
                <VendorNavbar />

                <div className="container">
                <div className="container" style={{ textAlign: "center" }}>
                    <h1>Dashboard to View order items</h1>
                </div>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell> Sr No.</TableCell>
                                        <TableCell>Item Name</TableCell>
                                        <TableCell>Item Qty</TableCell>
                                        <TableCell>Placed Time</TableCell>
                                        <TableCell>Buyer email</TableCell>
                                        <TableCell>Shop</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user, ind) => (

                                        <TableRow key={ind}>
                                            <TableCell>{ind + 1}</TableCell>
                                            <TableCell>{user.item}</TableCell>
                                            <TableCell>{user.qty}</TableCell>
                                            <TableCell>{user.placed}</TableCell>
                                            <TableCell>{user.bemail}</TableCell>
                                            <TableCell>{user.shop}</TableCell>
                                            <TableCell>{user.status}</TableCell>
                                            {user.status == "placed" || user.status == "accepted" || user.status == "cooking" ?
                                                <>
                                                    < TableCell > <Grid item xs={12}>
                                                        <Button variant="contained" color="success" onClick={() => onSubmitStage(user._id, user.status,user.item)}>
                                                            Move to Next Stage
                                                        </Button>
                                                    </Grid></TableCell>
                                                    {user.status == "placed" &&
                                                        < TableCell > <Grid item xs={12}>
                                                            <Button variant="contained" color="error" onClick={() => onSubmitreject(user._id,user.item)}>
                                                                Reject
                                                            </Button>
                                                        </Grid></TableCell>
                                                    }

                                                </>
                                                :
                                                <>
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

export default Selling;