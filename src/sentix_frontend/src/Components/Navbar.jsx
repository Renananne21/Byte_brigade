import React from "react";
import { Link } from "react-router-dom";
import logo from 'src/Components/Images/logo.png'; 

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
}

export default Navbar;
