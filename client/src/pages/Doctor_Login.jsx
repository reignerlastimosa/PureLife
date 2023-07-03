


import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";



const Doctor_Login = () =>{
   
    const navigate=useNavigate();

    

    const [doctor,setDoctor] = useState({
        email:"",
        password:""
    });


    const [id, setId] = useState({
        email:"",
        password:"",
    })

    const handleFormChange = (e) =>{
        

        setDoctor(prev=>({
            ...prev,[e.target.name] : e.target.value
        }));
        }


        const handleFormClick = async (e) =>{
            
            axios.post("http://localhost:8800/doctor_login", {
                email:doctor.email,
                password:doctor.password,
            })
            .then((response)=>{
                if(response.data.err){
                    alert("no account found");
                    window.location.reload();
                }
                else{
                    alert("account found");
                    setId({email:response.data.email, password:response.data.password})
                    navigate("/doctor_dashboard");
                }
            })
        }

        useEffect(()=>{
            axios.get("http://localhost:8800/doctor_login")
            .then((response)=>{
                if(response.data.loggedIn == true){
                    navigate("/doctor_dashboard");
                }
            })
        })

    return(
        <div> 
        
        <div className="admin">
        <h1 className="logo">PureLife <span> Medical Clinic</span> </h1> 
            <h2>Login as Doctor</h2>
           
            <label>Email</label>
            <input type="text" placeholder="input username" name="email" onChange={handleFormChange}/>
            <label>Password</label>
            <input type="password" placeholder="input password" name="password" onChange={handleFormChange}/>  
            <br/>
            <button onClick={handleFormClick}>Login</button>  
            <p>Are you an admin? <a> <Link to="/admin">   Log In here </Link></a></p>
           

        </div>
        </div>
        
        
    )
}

export default Doctor_Login;