import React from "react";
import { Link } from "react-router-dom";
import logo from '../Images/LOGO.jpg';
import { useState } from 'react';
import { AuthClient } from "@dfinity/auth-client";

function Navbar({ searchTerm, setSearchTerm, selectedEventType, upcomingEvents }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const filteredEvents = upcomingEvents.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedEventType === 'All Events' || event.eventType === selectedEventType;
        return matchesSearch && matchesType;
      });

      
    const defaultOptions = {
        createOptions: {
            idleOptions: {
                disableIdle: true
            }
        },
        loginOptions: {
            identityProvider:
                process.env.DFX_NETWORK === "ic"
                    ? "https://identity.ic0.app/#authorize"
                    : process.env.LOCAL_II_CANISTER,
        }
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

                <h1 className="ticketGo">TokenTix</h1>
                </div>
                <input
                type="text"
                placeholder="Search events..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} />
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contactUs">Contact</Link></li>
            </ul>
            {isAuthenticated ? (
                console.log("Authenticated")
            ) : (
                <button onClick={login} className="login-button">Log In</button>
            )}
            </nav>
        </div>
    );
}

export default Navbar;