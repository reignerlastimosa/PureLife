
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import { BiSearchAlt2 } from 'react-icons/bi';
import { AiFillCloseSquare } from 'react-icons/ai';
const Admin_Schedule = () =>{
    const [schedule, setSchedule] = useState([])
    const [addForm, setAddForm] = useState(false);
    const [addSchedule, setAddSchedule] = useState({
        doctor_id:"",
        schedule_date:"",
        start_time:"",
        end_time:"",
        
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPatient, setFilteredPatient] = useState([]);
    const navigate = useNavigate();

    const searchSupplier = async ()=>{
        try{
            const res = await axios.post("http://localhost:8800/appointment?");
            console.log(res);
            setSchedule(res.data);
        }
        catch(err){
            console.log(err);
        }
    }

    const handleSearchChange = (e) =>{
        console.log(e.target.value);
        
    };

    
    const showAddForm = () =>{
        if(addForm === false){
            setAddForm(true);
        }else {
            setAddForm(false);
        }
        
        
    }
    
    const handleFormChange = (e) =>{
        setAddSchedule(prev=>({...prev,[e.target.name]: e.target.value}));
    }

    const handleFormClick = (e) =>{
        e.preventDefault();
       
            axios.post("http://localhost:8800/schedule", addSchedule).then(res=>console.log(res.data)).catch(err=>console.log(err));
           navigate("/dashboard");
      
         
        
    }
    

    useEffect(()=>{
        const fetchSchedule = async () =>{
            
            try{
                const res = await axios.get("http://localhost:8800/schedule");
                
                
                
                setSchedule(res.data.result);
            
            }
            catch(err){
                console.log(err);
            }
        }
        fetchSchedule();
    },[]);

    const search = (e) =>{
        setSearchQuery(e.target.value)
        const filteredPatients = schedule.filter((pat) =>
        pat.fullname && pat.fullname.toLowerCase().includes(searchQuery.toLowerCase())
        
        );
        
        setFilteredPatient(filteredPatients);
      }

    const handleDelete = async (id) =>{
        try{
            await axios.get("http://localhost:8800/delete/schedule/" + id);
            alert("successfully deleted schedule...")
            window.location.reload();
        }
        catch(err){
            console.log(err);
        }
        
    };

    
    return(
        <div className="whole">
           <Header/>
           <div className="body"> 

           {
            addForm === true? 
            <div className="addForm">
                <div className="form_heading"> 
                    <h3>ADD DOCTOR</h3>
                    <button onClick={showAddForm}><AiFillCloseSquare/></button>
                </div>

                <div className="form_add">

                    
                <label>  Doctor ID</label>
                    <input type="text" name="doctor_id" onChange={handleFormChange}/>

                    <label>  Schedule Date</label>
                    <input type="date" name="schedule_date" onChange={handleFormChange} />

                    <label>  Start Time</label>
                    <input type="time" name="start_time" onChange={handleFormChange} />

                    <label>  End Time</label>
                    <input type="time" name="end_time" onChange={handleFormChange} />




                   

                    <button onClick={handleFormClick}> Submit</button>
                </div>
                </div>
                : ""
           }
           
            <Navbar/>
            <main>
            <div className="info">
                <div className="info-details">  
                <h3>Doctor Schedule</h3>
                <button className="add" onClick={showAddForm}>Add Appointment</button>

                </div>
                <div className="searchIn"> 
                <button className="search"> <BiSearchAlt2 size={25}/> </button>
                <input type="text" placeholder="search doctor" onChange={search} name="search_supplier"/>
               
</div>
                

            </div>
            <div className="table">
            <table>
                <tr>
                    <th>Doctor I.D</th>
                    <th>Doctor Name</th>
                    <th>Schedule Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Action</th>
                    
                    
                    
                </tr>

               
            {searchQuery === "" ? (
                schedule.map(sched=>(
                    
                            <tr key={sched.schedule_id}>
                                <td>{sched.doctor_id}</td>
                                <td>{sched.fullname}</td>
                                <td>{Moment(sched.schedule_date).format('YYYY-MM-DD')}</td>
                                <td>{sched.start_time}</td>
                                <td>{sched.end_time}</td>
                                <td className="action"> 
                                
                                <button className="delete" onClick ={()=>handleDelete(sched.schedule_id)}>Delete</button></td>
                            </tr>
                )))
                :
                filteredPatient.length > 0 ? (
                    filteredPatient.map((pat) => (
                      <tr key={pat.schedule_id}>
                        <td>{pat.doctor_id}</td>
                        <td>{pat.fullname}</td>
                        <td>{Moment(pat.schedule_date).format('YYYY-MM-DD')}</td>
                        <td>{pat.start_time}</td>
                        <td>{pat.end_time}</td>
                  
                        <td className="action"> 
                                
                                <button className="delete" onClick ={()=>handleDelete(pat.schedule_id)}>Delete</button></td>
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

export default Admin_Schedule;