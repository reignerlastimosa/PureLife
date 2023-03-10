

import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Doctor_Navbar from '../components/Doctor_Navbar';



const Doctor_Dashboard = () =>{
    const [dashboard, setDashboard] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:8800/doctor/dashboard")
        .then((response)=>{
            setDashboard(response.data.result[0]);
        }).catch(err=> console.log(err));
    })


 


    return(
        <div className="whole">
           <Header/>
           <div className="body"> 
            <Doctor_Navbar/>
            <main>
            <div className="mainCard">
            <Link to="/doctor_appointment">   <div><h1>{dashboard.num_appointments_pending} </h1> <h3>Pending Appointments</h3></div> </Link>
            <Link to="/doctor_appointment">   <div><h1>{dashboard.num_appointments_accepted} </h1> <h3>Accepted Appointments</h3></div> </Link>
            <Link to="/doctor_appointment">  <div><h1>{dashboard.num_appointments_cancelled} </h1> <h3>Cancelled Appointments</h3></div> </Link>
            <Link to="/doctor_schedule">    <div><h1>{dashboard.num_schedules} </h1> <h3>Schedule</h3></div> </Link>
            </div>
            </main>
            </div>
        </div>

    )
}

export default Doctor_Dashboard;