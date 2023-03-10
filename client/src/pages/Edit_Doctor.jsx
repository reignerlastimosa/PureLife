
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import { Link } from 'react-router-dom';



const Edit_Doctor = () =>{
    const [doctor, setDoctor] = useState([])

    const navigate = useNavigate();

    useEffect(()=>{
        const fetchDoctor = async () =>{
            
            try{
                
                const getId =  window.location.href.split("/");
                


                const res = await axios.get("http://localhost:8800/doctor/" + getId[5]);
                setDoctor(res.data[0]);
                
            }
            catch(err){
                console.log(err);
            }
        }
        fetchDoctor();
    },[]);

    

 const handleFormChange = (e) =>{
    setDoctor(prev=>({...prev,[e.target.name]: e.target.value}));
    }

    const handleFormClick = (e) =>{
        e.preventDefault();
        
             axios.post("http://localhost:8800/edit/doctor", doctor).then(res=> console.log(res.data)).catch(err=> console.log(err));
            
            navigate("/doctor");  
    }
    return(
        <div className="whole">
           <Header/>
           <div className="body"> 
           
            <Navbar/>
            <main>
            <div className="info">
                <h3>Edit Doctor</h3>


               
                <div className="edit">
            

           
                <label>Full Name</label>
                <input type="text" name="fullname" onChange={handleFormChange} value={doctor.fullname}/>
                <label>Contact</label>
                <input type="text" name="contact"placeholder="input contact"   onChange={handleFormChange} value={doctor.contact}/>
                <label>Email</label>
                <input type="text" name="email" placeholder="input email"   onChange={handleFormChange} value={doctor.email}/>  
                <label>Education</label>
                <input type="text" name="education" placeholder="input education"   onChange={handleFormChange} value={doctor.education}/>  
                <label>Specialty</label>
                <input type="text" name="specialty" placeholder="input specialty"   onChange={handleFormChange} value={doctor.specialty}/>  
                <label>Password</label>
                <input type="text" name="password"placeholder="input password"  onChange={handleFormChange} value={doctor.password}/>  
                <br/>
                <button onClick={handleFormClick}>Save</button>  
           
        </div>
       
    

                
                
            </div>
           
            </main>
            </div>
        </div>

    )
}

export default Edit_Doctor;