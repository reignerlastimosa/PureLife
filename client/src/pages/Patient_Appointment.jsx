
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Patient_Navbar from '../components/Patient_Navbar';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Moment from 'moment';
import Patient_Header from '../components/Patient_Header';
import { MdLocalHospital } from 'react-icons/md';
import { AiFillCloseSquare } from 'react-icons/ai';



const Patient_Appointment = () =>{

    const[patientId,setPatientId] = useState([]);

    const navigate = useNavigate();
    const [appointment, setAppointment] = useState([])
    const [addForm, setAddForm] = useState(false);

    const [addDoctor, setAddDoctor] = useState({
        patient_id:"",
        doctor_id:"",
        
        appointment_date:"",
        appointment_time:"",
        reason:"",
    });


   

    useEffect(()=>{
        const fetchAppointment = async () =>{
            
            try{
                const res = await axios.get("http://localhost:8800/schedule");
                
                
                setPatientId(res.data.patient[0].patient_id);
                setAppointment(res.data.result);
              
            }
            catch(err){
                console.log(err);
            }
        }
        fetchAppointment();
    },[patientId]);

  
    

    const showAddForm = (e, app) => {
        e.preventDefault();
        setAddDoctor({
          patient_id: patientId,
          doctor_id: app.doctor_id,
          appointment_date: Moment(app.schedule_date).format('YYYY-MM-DD'),
          appointment_time: app.start_time + " - " + app.end_time,
          reason: "",
        });
        setAddForm(!addForm);
      };

 const handleFormChange = (e) =>{
    setAddDoctor(prev=>({...prev,[e.target.name]: e.target.value}));
    }

    


    const handleFormClick =(e) =>{
        
        
        e.preventDefault();
        
       
        
        setAddDoctor({doctor_id:e.target.querySelector('input[name="doctor_id"').value, patient_id:e.target.querySelector('input[name="patient_id"').value,appointment_date: e.target.querySelector('input[name="appointment_date').value, appointment_time: e.target.querySelector('input[name="appointment_time').value})
        
        console.log(addDoctor);
           
           axios.post("http://localhost:8800/appointment", addDoctor).then(res=>console.log(res.data)).catch(err=> console.log(err.response.data))
            alert("added appointment");
           setAddForm(false);
            navigate("/myappointment");
        }
       
    return(
        <div className="whole">
           <Patient_Header />
           <Patient_Navbar/>
           <div className="body"> 
          
            <main>
            <div className="info">
                <h3>Doctor Schedule List </h3>    
            
            </div>
            <div className="patientTable">
            <table>
                <tr>
                    
                    <th>Doctor Name</th>
                    <th>Education</th>
                    <th>Specialty</th>
                    <th>Appointment Date</th>
                    <th>Available Time</th>
                    
                    <th>Action</th>
                </tr>

                {
                appointment.map(app=>(
                    
                            <tr key={app.schedule_id}>
                                <td>Dr. {app.fullname}</td>
                                <td>{app.education}</td>
                                <td>{app.specialty}</td>
                                <td>{Moment(app.schedule_date).format('YYYY-MM-DD')}</td>
                                <td>{app.start_time}</td>
                                <td> <button className="get" type="button" onClick={(e) => showAddForm(e, app)}>  Get Appointment </button> {
                    addForm === true?
                              
                <div className="addAppointmentForm" key={app.schedule_id}>
                   <form method="POST" onSubmit={handleFormClick}> 
                <div className="form_heading"> 
                    <h2>ADD DOCTOR</h2>
                    <button type="button" onClick={()=>setAddForm(false)}><AiFillCloseSquare/></button>
                </div>

                <div className="appointmentForm">

                    <br/>
                <h2>  Appointment Details</h2>
                <div className="appointmentFormBody">  
                
                    
                    <div> 
                    <label>  Doctor Name </label> <br/>
                    <label>  Appointment Date:</label><br/>
                    <label>  Available Time: </label><br/>
                    </div>

                  

                    <div>  
                    <label>Dr. {app.fullname}</label>
                    <input type="hidden" name="patient_id" value={patientId} />
                    <input type="hidden" name="doctor_id" value={addDoctor.doctor_id} />
                    
                    <br/>
                    <input type="text" name="appointment_date"  value={Moment(addDoctor.appointment_date).format('YYYY-MM-DD')} disabled/>
                    <br/>
                    <input type="text" name="appointment_time"  value={addDoctor.appointment_time}  disabled/>
                    </div>
                    

                   
                </div>
                <br/>
                    <label>Reason for Appointment</label><br/>
                <textarea name="reason" onChange={handleFormChange} defaultValue={addDoctor.reason}></textarea><br/>
                    <input type="submit" value="Submit" /> 
                </div>
                </form>
            </div>
            :
           ""

} </td>
                                              
                  

             
                                
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

export default Patient_Appointment;