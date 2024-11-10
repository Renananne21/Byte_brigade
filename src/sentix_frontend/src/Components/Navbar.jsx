import React from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import logo from '/home/venus/Byte_brigade/src/sentix_frontend/src/Images/logo.png'; 

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3">
      <img src={logo} alt="Byte Brigade Logo" />
      <a className="navbar-brand text-white font-bold" href="#">Byte Brigade</a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"  // Corrected to Bootstrap 5 syntax
        data-bs-target="#navbarNav"  // Corrected to Bootstrap 5 syntax
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link text-white hover:text-blue-500" to="#about">About</Link> {/* Use Link instead of <a> */}
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white hover:text-blue-500" to="#services">Services</Link> {/* Use Link instead of <a> */}
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white hover:text-blue-500" to="#contact">Contact</Link> {/* Use Link instead of <a> */}
          </li>
        </ul>
      </div>
    </nav>
  );
=======
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
>>>>>>> origin/master
}

export default Navbar;
