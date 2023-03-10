
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Patient_signup = () =>{

    const navigate = useNavigate();

    const [addPatient, setAddPatient] = useState({
        fullname:"",
        birthday:"",
        sex:"",
        address:"",
        
        email:"",
        password:"",
    });

    
    const handleFormChange = (e) =>{
        setAddPatient(prev=>({...prev,[e.target.name]: e.target.value}));
    }

    const handleFormClick = async (e) =>{
        e.preventDefault();
        try{
            await axios.post("http://localhost:8800/patient", addPatient);
            alert("successfully created patient account...");
            navigate("/")
        }catch(err){
            console.log(err);
        }
    }

    
    return(
        <div className="login">
            <div className="loginBg">
            <h1><span>  Welcome to PureLife Medical Clinic:</span>An online appointment booking system. Schedule your appointment by signing in</h1>
            </div>

            <div className="loginForm">
            <h2>Signup</h2>
            <br/>
            

            <label>Enter Fullname</label>
            <input type="text" placeholder="input fullname" name="fullname" onChange={handleFormChange}/>

            <label>Enter Address</label>
            <input type="text" placeholder="input address" name="address" onChange={handleFormChange}/>

            <label>Enter Email</label>
            <input type="text" placeholder="input email" name="email" onChange={handleFormChange}/>
            
            <label>Enter Password</label>
            <input type="password" placeholder="input password" name="password" onChange={handleFormChange}/>  
           
        <div className="lowerInfo">
            <label>Birthday:</label>
            <input type="date"  name="birthday" onChange={handleFormChange}/>
            
            <div> 
            <label>Female </label>
            <input type="radio" placeholder="input password" name="sex" value="female" onChange={handleFormChange}/>  </div>
            
            <div> 
            <label>Male </label>
            <input type="radio" placeholder="input password" name="sex" value="male" onChange={handleFormChange}/>  </div>

            </div>
            <button onClick={handleFormClick}>Submit</button>  

           

            <p>Already have an account? <a> <Link to="/">   Sign in </Link></a></p>
            </div>
        </div>
    )
}

export default Patient_signup;