import React from "react";
import { Link } from "react-router-dom";
import logo from '../Images/LOGO.jpg';
import { useState } from 'react';
import Cart from "./Cart";
import { AuthClient } from "@dfinity/auth-client";

function Navbar({ searchTerm, setSearchTerm, cartEvents, upcomingEvents }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);


   
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
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contactUs">Contact</Link></li>          
                  </ul>
           <Link to='cart'> <span style={{ fontSize: '2rem' }} className="cart-icon" onClick={() => setIsCartOpen(!isCartOpen)}>🛒{Array.isArray(cartEvents) && cartEvents.length > 0 && (
    <span className="cart-count">{cartEvents.length}</span>
  )}</span></Link>
            {isCartOpen && <Cart cart={cartEvents} removeFromCart={removeFromCart} updateQuantity={updateQuantity}/>}
                {!isAuthenticated && (
                    <button onClick={login} className="login-button">Log In</button>
                )}
            
            </nav>
           
        </div> 
    );
}

export default Navbar;