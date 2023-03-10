
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { BiSearchAlt2 } from 'react-icons/bi';



const Admin_Doctor = () =>{
    const [doctor, setDoctor] = useState([])
    
  
    const [addForm, setAddForm] = useState(false);

   
    const [addDoctor, setAddDoctor] = useState({
        fullname:"",
        contact:"",
        email:"",
        password:"",
        specialty:"",
        education:"",
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredDoctor, setfilteredDoctor] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        const fetchDoctor = async () =>{
            
            try{
                const res = await axios.get("http://localhost:8800/doctor");
                
                setDoctor(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchDoctor();
    },[]);


    const search = (e) =>{
        setSearchQuery(e.target.value)
        const filteredDoctors = doctor.filter((pat) =>
        pat.fullname && pat.fullname.toLowerCase().includes(searchQuery.toLowerCase())

        );
        
        setfilteredDoctor(filteredDoctors);
      }

    

    const handleDelete = async (id) =>{
        try{
            
            await axios.get(`http://localhost:8800/delete/doctor/${id}`);
            alert("Deleted...")
            window.location.reload();
        }
        catch(err){
            console.log(err);
        }
        
    };

  
        

    const showAddForm = (e) =>{
        if(addForm === false){
            setAddForm(true);
        }else {
            setAddForm(false);
        }
    }

  

 const handleFormChange = (e) =>{
    setAddDoctor(prev=>({...prev,[e.target.name]: e.target.value}));
    }



    const handleFormClick = (e) =>{
        e.preventDefault();
       
             axios.post("http://localhost:8800/doctor", addDoctor).then(res=> console.log(res.data)).catch(err=> console.log(err));
             setAddForm(false);
            navigate("/dashboard");
      
         
       
    }

   
    


    

    return(
        <div className="whole">
           <Header/>
           <div className="body"> 

           {
            addForm === true?
            <div className="addAppointmentForm">
                <div className="form_heading"> 
                    <h1>ADD DOCTOR</h1>
                    <button onClick={showAddForm}>Close</button>
                </div>

                <div className="form_add">

                    
                <label>  Doctor Name</label>
                    <input type="text" name="fullname" onChange={handleFormChange} />

                    <label>  Contact</label>
                    <input type="text" name="contact" onChange={handleFormChange} />

                    <label>  Education</label>
                    <input type="text" name="education" onChange={handleFormChange} />

                    <label>  Specialty</label>
                    <input type="text" name="specialty" onChange={handleFormChange} />

                    <label>  Email</label>
                    <input type="text" name="email" onChange={handleFormChange} />

                    <label>  Password</label>
                    <input type="password" name="password" onChange={handleFormChange}  />


                    <button onClick={handleFormClick}> Submit</button>
                </div>
            </div> : ""
           }
           
            <Navbar/>
            <main>
            <div className="info">
                <div className="info-details">  
                <h3>Doctor Information</h3>
                <button className="add" onClick={showAddForm}>Add Doctor</button>
                </div>
                <div className="searchIn"> 
                <input type="text" placeholder="search doctor"   onChange={search}/>
                <button className="search"> <BiSearchAlt2 size={25}/> </button>
                </div>
               
               
            </div>
            <div className="table">
            <table>
                <tr>
                    <th>Full Name</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Education</th>
                    <th>Specialty</th>
                    <th>Password</th>
                    <th>Action</th>
                </tr>

               
            {searchQuery === "" ? (
                doctor.map(doc=>(
                    
                            <tr key={doc.doctor_id}>
                                <td>{doc.fullname}</td>
                                <td>{doc.contact}</td>
                                <td>{doc.email}</td>
                                <td>{doc.education}</td>
                                <td>{doc.specialty}</td>
                                <td>{doc.password}</td>
                                <td className="action"> 
                                <button><Link to={"/edit/doctor/" + doc.doctor_id}>  Edit  </Link></button>
                                <button className="delete" onClick={()=>handleDelete(doc.doctor_id)}>Delete</button></td>
                            </tr>
                )))
                :

                filteredDoctor.length > 0 ? (
                    filteredDoctor.map((pat) => (
                      <tr key={pat.doctor_id}>
                        <td>{pat.fullname}</td>
                        <td>{pat.contact}</td>
                        <td>{pat.email}</td>
                        <td>{pat.education}</td>
                        <td>{pat.specialty}</td>
                        <td>{pat.password}</td>
                        
                  
                        <td className="action"> 
                                <button><Link to={"/edit/doctor/" + pat.doctor_id}>  Edit  </Link></button>
                                <button className="delete" onClick={()=>handleDelete(pat.doctor_id)}>Delete</button></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No patients found</td>
                    </tr>
                  )

            }
            </table>
             </div>
            </main>
            </div>
        </div>

    )
}

export default Admin_Doctor;