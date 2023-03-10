
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import { BiSearchAlt2 } from 'react-icons/bi';

const Admin_Appointment = () =>{
    const [appointment, setAppointment] = useState([])
    const[status, setStatus] = useState({status:"", schedule_id: ""})
    const [addForm, setAddForm] = useState(false);
    const [addAppointment, setAddAppointment] = useState({
        fullname:"",
        bithday:"",
        sex:"",
        address:"",
        contact:"",
        email:"",
    });

    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPatient, setFilteredPatient] = useState([]);
    

    
    
   
    

    useEffect(()=>{
        const fetchAppointment = async () =>{
            
            try{
                const res = await axios.get("http://localhost:8800/appointment");
                console.log(res);
                setAppointment(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchAppointment();
    },[]);

    const search = (e) =>{
        setSearchQuery(e.target.value)
        const filteredPatients = appointment.filter((pat) =>
        pat.patient_fullname && pat.patient_fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||  pat.doctor_fullname && pat.doctor_fullname.toLowerCase().includes(searchQuery.toLowerCase())

        );
        
        setFilteredPatient(filteredPatients);
      }

    const handleDelete = async (id) =>{
        try{
            await axios.get("http://localhost:8800/delete/appointment/" + id);
            alert("successfully deleted appointment...")
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
          
            <Navbar/>
            <main>
            <div className="info">
                <h3>Appointment</h3>
                
                <div className="searchIn"> 
                <button className="search"> <BiSearchAlt2 size={25}/> </button>
                <input type="text" placeholder="search name"    onChange={search}/>
               
                </div>
                
            
            </div>
            <div className="table">
            <table>
                <tr>
                    <th>Appointment No.</th>
                    <th>Patient Name</th>
                    <th>Doctor Name</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    <th>Status</th>
                    
                    <th>Action</th>
                    
                </tr>

               
            {searchQuery === "" ? ( 
                appointment.map(app=>(
                    
                            <tr key={app.appointment_id}>
                                <td>{app.appointment_id}</td>
                                <td>{app.patient_fullname}</td>
                                <td>Dr.{app.doctor_fullname}</td>
                                <td>{Moment(app.appointment_date).format('YYYY-MM-DD')}</td>
                                <td>{app.appointment_time}</td>
                                
                                <td style={{ color: (() => {
                                 switch (app.status) {
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
                                        })() }}>{app.status}</td>
                                <td className="action"> 
                                <button><Link to={"/edit/appointment/" + app.appointment_id}>  Edit  </Link></button>
                                <button className="delete" onClick ={()=>handleDelete(app.appointment_id)}>Delete</button></td>

                            
                            </tr>
                            
                ))):

                 filteredPatient.length > 0 ? (
                    filteredPatient.map((filteredNames) => (
                      <tr key={filteredNames.appointment_id}>
                        <td>{filteredNames.appointment_id}</td>
                        <td>{filteredNames.patient_fullname}</td>
                        <td>Dr.{filteredNames.doctor_fullname}</td>
                        <td>{Moment(filteredNames.appointment_date).format('YYYY-MM-DD')}</td>
                        <td>{filteredNames.appointment_time}</td>
                        <td style={{ color: (() => {
                                 switch (filteredNames.status) {
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
                                        })() }}>{filteredNames.status}</td>
                  
                        
                        <td className="action"> 
                                <button><Link to={"/edit/appointment/" + filteredNames.appointment_id}>  Edit  </Link></button>
                                <button className="delete" onClick ={()=>handleDelete(filteredNames.appointment_id)}>Delete</button></td>
                      </tr>
                    ))
                 )
                 : 
                 (
                    <tr>
                      <td colSpan="7">No patients or doctors found</td>
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

export default Admin_Appointment;