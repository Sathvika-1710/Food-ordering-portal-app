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

import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Searchbar = (props) => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [email, setemail] = useState(localStorage.getItem("useremail"));
    const [sortedUsers, setSortedUsers] = useState([]);
    const [sortName, setSortName] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [rating, setrating] = useState(1);
    const [searched, setSearched] = useState("");
    const[price,set_price]=useState(0);

    const onchangeprice = () => {
        setrating(0);
        sortChange();
    }

    const onchangerating = () => {
        setrating(1);
        sortChange();
    }
    const search = (event) => {
        const search_food = {
            food:searched
          };
      
        event.preventDefault()
         console.log(searched)
        // food_item=searched
         axios
         .post("http://localhost:4000/user/foodsearch",search_food)
         .then((response) => {
            console.log(response.data)
            if(response.data===null){
                console.log('jjjd')
                alert("NO SUCH FOOD ITEM")

            }
           // alert("clickedd")
           else{
            setUsers([response.data]);

           }
             
             
         })
    }

    const price_search=(event)=>{
        event.preventDefault();
        console.log(price)
        const price_searched={
            "price":price
        }
        axios.post("http://localhost:4000/user/price_search",price_searched).then((response)=>{
            if(response.data.length===0){
                alert("Food items not available at this price")
                setUsers(response.data)
            }
            else{
                setUsers(response.data)
            }
            //setUsers(response.data)
        })

    }

    const sortChange = () => {
        let usersTemp = users;
        const flag = sortName;

        usersTemp.sort((a, b) => {
            if (rating) {
                if (a.peep != 0 && b.peep != 0) {
                    return (1 - flag * 2) * (((a.rating / a.peep).toFixed(2)) - ((b.rating / b.peep).toFixed(2)));
                }
                else
                    return (1 - flag * 2) * (a.rating - b.rating);
            }
            else {
                return (1 - flag * 2) * (a.price - b.price);
            }
        });

        setUsers(usersTemp);
        setSortName(!sortName);
    };

    const customFunction = (event) => {
        console.log(event.target.value);
        setSearchText(event.target.value);
    };

    useEffect(() => {
        axios
            .get("http://localhost:4000/user/fooditems")
            .then((response) => {
                console.log(response.data)
                setUsers(response.data);
                setSortedUsers(response.data);
                setSearchText("");
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>

            <BuyerNavbar />
            <div className="container">

                <Grid container>
                    <Grid item xs={12} md={3} lg={3}>
                        <List component="nav" aria-label="mailbox folders">
                            <ListItem text>
                                <h1>Filters</h1>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                        <h1>List of Items</h1>
                        <h4>Click on the arrow for ascending and descending orders</h4>
                    </Grid>
                    <Grid container>

                        <Grid item xs={12} md={9} lg={9}>
                            <Button variant="contained" onClick={onchangeprice}>Price</Button>
                            &nbsp;&nbsp;
                            &nbsp;&nbsp;
                            <Button variant="contained" onClick={onchangerating}>Rating</Button>

                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={3} lg={3}>
                        <form onSubmit={search}>
                            <input type="text" value={searched} onChange={(e) => { setSearched(e.target.value) }} placeholder="Enter the name of the food item"/>
                            <button type="submit" onClick={search}>Search</button>
                        </form>
                        <br/>

                        <form onSubmit={search}>
                            <input type="number" value={price} onChange={(e) => { set_price(e.target.value) }} placeholder="Maximum price"/>
                            <button type="submit" onClick={price_search}>Submit</button>
                        </form>




                    </Grid>
                    <Grid item xs={12} md={11} lg={9}>
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
                                            Name
                                        </TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Rating</TableCell>
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
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Searchbar;