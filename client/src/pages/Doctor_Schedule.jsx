
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Doctor_Navbar from '../components/Doctor_Navbar';
import Moment from 'moment';
import { AiFillCloseSquare } from 'react-icons/ai';

const Doctor_Schedule = () =>{
    const [schedule, setSchedule] = useState([])
    const [addForm, setAddForm] = useState(false);
    const [addSchedule, setAddSchedule] = useState({
      
        schedule_date:"",
        start_time:"",
        end_time:"",
        
    });

   

   


    
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
            setAddForm(false);
          window.location.reload();
         
         
        
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

    const handleDelete = (id) =>{
       
             axios.get("http://localhost:8800/delete/schedule/" + id).then(res=> console.log(res)).catch(err=>console.log(err));
            alert("successfully deleted schedule...")
            window.location.reload();
       
        
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

                <label>  Schedule Date</label>
                <input type="date" name="schedule_date" onChange={handleFormChange} value={addSchedule.schedule_date}/>

                <label>  Start Time</label>
                <input type="time" name="start_time" onChange={handleFormChange} value={addSchedule.start_time}/>

                <label>  End Time</label>
                <input type="time" name="end_time" onChange={handleFormChange} value={addSchedule.end_time}/>




               

                <button onClick={handleFormClick}> Submit</button>
            </div>
            </div>
            : ""
           }
         
            <Doctor_Navbar/>
            <main>
            <div className="info">

                <div className="info-details">  
                <h3>Doctor Schedule</h3>
                
              
                
                <button className="add" onClick={showAddForm}>Add Schedule</button>
                </div>
            </div>
            <div className="table">
            <table>
                <tr>
                  
                    <th>Schedule Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Action</th>
                    
                    
                    
                </tr>

               
            {
                schedule.map(sched=>(
                    
                            <tr key={sched.schedule_id}>
                               
                               
                                <td>{Moment(sched.schedule_date).format('YYYY-MM-DD')}</td>
                                <td>{sched.start_time}</td>
                                <td>{sched.end_time}</td>
                                <td className="action"> 
                                
                                <button className="delete" onClick ={()=>handleDelete(sched.schedule_id)}>Delete</button></td>
                            </tr>
                ))
            }
            </table>
             </div>
            </main>
            </div>
        </div>

    )
}

export default Doctor_Schedule;