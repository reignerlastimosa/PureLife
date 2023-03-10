import Patient_Navbar from '../components/Patient_Navbar';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Patient_Header from '../components/Patient_Header';
import Moment from 'moment';

const Patient_Profile = () =>{

    const [edit,setEdit] =useState(false);
    const [patientInfo, setPatientInfo] = useState([]);
    
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchProfile = async () =>{
            
            try{
                const res = await axios.get("http://localhost:8800/patient_profile");
               
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
           
                 axios.post("http://localhost:8800/edit/patient", patientInfo).then(res=> console.log(res.data)).catch(err=> console.log(err));
                alert("edited patient...")
                setEdit(!edit);
                navigate("/patient_profile");  
        }

    return(
        <div className="whole">
           <Patient_Header/>
           <Patient_Navbar/>
           <div className="body"> 
            
            <main>
           
            <div className="patientTable">

              
            { !edit ?<div className="edit">
                <h2>Profile</h2>
                <label>Full Name : {patientInfo.fullname} </label> <br/>
                <label>Email : {patientInfo.email}</label> <br/>
                <label>Birthday : {Moment(patientInfo.birthday).format('YYYY-MM-DD')}</label> <br/>
                <label>Sex : {patientInfo.sex}</label> <br/> 
                <label>Address : {patientInfo.address}</label> <br/>
                <label>Password : {patientInfo.password}</label> <br/>
                <button className="edit-btn"onClick={()=> setEdit(!edit)}>Edit</button>


                </div>: <div className="edit">
                 <h2>Edit Profile</h2>
             <label>Full Name</label>
                <input type="text"  name="fullname"  onChange={handleFormChange} value={patientInfo.fullname} />

            <label>Email</label>
                <input type="text"  name="email" onChange={handleFormChange} value={patientInfo.email} />

                

                <label>Address</label>
                <input type="text" name="address" onChange={handleFormChange} value={patientInfo.address} />

                <label>Password</label>
                <input type="text" name="password" onChange={handleFormChange} value={patientInfo.password} />
                
                 <div className="birthdaySex"> 

                    <div> <label>Birthday</label>
                <input type="date"  name="birthday" onChange={handleFormChange} value={patientInfo.birthday} />  </div> 
                 
                    <div> <label>Male </label>
                    <input type="radio" placeholder="input password" name="sex" value="male" onChange={handleFormChange}/>  
            
            <label>Female </label>
            <input type="radio" placeholder="input password" name="sex" value="female" onChange={handleFormChange}/>  
            </div> 
                
            
            </div>
            

          
            <br/>
            <button className="save-btn" onClick={handleFormClick}>Save</button>  
            
        </div> }

                
            
             </div>
            </main>
            </div>
        </div>

    )
}

export default Patient_Profile;