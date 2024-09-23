import React,{useState} from 'react'
import { Link, NavLink} from 'react-router-dom'
import "../styles/Navbar.css"

const Navbar = () => {
  const [menuOpen, setmenuOpen] = useState(false)
  return (
    <>
    <nav>
    <Link to="/" className='title'>RoomRental</Link>
    <div className="menu" onClick={()=>{
      setmenuOpen(!menuOpen)
    }}>
      <span></span>
    <span></span>
    <span></span>
    </div>
      <ul className={menuOpen? "open" : ""}>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/RoomList">Rooms</NavLink></li>
        <li><NavLink to="/SignUp">SignUP</NavLink></li>
        <li><NavLink to="/Login">Login</NavLink></li>
        <li><NavLink to="/contact">ContactUs</NavLink></li>
        {/* <li><NavLink to="/">AboutUs</NavLink></li> */}
      </ul>
    </nav>
    </>
  )
}

export default Navbar
