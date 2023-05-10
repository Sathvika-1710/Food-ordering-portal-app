import { useState, useEffect } from "react";
import Navbar from "../templates/Navbar";
import  path1 from '../images/img3.jpg'
import './home.css'
import { fontSize } from "@mui/system";
const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  localStorage.setItem("useremail","");

  useEffect(() => {
    setName("Dass TAs");
  }, []);

  return(
  <div>
  <Navbar />
  <div className="container" >
  <p className="para"> Welcome to our webiste</p>
  </div>
   <div className="imageDiv" style={{ textAlign: "center" }}>
    
   <img  className="image1"  src={path1} class="d-block w-100" alt="..." />
   </div>
  </div>
   )
};

export default Home;
// class="d-block w-100"