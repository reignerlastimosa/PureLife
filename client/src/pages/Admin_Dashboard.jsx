

import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import { Link } from 'react-router-dom';



const Admin_Dashboard = () =>{
    const [dashboard, setDashboard] = useState([])
    

    

    
    useEffect(()=>{
        axios.get("http://localhost:8800/dashboard")
        .then((response)=>{
            setDashboard(response.data.result[0]);
        }).catch(err=> console.log(err));
    })




   


    return(
        <div className="whole">
           <Header/>
           <div className="body"> 
            <Navbar/>
            <main>
            <div className="mainCard">
            <Link to="/patient">  <div>   <h1>{dashboard.num_patients} </h1> <h3>Patients</h3> </div></Link>
            <Link to="/doctor">   <div> <h1>{dashboard.num_doctors} </h1> <h3>Doctors</h3> </div></Link>
            <Link to="/appointment">  <div> <h1>{dashboard.num_appointments_pending} </h1> <h3>Pending Appointments</h3> </div></Link>
            <Link to="/appointment">   <div><h1>{dashboard.num_appointments_accepted} </h1> <h3>Accepted Appointments</h3> </div> </Link>
                
            <Link to="/appointment">  <div> <h1>{dashboard.num_appointments_cancelled} </h1> <h3>Cancelled Appointments</h3></div>  </Link>
            <Link to="/schedule">   <div> <h1>{dashboard.num_schedules} </h1> <h3>Doctor Schedules</h3> </div> </Link>
               

            </div>
            </main>
            </div>
        </div>

    )
}

export default Admin_Dashboard;