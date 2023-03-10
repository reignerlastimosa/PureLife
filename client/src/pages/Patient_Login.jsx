import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Patient_Login = () =>{

    const navigate=useNavigate();

    

    const [patient,setPatient] = useState({
        email:"",
        password:""
    });


    const [patientId, setPatientId] = useState({
        email:"",
        password:"",
    })

    const handleFormChange = (e) =>{
        

        setPatient(prev=>({
            ...prev,[e.target.name] : e.target.value
        }));
        }


        const handleFormClick = async (e) =>{
            
            axios.post("http://localhost:8800/patient_login", {
                email:patient.email,
                password:patient.password,
            })
            .then((response)=>{
                if(response.data.err){
                    alert("no account found");
                    window.location.reload();
                }
                else{
                    alert("account found");
                    setPatientId({email:response.data.email, password:response.data.password})
                    navigate("/myappointment");
                }
            })
        }

        useEffect(()=>{
            axios.get("http://localhost:8800/")
            .then((response)=>{
                if(response.data.loggedIn == true){
                    navigate("/myappointment");
                }
            })
        })

    return(
        <div className="login">
            <div className="loginBg">
                <h1><span>  Welcome to PureLife Medical Clinic:</span>An online appointment booking system. Schedule your appointment by signing in</h1>
            </div>

            <div className="loginForm">
            <h1 className="logo">PureLife <span> Medical Clinic</span> </h1> 
            <h2>Login</h2>
            <br/>
            <label>Email</label>
            <input type="text" placeholder="input username" name="email" onChange={handleFormChange}/>
            <label>Password</label>
            <input type="text" placeholder="input password" name="password" onChange={handleFormChange} />  
            <br/>
            <button onClick={handleFormClick}>Submit</button>  

            <p>Don't have an account? <a> <Link to="/signup">   Sign up now </Link></a></p>
            
            </div>
        </div>
    )
}

export default Patient_Login;