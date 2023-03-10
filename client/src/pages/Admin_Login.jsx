


import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";



const Admin_Login = () =>{
   
    const navigate=useNavigate();

    

    const [user,setUser] = useState({
        username:"",
        password:""
    });


    const [id, setId] = useState({
        username:"",
        password:"",
    })

    const handleFormChange = (e) =>{
        

        setUser(prev=>({
            ...prev,[e.target.name] : e.target.value
        }));
        }
console.log(user);

        const handleFormClick = async (e) =>{
            
            axios.post("http://localhost:8800/admin_login", {
                username:user.username,
                password:user.password,
            })
            .then((response)=>{
                if(response.data.err){
                    alert("no account found");
                    window.location.reload();
                }
                else{
                    alert("account found");
                    setId({username:response.data.username, password:response.data.password})
                    navigate("/dashboard");
                }
            })
        }

        useEffect(()=>{
            axios.get("http://localhost:8800/admin")
            .then((response)=>{
                if(response.data.loggedIn == true){
                    navigate("/dashboard");
                }
            })
        })

    return(
        <div> 
        
        <div className="admin">
            <h2>Login as admin</h2>
           
            <label>Username</label>
            <input type="text" placeholder="input username" name="username" onChange={handleFormChange}/>
            <label>Password</label>
            <input type="text" placeholder="input password" name="password" onChange={handleFormChange}/>  
            <br/>
            <button onClick={handleFormClick}>Login</button>  
            
            <p>Don't have an account? <a> <Link to="/admin_signup">   Sign up now </Link></a></p>

        </div>
        </div>
        
        
    )
}

export default Admin_Login;