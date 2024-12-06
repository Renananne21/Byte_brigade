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
                disableIdle: true
            }
        },
        loginOptions: {
            identityProvider: "https://identity.ic0.app/#authorize"
        }
    };

    const login = async () => {
        try {
            const authClient = await AuthClient.create({
                idleOptions: { disableIdle: true }
            });
            
            if (await authClient.isAuthenticated()) {
                handleAuthenticated(authClient);
                return;
            }

            await authClient.login({
                identityProvider: "https://identity.ic0.app/#authorize",
                onSuccess: () => handleAuthenticated(authClient),
                onError: (error) => {
                    console.error("Login failed:", error);
                    setIsAuthenticated(false);
                },
                maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000)
            });
        } catch (error) {
            console.error("Authentication error:", error);
            setIsAuthenticated(false);
        }
    };
    
    const handleAuthenticated = async (authClient) => {
        const identity = await authClient.getIdentity();
        if (identity) {
            setIsAuthenticated(true);
            setShowToast(true);
        } else {
            setIsAuthenticated(false);
        }
    };

    React.useEffect(() => {
        async function checkAuth() {
            const authClient = await AuthClient.create({
                idleOptions: { disableIdle: true }
            });
            if (await authClient.isAuthenticated()) {
                handleAuthenticated(authClient);
            }
        }
        checkAuth();
    }, []);
     
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
                <li><Link to="">Events</Link></li> 
                <li><Link to="/about">About</Link></li>
                         
                  </ul>
            <span style={{ fontSize: '2rem' }} className="cart-icon" >🛒</span>
            <div>
            <Link to='/contactUs'><button className="contact-button">Contact US</button></Link>
            
                {!isAuthenticated && (
                    <button onClick={login} className="login-button">Log In</button>
                )}
            </div>
            </nav>
           
        </div> 
    );
}

export default Navbar;