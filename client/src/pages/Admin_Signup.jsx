


import { Link } from "react-router-dom";


import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Admin_Signup = () =>{
    const [addAdmin, setAddAdmin] = useState({
        username:"",
        password:"",
        check_password:"",
        
    });

    const navigate = useNavigate();
    
    const handleFormChange = (e) =>{
        setAddAdmin(prev=>({...prev,[e.target.name]: e.target.value}));
    }

    const handleFormClick = async (e) =>{
        e.preventDefault();
        try{
            if(addAdmin.password === addAdmin.check_password){
                await axios.post("http://localhost:8800/admin", addAdmin);
                navigate("/admin");
            alert("successfully created admin account...");
            }
            else{
                alert("Password are not the same! Please try again...");
            }
            
           
        }catch(err){
            console.log(err);
        }
    }
    

    return(
        <div> 
        
        <div className="admin">
            <h2>Signup as admin</h2>

            
           
            <label>Username</label>
            <input type="text" placeholder="input username" name="username" onChange={handleFormChange}/>
            <label>Password</label>
            <input type="password" placeholder="input password" name="password" onChange={handleFormChange}/>  

            <label>Verify Password</label>
            <input type="password" placeholder="input password" name="check_password" onChange={handleFormChange}/>  
            <br/>
            <button onClick={handleFormClick}>Login</button>  
            
            <p>Already have an account? <a> <Link to="/admin">   Sign in </Link></a></p>

        </div>
        </div>
        
        
    )
}

export default Admin_Signup;