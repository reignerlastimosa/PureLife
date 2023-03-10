
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import { BiSearchAlt2 } from 'react-icons/bi';

const Admin_Patient = () =>{
    const [patient, setPatient] = useState([])
    const [addForm, setAddForm] = useState(false);
    
    const [addPatient, setAddPatient] = useState({
        fullname:"",
        bithday:"",
        sex:"",
        address:"",
        contact:"",
        email:"",
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPatient, setFilteredPatient] = useState([]);
    
    const navigate = useNavigate();
 
 



    
    const showAddForm = (e) =>{
        if(addForm === false){
            setAddForm(true);
        }else {
            setAddForm(false);
        }  
    }

    const handleFormChange = (e) =>{
        setAddPatient(prev=>({...prev,[e.target.name]: e.target.value}));
    }

    const handleFormClick = async (e) =>{
        e.preventDefault();
        try{
            await axios.post("http://localhost:8800/patient", addPatient);
            navigate("/patient")
        }catch(err){
            console.log(err);
        }
    }

    
  
    

    useEffect(()=>{
        const fetchPatient = async () =>{
            
            try{
                const res = await axios.get("http://localhost:8800/patient");
                console.log(res);
                setPatient(res.data);
            }
            catch(err){
                
                console.log(err);
            }
        }
        fetchPatient();
    },[]);

    const search = (e) =>{
        setSearchQuery(e.target.value)
        const filteredPatients = patient.filter((pat) =>
        pat.fullname && pat.fullname.toLowerCase().includes(searchQuery.toLowerCase())

        );
        
        setFilteredPatient(filteredPatients);
      }

    const handleDelete = async (id) =>{
        try{
            await axios.get("http://localhost:8800/delete/patient/" + id )
            alert("successfully deleted patient...");
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
              <div>  
                <h3>Patient Information</h3>
               
                </div>
            
                <div className="searchIn"> 
                <button className="search"> <BiSearchAlt2 size={25}/> </button>
                <input type="text" placeholder="search patient"  name="search_supplier"  onChange={search}/>
              
</div>
                
            
            </div>
            <div className="table">
            <table>
                <tr>
                    <th>Full Name</th>
                    <th>Birthday</th>
                    <th>Sex</th>
                    <th>Address</th>
                    
                    <th>Email</th>
                    <th>Password</th>
                    <th>Action</th>
                </tr>

               
                {searchQuery === "" ? (
  patient.map((pat) => (
    <tr key={pat.patient_id}>
      <td>{pat.fullname}</td>
      <td>{Moment(pat.birthday).format("YYYY-MM-DD")}</td>
      <td>{pat.sex}</td>
      <td>{pat.address}</td>

      <td>{pat.email}</td>
      <td>{pat.password}</td>
      <td className="action">
        <button>
          <Link to={"/edit/patient/" + pat.patient_id}> Edit </Link>
        </button>
        <button
          className="delete"
          onClick={() => handleDelete(pat.patient_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))
) : filteredPatient.length > 0 ? (
  filteredPatient.map((pat) => (
    <tr key={pat.patient_id}>
      <td>{pat.fullname}</td>
      <td>{Moment(pat.birthday).format("YYYY-MM-DD")}</td>
      <td>{pat.sex}</td>
      <td>{pat.address}</td>

      <td>{pat.email}</td>
      <td>{pat.password}</td>
      <td className="action">
        <button>
          <Link to={"/edit/patient/" + pat.patient_id}> Edit </Link>
        </button>
        <button
          className="delete"
          onClick={() => handleDelete(pat.patient_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="7">No patients found</td>
  </tr>
)}
            </table>
             </div>
            </main>
            </div>
        </div>

    )
}

export default Admin_Patient;