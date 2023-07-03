
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import { Link } from 'react-router-dom';



const Edit_Appointment = () =>{
    const [status, setStatus] = useState([])
    const [updateStatus, setUpdateStatus] =useState({status: ""});
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchAppointment = async () =>{
            
            try{
                
                const getId =  window.location.href.split("/");
                
                
                
                const res = await axios.get("http://localhost:8800/appointment/" + getId[5]);
                setStatus(res.data[0]);
                
            }
            catch(err){
                console.log(err);
            }
        }
        fetchAppointment();
    },[]);

    

 const handleFormChange = (e) =>{
    setUpdateStatus(prev=>({...prev,[e.target.name]: e.target.value}));
    }

    const handleFormClick = (e) =>{
        
        const getId =  window.location.href.split("/");
        axios.post(`http://localhost:8800/edit/appointment/${getId[5]}`, updateStatus).then(res=> console.log(res.data)).catch(err=> console.log(err));
        
            navigate("/appointment");
    }
    return(
        <div className="whole">
           <Header/>
           <div className="body"> 
           
            <Navbar/>
            <main>
            <div className="info">
                <h3>Edit Appointment</h3>


               
                <div className="edit">
            

           
                <h4>Appointment No. {status.appointment_id}</h4>
                <h4>Patient ID: {status.patient_id}</h4>
                <h4>Appointment Date {status.appointment_date}</h4>
                <h4>Appointment Time {status.appointment_time}</h4>
                <h4>Doctor ID: {status.doctor_id}</h4>
                <h4>Reason for Appointment {status.reason}</h4>
                
                <label>Accept</label>
               <input type="radio" name="status" value="Accepted" onChange={handleFormChange}/>
               <label>Decline</label>
               <input type="radio" name="status" value="Declined" onChange={handleFormChange}/>
               <label>Cancel</label>
               <input type="radio" name="status" value="Cancelled" onChange={handleFormChange}/>
               <label>No Respond</label>
               <input type="radio" name="status" value="Pending" onChange={handleFormChange}/>
                <br/>
                <button onClick={handleFormClick}>Save</button>  
           
        </div>
       
    

                
                
            </div>
           
            </main>
            </div>
        </div>

    )
}

export default Edit_Appointment;