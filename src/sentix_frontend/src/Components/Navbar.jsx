import React from "react";
import { Link } from "react-router-dom";
import logo from '../Images/LOGO.jpg';
import { useState } from 'react';
import { AuthClient } from "@dfinity/auth-client";

function Navbar({ searchTerm, setSearchTerm }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showToast, setShowToast] = useState(false);
   

      
    const defaultOptions = {
      createOptions: {
        idleOptions: {
          disableIdle: true,
        },
      },
      loginOptions: {
        identityProvider:
          process.env.DFX_NETWORK === "ic"
            ? "https://identity.ic0.app/#authorize"
            : `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`,
        maxTimeToLive:BigInt(30 * 24 * 60 * 60 * 1000 * 1000 * 1000)
      },
    };

    const login = async () => {
        const authClient = await AuthClient.create(defaultOptions.createOptions);
        await authClient.login({
          ...defaultOptions.loginOptions,
          onSuccess: () => handleAuthenticated(authClient),
        });
      };
    
      const handleAuthenticated = (authClient) => {
        setIsAuthenticated(true);
        setShowToast(true);
      };
     
    return (
        <div className="navbar">
            <nav>
                <div className="logo">
                <img src={logo} alt="" />
                <h1 className="ticketGo">TockenTix</h1>
                </div>
                <input className='search-input' type ='text' placeholder="Search events..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contactUs">Contact</Link></li>          
                  </ul>
            <span style={{ fontSize: '2rem' }}>&#128722;</span>
            
                {!isAuthenticated && (
                    <button onClick={login} className="login-button">Log In</button>
                )}
            
            </nav>
        </div> 
    );
}

export default Navbar;