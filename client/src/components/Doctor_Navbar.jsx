import { Link } from 'react-router-dom';
import { useState } from 'react';

import {BsFillPersonFill} from 'react-icons/bs';
import {MdSick} from 'react-icons/md';
import {BiMenu} from 'react-icons/bi'
import {FaUserNurse} from 'react-icons/fa';
import {MdDashboard} from 'react-icons/md';
import {BsCalendarPlusFill} from 'react-icons/bs';
import {RiTimerFill} from 'react-icons/ri';

const Doctor_Navbar = () =>{
    const[navToggle, setNavToggle] = useState(false);

    const navToggled = () =>{
        if (navToggle === false){
            setNavToggle(true);
        }
        else{
            setNavToggle(false);
        }
    }
    return(
        <div className={`${navToggle===false? 'doctorNavbar':'doctorNavbarToggle'}`}>
            <button className="toggleButton" onClick={navToggled}><BiMenu /> </button>
            <ul>
            <Link to="/doctor_dashboard">    <li><MdDashboard/> Dashboard</li> </Link>

            <Link to="/doctor_schedule">  <li><RiTimerFill/> Schedule</li> </Link>

<Link to="/doctor_appointment"> <li><BsCalendarPlusFill/>   Appointment</li> </Link>

    <Link to="/doctor_profile">   <li><BsFillPersonFill/> Profile</li> </Link>

                
                
                
                
                
                
            </ul>
        </div>
    )
}




export default Doctor_Navbar;