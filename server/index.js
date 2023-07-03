import express, { json } from "express";
import mysql from "mysql";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
const app = express();
const database = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"devilmaycry26",
    database:"db"
})

app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000"],
    method:["GET","POST"],
    credentials:true,
}));

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    key:'usedId',
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie:{
        expires:60*60*200,
    },
}));



//get requests
app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})



app.get("/admin", (req,res)=>{
    if(req.session.user){
        res.send({loggedIn:true, user:req.session.user})
        
    }
    else{
        res.send({loggedIn:false})
    }
});

app.get("/doctor_login", (req,res)=>{
    if(req.session.doctor){
        res.send({loggedIn:true, user:req.session.doctor})
        
    }
    else{
        res.send({loggedIn:false})
    }
});

app.get("/", (req,res)=>{
    if(req.session.patient){
        res.send({loggedIn:true, user:req.session.patient})
        
    }
    else{
        res.send({loggedIn:false})
    }
});

app.get("/dashboard",(req,res)=>{
    if(req.session.user){
        const q = `SELECT 
        (SELECT COUNT(patient_id) FROM patient) AS num_patients, 
        (SELECT COUNT(doctor_id) FROM doctor) AS num_doctors,
        (SELECT COUNT(appointment_id) FROM appointment WHERE status="Accepted") AS num_appointments_accepted,
         (SELECT COUNT(appointment_id) FROM appointment WHERE status="Pending") AS num_appointments_pending,
              (SELECT COUNT(appointment_id) FROM appointment WHERE status="Cancelled") AS num_appointments_cancelled,
         (SELECT COUNT(schedule_id) FROM schedule) AS num_schedules`;

         database.query(q,(err,result)=>{
            if(err) return res.json(err);
            res.send({result})
        })
    }
    else{
        res.send({loggedIn:false})
    }
});

app.get("/doctor/dashboard",(req,res)=>{
    if(req.session.doctor){
        const q = `SELECT 
        (SELECT COUNT(appointment_id) FROM appointment WHERE status="Accepted" AND doctor_id = ${req.session.doctor[0].doctor_id}) AS num_appointments_accepted,
         (SELECT COUNT(appointment_id) FROM appointment WHERE status="Pending" AND doctor_id = ${req.session.doctor[0].doctor_id}) AS num_appointments_pending,
              (SELECT COUNT(appointment_id) FROM appointment WHERE status="Cancelled" AND doctor_id = ${req.session.doctor[0].doctor_id}) AS num_appointments_cancelled,
         (SELECT COUNT(schedule_id) FROM schedule WHERE doctor_id = ${req.session.doctor[0].doctor_id}) AS num_schedules`;

         database.query(q,(err,result)=>{
            if(err) return res.json(err);
            res.send({result})
        })
    }
    else{
        res.send({loggedIn:false})
    }
});

app.get("/patient",(req,res)=>{

    if(req.session.user){
        const q = "SELECT * FROM patient";
        database.query(q,(err,result)=>{
            if(err) return res.json(err);
            return res.json(result);
        })
    }
    else{
        
        res.send("Please log in first");
    }

   
})

app.get("/doctor",(req,res)=>{
    if(req.session.user){
        const q = "SELECT * from doctor";
        database.query(q,(err,result)=>{
            if(err) return res.json(err);
            res.send(result);
        })
    }
    else{
        res.send({loggedIn:false})
    }
});

app.get("/doctor/:id",(req,res)=>{
    if(req.session.user){
        const q = `SELECT * from doctor where doctor_id = ${req.params.id}`;
        database.query(q,(err,result)=>{
            if(err) return res.json(err);
            res.send(result);
        })
    }
    else{
        res.send({loggedIn:false})
    }
});

app.get("/patient/:id",(req,res)=>{
    if(req.session.user){
        const q = `SELECT * from patient where patient_id = ${req.params.id}`;
        database.query(q,(err,result)=>{
            if(err) return res.json(err);
            res.send(result);
        })
    }
    else{
        res.send({loggedIn:false})
    }
});

app.get("/patient_profile", (req,res)=>{
    
    
    if(req.session.patient){
        const q = `SELECT * from patient where patient_id = ${req.session.patient[0].patient_id}`;
        database.query(q,(err,result)=>{
            if(err) return res.json(err);
            res.send(result);
        });
    }
    else{
        res.send({loggedIn:false})
    }
})

app.get("/admin_profile", (req,res)=>{
    
    
    if(req.session.user){
        const q = `SELECT * from admin where user_id = ${req.session.user[0].user_id}`;
        database.query(q,(err,result)=>{
            if(err) return res.json(err);
            res.send(result);
        });
    }
    else{
        res.send({loggedIn:false})
    }
})
app.get("/doctor_profile", (req,res)=>{
    
    
    if(req.session.doctor){
        const q = `SELECT * from doctor where doctor_id = ${req.session.doctor[0].doctor_id}`;
        database.query(q,(err,result)=>{
            if(err) return res.json(err);
            res.send(result);
        });
    }
    else{
        res.send({loggedIn:false})
    }
})
app.get("/appointment/:id",(req,res)=>{
    if(req.session.user || req.session.doctor){
        const q = `SELECT * from appointment where appointment_id = ${req.params.id}`;
        database.query(q,(err,result)=>{
            if(err) return res.json(err);
            res.send(result);
        })
    }
    else{
        res.send({loggedIn:false})
    }
});




app.get("/appointment",(req,res)=>{

    if(req.session.user){
        const q = "SELECT appointment.appointment_id, patient.patient_id, patient.fullname as patient_fullname, doctor.doctor_id, doctor.fullname as doctor_fullname, appointment.patient_id, appointment.doctor_id, appointment.appointment_date, appointment.appointment_time, appointment.status, appointment.reason from appointment JOIN patient on appointment.patient_id = patient.patient_id JOIN doctor on appointment.doctor_id = doctor.doctor_id";
        database.query(q,(err,result)=>{
            if(err) return res.json(err);
            return res.json(result);
        })
    }

    else if (req.session.doctor){
        const q = `SELECT appointment.appointment_id, patient.patient_id, patient.fullname, appointment.patient_id, appointment.appointment_date, appointment.appointment_time, appointment.status, appointment.reason from appointment JOIN patient on appointment.patient_id = patient.patient_id where appointment.doctor_id = ${req.session.doctor[0].doctor_id}`;
        
        database.query(q,(err,result)=>{
            if(err) return res.json(err);
            return res.json(result);
        })
    }

    else if(req.session.patient){
        const q = `SELECT appointment.appointment_id, doctor.doctor_id, doctor.fullname, appointment.patient_id, appointment.appointment_date, appointment.appointment_time, appointment.status, appointment.reason from appointment JOIN doctor on appointment.doctor_id = doctor.doctor_id where patient_id = ${req.session.patient[0].patient_id}`;
        
        database.query(q,(err,result)=>{
            if(err) return res.json(err);
            return res.json(result);
        })

       
    }

    
    else{
        res.send({loggedIn:false})
    }

   
});



app.get("/schedule",(req,res)=>{


    if(req.session.user || req.session.patient){
        const q = `SELECT doctor.doctor_id, schedule.schedule_id, doctor.fullname, doctor.education, doctor.specialty, schedule.schedule_date, schedule.start_time, schedule.end_time from doctor JOIN schedule on doctor.doctor_id = schedule.doctor_id`;
        database.query(q,(err,result)=>{
            if(err) return res.json(err);
            res.send({result, user:req.session.user, patient:req.session.patient})
        })
    }else if (req.session.doctor){
        const q2 = `SELECT doctor.doctor_id, schedule.schedule_id, doctor.fullname, doctor.education, doctor.specialty, schedule.schedule_date, schedule.start_time, schedule.end_time from doctor JOIN schedule on doctor.doctor_id = schedule.doctor_id WHERE doctor.doctor_id = ${req.session.doctor[0].doctor_id}`;
        database.query(q2,(err,result)=>{
            if(err) return res.json(err);
            res.send({result, doctor: req.session.doctor});
        })
    }
    else{
        res.send({loggedIn:false})
    }

    
  
});



app.get("/schedule/:id",(req,res)=>{


    if(req.session.doctor){
        const q = `SELECT * FROM schedule WHERE doctor_id = ${req.params.id}`
        database.query(q,(err,result)=>{
            if(err) return res.json(err);
            res.send({result, user:req.session.user, patient:req.session.patient})
        })
    }
    else{
        res.send({loggedIn:false})
    }
});





//post requests


app.post('/admin_login', (req,res)=>{
    
    var username = req.body.username;
    var password = req.body.password;

    var sql = `SELECT * FROM admin where username = "${username}" AND password = "${password}"` ;
    database.query(sql,(err,result)=>{
        if(!err){
            if(result.length > 0) {
                req.session.user = result;
                res.send(result);
                

            }
            else {
                res.send({err:"No account found"});
            }
        }
        else{
            throw err;
        }
    });
});

app.post('/doctor_login', (req,res)=>{
    
    var email = req.body.email;
    var password = req.body.password;

    var sql = `SELECT * FROM doctor where email = "${email}" AND password = "${password}"` ;
    database.query(sql,(err,result)=>{
        if(!err){
            if(result.length > 0) {
                req.session.doctor = result;
                res.send(result);
                

            }
            else {
                res.send({err:"No account found"});
            }
        }
        else{
            throw err;
        }
    });
});

app.post('/patient_login', (req,res)=>{
    
    var email = req.body.email;
    var password = req.body.password;

    var sql = `SELECT * FROM patient where email = "${email}" AND password = "${password}"` ;
    database.query(sql,(err,result)=>{
        if(!err){
            if(result.length > 0) {
                req.session.patient = result;
        
                res.send(result);
                

            }
            else {
                res.send({err:"No account found"});
            }
        }
        else{
            throw err;
        }
    });
});


app.post("/admin",(req,res)=>{
    const q = "INSERT INTO admin(`username`, `password`) VALUES(?)";
    const username=req.body.username;
    const password = req.body.password;
    const check_password = req.body.check_password;
   
    const values = [username,password];

    if(password === check_password){
        database.query(q,[values],(err,result)=>{
            if(err) return res.json(err);
            return res.json(result);
        })
    }
    else{
        res.send({err:"Password is not the same!"});
    }
    
  
});

app.post("/patient",(req,res)=>{
  
    const fullname=req.body.fullname;
    const birthday = req.body.birthday;
    const sex = req.body.sex;
    const address = req.body.address;
    const email = req.body.email;
    const password = req.body.password;
    
    const values = [fullname,birthday,sex,address,email,password];
    const q = "INSERT INTO patient(`fullname`, `birthday`, `sex`, `address`, `email`, `password`) VALUES(?)";
    database.query(q,[values],(err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
    })
});

app.post("/doctor",(req,res)=>{
    const q = "INSERT INTO doctor(`fullname`, `contact`, `email`, `specialty`, `education`, `password` ) VALUES(?)";
    const fullname=req.body.fullname;
    const contact=req.body.contact;
    const email=req.body.email;
    const specialty=req.body.specialty;
    const password=req.body.education;
    const education=req.body.password;
    const values = [fullname,contact,email,specialty,password,education];
    
    database.query(q,[values],(err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
    })
});

app.post("/appointment",(req,res)=>{

    if(req.session.patient){ 
    const q = "INSERT INTO appointment(`patient_id`, `doctor_id`, `appointment_date`, `appointment_time`,`status`, `reason`) VALUES(?)";
    
    const doctor_id = req.body.doctor_id;
    const appointment_date=req.body.appointment_date;
    const appointment_time=req.body.appointment_time;
    const reason=req.body.reason;
    const status="Pending";
    
    const values = [req.session.patient[0].patient_id, doctor_id,appointment_date,appointment_time,status,reason];
    
    database.query(q,[values],(err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
       
        
    });
}
else{
    res.send({loggedIn:false})
}
});



app.post("/schedule",(req,res)=>{
    

    if(req.session.user) {
        const q = "INSERT INTO schedule(`doctor_id`, `schedule_date`, `start_time`, `end_time`) VALUES(?)";
        const doctor_id=req.body.doctor_id;
        const schedule_date=req.body.schedule_date;
        const start_time=req.body.start_time;
        const end_time = req.body.end_time;
        const values = [doctor_id,schedule_date,start_time,end_time];
        database.query(q,[values],(err,result)=>{
            if(err) return res.json(err);
            return res.json(result);
        })
    }
    else if (req.session.doctor){
        const q = "INSERT INTO schedule(`doctor_id`, `schedule_date`, `start_time`, `end_time`) VALUES(?)";
        const schedule_date=req.body.schedule_date;
        const start_time=req.body.start_time;
        const end_time = req.body.end_time;
        const values = [req.session.doctor[0].doctor_id,schedule_date,start_time,end_time];

        database.query(q,[values],(err,result)=>{
            if(err) return res.json(err);
            return res.json(result);
        })
    }

    else{
        res.send({loggedIn:false})
    }
   
});

app.post("/edit/schedule",(req,res)=>{
    const q =`UPDATE schedule SET status = ${req.body.status} WHERE schedule_id = ${req.body.schedule_id}`;
    database.query(q,(err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
    })
})

app.post("/edit/admin",(req,res)=>{
    const q =`UPDATE admin SET username ="${req.body.username}",  password = "${req.body.password}" WHERE user_id = ${req.body.user_id}`;;
    database.query(q,(err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
    })
})

app.post("/edit/doctor",(req,res)=>{
    const q =`UPDATE doctor SET fullname ="${req.body.fullname}", contact ="${req.body.contact}", email ="${req.body.email}", specialty = "${req.body.specialty}", education = "${req.body.education}", password="${req.body.password}" WHERE doctor_id = ${req.body.doctor_id}`;
    database.query(q,(err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
    })
})

app.post("/edit/patient",(req,res)=>{
    const q =`UPDATE patient SET fullname ="${req.body.fullname}", birthday ="${req.body.birthday}", email ="${req.body.email}", address = "${req.body.address}", sex = "${req.body.sex}", password="${req.body.password}" WHERE patient_id = ${req.body.patient_id}`;
    database.query(q,(err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
    })
})

app.post("/edit/appointment/:id",(req,res)=>{
    const q =`UPDATE appointment SET status ="${req.body.status}" WHERE appointment_id = ${req.params.id}`;
    database.query(q,(err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
    });
})

//delete requests

app.get("/delete/doctor/:id",(req,res)=>{
    const q = `DELETE FROM doctor where doctor_id = ${req.params.id}`;
    const q2=`DELETE FROM doctor where doctor_id = ${req.params.id}`
    database.query(q,(err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
    });
})

app.get("/delete/patient/:id",(req,res)=>{
    const q = `DELETE FROM doctor where patient_id = ${req.params.id}`;
    database.query(q,(err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
    });
})

app.get("/delete/schedule/:id",(req,res)=>{
    const q = `DELETE FROM schedule where schedule_id = ${req.params.id}`;
    database.query(q,(err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
    });
})

app.get("/delete/appointment/:id",(req,res)=>{
    const q = `DELETE FROM appointment where appointment_id = ${req.params.id}`;
    database.query(q,(err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
    });
})

app.listen(8800,()=>{
    console.log("Connected to backend");
});
