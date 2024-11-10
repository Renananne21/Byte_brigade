import React from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import logo from '/home/isaack/sentix/src/sentix_frontend/src/Images/logo.png';
=======
import logo from '/home/renan/TICKETING-SYSTEM/src/TicketSystem1_frontend/src/Images/logo.png';
>>>>>>> origin/master

function Navbar() {
    return (
        <div className="navbar">
            <nav>
                <img src={logo} alt="" />
<<<<<<< HEAD

                <h1 className="ticketGo">TicketGo</h1>
=======
>>>>>>> origin/master
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
