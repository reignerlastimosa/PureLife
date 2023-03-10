
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Moment from 'moment';
import { useNavigate } from 'react-router-dom';

import Doctor_Navbar from '../components/Doctor_Navbar';
const Doctor_Profile = () =>{

    const [edit,setEdit] =useState(false);
    const [patientInfo, setPatientInfo] = useState([]);

    const navigate = useNavigate();
    useEffect(()=>{
        const fetchProfile = async () =>{
            
            try{
                const res = await axios.get("http://localhost:8800/doctor_profile");
               
                setPatientInfo(res.data[0]);
                
            }
            catch(err){
                console.log(err);
            }
        }
        fetchProfile();
    },[]);

    const handleFormChange = (e) =>{
        setPatientInfo(prev=>({...prev,[e.target.name]: e.target.value}));
        }

        const handleFormClick = (e) =>{
            e.preventDefault();
           
                 axios.post("http://localhost:8800/edit/doctor", patientInfo).then(res=> console.log(res.data)).catch(err=> console.log(err));
                alert("edited doctor...")
                setEdit(!edit);
                navigate("/doctor_profile");  
        }

    return(
        <div className="whole"> 
        <Header/>

        <div className="body">  
        <Doctor_Navbar/>

        { !edit ?<div className="edit" >
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
                <h2>Profile</h2>
                <label>Fullname : {patientInfo.fullname} </label>
                <label>Email : {patientInfo.email} </label>
                <label>Specialty : {patientInfo.specialty} </label>
                <label>Education : {patientInfo.education} </label>
                <label>Contact : {patientInfo.contact} </label>
                <label>Password : {patientInfo.password}</label>
                <button className="edit-btn"onClick={()=> setEdit(!edit)}>Edit</button>


                </div>: 
        
        <div className="edit" >
            <h2>Edit Profile</h2>
            
            <label>Fullname</label>
            <input type="text" name="fullname" onChange={handleFormChange} value={patientInfo.fullname}/>

            <label>Email</label>
            <input type="text" name="email" onChange={handleFormChange} value={patientInfo.email}/>

            <label>Specialty</label>
            <input type="text" name="specialty" onChange={handleFormChange} value={patientInfo.specialty}/>

            <label>Education</label>
            <input type="text" name="education" onChange={handleFormChange} value={patientInfo.education}/>

            <label>Contact</label>
            <input type="text"  name="contact" onChange={handleFormChange} value={patientInfo.contact}/>

            <label>Password</label>
            <input type="text"  name="password" onChange={handleFormChange} value={patientInfo.password}/>  
            <br/>
            <button className="save-btn" onClick={handleFormClick}>Save</button>  
            
        </div>

    }
        </div>
        
        </div>
    )
}

export default Doctor_Profile;