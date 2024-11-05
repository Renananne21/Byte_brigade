import React from "react";
import { Link } from "react-router-dom";
import logo from '/home/renan/TICKETING-SYSTEM/src/TicketSystem1_frontend/src/Images/logo.png';

function Navbar() {
    return (
        <div className="navbar">
            <nav>
                <img src={logo} alt="" />
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contactUs">Contact</Link></li>
            </ul>
            </nav>
        </div>
    );
}

export default Navbar;
