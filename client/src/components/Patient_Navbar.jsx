import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import {HiOutlineMenuAlt1} from 'react-icons/hi';
import {HiOutlineMenuAlt3} from 'react-icons/hi';
const Patient_Navbar = () =>{ 

 
window.onresize = function(){

  if(window.innerWidth>700){
    setToggleNavbar(true);
    
  }
  else{
    setToggleNavbar(false);
  }
}
  const [toggleNavbar, setToggleNavbar] = useState(false);

  const toggle = () =>{

   if(window.innerWidth <= 700){
    setToggleNavbar(!toggleNavbar);
   }

  }

  useEffect(()=>{
    if(window.innerWidth <= 700){
      setToggleNavbar(false);
    
     }

     else{
      setToggleNavbar(true);
     }
  },toggleNavbar);
    return(
      <div >   
        <button className="navbartoggler" onClick={toggle}> { !toggleNavbar ?<HiOutlineMenuAlt1> </HiOutlineMenuAlt1>: <HiOutlineMenuAlt3> </HiOutlineMenuAlt3> } </button>
        <div className = {`${toggleNavbar ? 'patientNavbar' : 'toggled' }`}>  
            
            
        <ul >
        <Link to="/myappointment">   <li> My Appointment</li> </Link>
        <Link to="/patient_profile"> <li> Profile</li></Link>
        <Link to="/patient_appointment">  <li> Book Appointment</li>  </Link>
          
         
         
          
        </ul>
        <Link to="/" className="logout"> Logout</Link>
        </div>
        </div>
    )
}




export default Patient_Navbar;