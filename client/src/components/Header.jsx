
import { Link } from "react-router-dom";


const Header = () =>{
    return(
        <div className="header">
             <h1>PureLife <span> Medical Clinic</span> </h1> 
            <button><Link to = "/"> Logout</Link></button>
        </div>
    )
}

export default Header;