
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import { Link } from 'react-router-dom';



const Edit_Patient = () =>{
    const [patient, setPatient] = useState([])

    const navigate = useNavigate();

    useEffect(()=>{
        const fetchPatient = async () =>{
            
            try{
                
                const getId =  window.location.href.split("/");
                


                const res = await axios.get("http://localhost:8800/patient/" + getId[5]);
                setPatient(res.data[0]);
                
            }
            catch(err){
                console.log(err);
            }
        }
        fetchPatient();
    },[]);

    

 const handleFormChange = (e) =>{
    setPatient(prev=>({...prev,[e.target.name]: e.target.value}));
    }

    const handleFormClick = (e) =>{
        e.preventDefault();
       
             axios.post("http://localhost:8800/edit/patient", patient).then(res=> console.log(res.data)).catch(err=> console.log(err));
            
            navigate("/dashboard");  
    }
    return(
        <div className="whole">
           <Header/>
           <div className="body"> 
           
            <Navbar/>
            <main>
            <div className="info">
                <h3>Edit Patient</h3>


               
                <div className="edit">
            

           
                <label>Full Name</label>
                <input type="text" name="fullname" onChange={handleFormChange} value={patient.fullname}/>
                <label>Email</label>
                <input type="text" name="email"placeholder="input contact"   onChange={handleFormChange} value={patient.email}/>
                <label>Birthday</label>
                <input type="date" name="birthday" onChange={handleFormChange} value={patient.birthday}/>  
                <label>Sex</label>
                <input type="text" name="sex" placeholder="input education"   onChange={handleFormChange} value={patient.sex}/>  
                <label>Address</label>
                <input type="text" name="address" placeholder="input specialty"   onChange={handleFormChange} value={patient.address}/>  
                <label>Password</label>
                <input type="text" name="password"placeholder="input password"  onChange={handleFormChange} value={patient.password}/>  
                <br/>
                <button onClick={handleFormClick}>Save</button>  
           
        </div>
       
    

                
                
            </div>
           
            </main>
            </div>
        </div>

    )
}

export default Edit_Patient;