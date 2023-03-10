
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Patient_Navbar from '../components/Patient_Navbar';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Patient_Header from '../components/Patient_Header';
import Moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { AiFillCloseSquare } from 'react-icons/ai';



const Patient_MyAppointment = () =>{
    const [myAppointment, setMyAppointment] = useState([])
    const [addForm, setAddForm] = useState(false);

    const navigate = useNavigate();
    const [view, setView] = useState({
        appointment_id:"",
        fullname:"",
        
        appointment_date:"",
        appointment_time:"",
        reason:"",
        status:"",
    });


    const showAddForm = (e, myapp) => {
        e.preventDefault();
        setView({
          appointment_id: myapp.appointment_id,
          fullname: myapp.fullname,
          appointment_date: Moment(myapp.appointment_date).format('YYYY-MM-DD'),
          appointment_time: myapp.appointment_time,
          reason:myapp.reason,
          status: myapp.status,
        });
        setAddForm(!addForm);
      };

     const cancel =  (e, myapp)=>{

        const data = {
            status : "Cancelled"
        }
       
            axios.post(`http://localhost:8800/edit/appointment/${myapp} `, data).then((res=>console.log(res))).then((err)=>console.log(err));
            alert("appointment cancelled...")
            setAddForm(false);

     }

    useEffect(()=>{
        const fetchAppointment = async () =>{
            
            try{
                const res = await axios.get("http://localhost:8800/appointment");
                
                console.log(res.data);
                setMyAppointment(res.data);
                

               
                
            }
            catch(err){
                console.log(err);
            }
        }
        fetchAppointment();
    },[]);

    return(
        <div className="whole">
           <Patient_Header/>
           <Patient_Navbar/>
           <div className="body"> 
            
            <main>
            <div className="info">
                <h3>My appointment list</h3>    
            
            </div>
            <div className="patientTable">
            <table>
                <tr>
                    <th>Appointment No.</th>
                    <th>Doctor Name</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    <th>Status</th>
                    
                    <th>Action</th>
                </tr>

                {
                myAppointment.map(myApp=>(
                    
                            <tr key={myApp.appointment_id}>
                                <td>{myApp.appointment_id}</td>
                                <td>{myApp.fullname}</td>
                                <td>{Moment(myApp.appointment_date).format('YYYY-MM-DD')}</td>
                                <td>{myApp.appointment_time}</td>
                              
                                <td style={{ color: (() => {
                                 switch (myApp.status) {
                                     case 'Cancelled':
                                        return 'red';
                                    case 'Declined':
                                        return 'red';
                                    case 'Pending':
                                        return 'orange';
                                    case 'Accepted':
                                        return 'green';
                                    default:
                                        return 'black';
                                                        }
                                        })() }}>{myApp.status}</td>
                                <td className="action"> 
                                
                                <button  type="button" onClick={(e) => showAddForm(e, myApp)}>View</button>  {
                                addForm === true?
                                <div className="addAppointmentForm" key={myApp.appointment_id}>
                  
                                <div className="form_heading"> 
                                    <h2>View Appointment</h2>
                                    <button type="button" onClick={()=>setAddForm(false)}> <AiFillCloseSquare /> </button>
                                </div>
                
                                <div className="appointmentForm">
                                        <br/>
                                        <h2>Appointment Details</h2> <br/>
                                    <h5> Appointment Number: {view.appointment_id}</h5> <br/>
                                    <h5> Doctor: {view.fullname}</h5> <br/>
                                    <h5> Appointment Date: {Moment(view.appointment_date).format('YYYY-MM-DD')}</h5> <br/>
                                    <h5> Appointment Time: {view.appointment_time}</h5> <br/>
                                    <h5>  Reason: {view.reason}  </h5>   <br/>
                                   <h5>  Status: {view.status}  </h5> 
                
                                   <button type="button" onClick={(e) => cancel(e, view.appointment_id)}> Cancel</button>
                              
                                </div>
                               
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

export default Patient_MyAppointment;