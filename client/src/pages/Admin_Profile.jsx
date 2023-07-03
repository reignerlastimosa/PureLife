import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Moment from 'moment';
import { useNavigate } from 'react-router-dom';
const Profile = () =>{

    const [edit,setEdit] =useState(false);
    const [patientInfo, setPatientInfo] = useState([]);

    const navigate = useNavigate();
    useEffect(()=>{
        const fetchProfile = async () =>{
            
            try{
                const res = await axios.get("http://localhost:8800/admin_profile");
               
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
           
                 axios.post("http://localhost:8800/edit/admin", patientInfo).then(res=> console.log(res.data)).catch(err=> console.log(err));
                alert("edited account information...")
                setEdit(!edit);
                navigate("/dashboard");  
        }

    return(
        <div className="whole"> 
        <Header/>

        <div className="body">  
        <Navbar/>

        { !edit ?<div className="edit">
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
                <h2>Account</h2>
                <label>Username : {patientInfo.username} </label>
                
                <label>Password : {patientInfo.password}</label>
                <button className="edit-btn"onClick={()=> setEdit(!edit)}>Edit</button>


                </div>: 
        
        <div className="edit">
           
            <h2>Edit Account</h2>
            
            <label>Username</label>
            <input type="text" placeholder="input username" name="username" onChange={handleFormChange} value={patientInfo.username}/>
            <label>Password</label>
            <input type="text" placeholder="input password" name="password" onChange={handleFormChange} value={patientInfo.password}/>  
            <br/>
            <button className="save-btn"onClick={handleFormClick}>Save</button>  
            
        </div>

    }
        </div>
        
        </div>
    )
}

export default Profile;