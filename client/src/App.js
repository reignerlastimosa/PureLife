
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Admin_Doctor from './pages/Admin_Doctor';
import Admin_Dashboard from './pages/Admin_Dashboard';

import Admin_Appointment from './pages/Admin_Appointment';
import Admin_Patient from './pages/Admin_Patient';

import { useState } from "react";
import './style.scss';

import Admin_Profile from "./pages/Admin_Profile";


import Patient_Login from "./pages/Patient_Login";
import Patient_signup from "./pages/Patient_Signup";
import Admin_Login from "./pages/Admin_Login";
import Admin_Signup from "./pages/Admin_Signup";
import Admin_Schedule from "./pages/Admin_Schedule";
import Patient_Appointment from "./pages/Patient_Appointment";
import Patient_MyAppointment from "./pages/Patient_MyAppointment";
import Patient_Profile from "./pages/Patient_Profile";


import Doctor_Login from "./pages/Doctor_Login";
import Doctor_Appointment from "./pages/Doctor_Appointment";
import Doctor_Dashboard from "./pages/Doctor_Dashboard";
import Doctor_Profile from "./pages/Doctor_Profile";
import Doctor_Schedule from "./pages/Doctor_Schedule";
import axios from "axios";
import Edit_Doctor from "./pages/Edit_Doctor";
import Edit_Patient from "./pages/Edit_Patient";
import Edit_Appointment from "./pages/Edit_Appointment";
import Doctor_Edit_Appointment from "./pages/Doctor_Edit_Appointment";
function App() {

  axios.defaults.withCredentials = true;

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Patient_Login/>}/>
        <Route path="/signup" element={<Patient_signup/>}/>
        <Route path="/admin" element={<Admin_Login/>}/>
        <Route path="/admin_signup" element={<Admin_Signup/>}/>
        <Route path="/dashboard" element={<Admin_Dashboard/>}/>
        <Route path="/doctor" element={<Admin_Doctor/>}/>
        <Route path="/schedule" element={<Admin_Schedule/>}/>
        <Route path="/appointment" element={<Admin_Appointment/>}/>
        <Route path="/patient" element={<Admin_Patient/>}/>
        <Route path="/edit/doctor/:id" element={<Edit_Doctor/>}/>
        <Route path="/edit/patient/:id" element={<Edit_Patient/>}/>
        <Route path="/edit/appointment/:id" element={<Edit_Appointment/>}/>

        <Route path="/profile" element={<Admin_Profile/>}/>
       
        
        <Route path="/patient_appointment" element={<Patient_Appointment/>}/>
        <Route path="/myappointment" element={<Patient_MyAppointment/>}/>
        <Route path="/patient_profile" element={<Patient_Profile/>}/>
        
        <Route path="/doctor_login" element={<Doctor_Login/>}/>
        <Route path="/doctor_appointment" element={<Doctor_Appointment/>}/>
        <Route path="/doctor_profile" element={<Doctor_Profile/>}/>
        <Route path="/doctor_dashboard" element={<Doctor_Dashboard/>}/>
        <Route path="/doctor_schedule" element={<Doctor_Schedule/>}/>
        <Route path="/doctor/edit/appointment/:id" element={<Doctor_Edit_Appointment/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
