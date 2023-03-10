import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import {BiMenu} from 'react-icons/bi'


import {BsFillPersonFill} from 'react-icons/bs';
import {MdSick} from 'react-icons/md';

import {FaUserNurse} from 'react-icons/fa';
import {MdDashboard} from 'react-icons/md';
import {BsCalendarPlusFill} from 'react-icons/bs';
import {RiTimerFill} from 'react-icons/ri';




const Navbar = () =>{
    const[navToggle, setNavToggle] = useState(false);


    window.onresize = function(){

        if(window.innerWidth<700){
            setNavToggle(true);
          
        }
        else{
            setNavToggle(false);
        }
      }

    const navToggled = () =>{
        if (navToggle === false){
            setNavToggle(true);
        }
        else{
            setNavToggle(false);
        }
    }

    useEffect(()=>{

        if(window.innerWidth<700){
            setNavToggle(true);
          
        }
        
      },navToggle);

    return(
        <div className={`${navToggle===false? 'navbar':'navbarToggle'}`}>
            <button className="toggleButton" onClick={navToggled}> <BiMenu /> </button>
            <ul>
            <Link to="/dashboard">  <li> <MdDashboard/> Dashboard </li>  </Link> 

            <Link to="/doctor">  <li> <FaUserNurse/> Doctor</li> </Link>

            <Link to="/patient">  <li> <MdSick/> Patient</li> </Link>

            <Link to="/schedule">    <li> <RiTimerFill/> Doctor Schedule </li></Link>
               
            <Link to="/appointment"> <li><BsCalendarPlusFill/>  Appointment</li> </Link>

            <Link to="/profile"> <li> <BsFillPersonFill/> Account</li> </Link>
                
                
            </ul>
        </div>
    )
}




export default Navbar;