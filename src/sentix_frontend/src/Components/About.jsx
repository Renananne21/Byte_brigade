import React from 'react';
import Navbar from './Navbar';


function About () {
    return (
        <div className="about-page">
            <Navbar></Navbar>
            <div className="about-container">
            <div className="about-hero">
                <h1>About Us</h1>
                <p>Welcome to TockenTix - your go-to platform for hassle-free event ticketing!</p>
            </div>

            <div className="about-details">
                <h2>Our Mission</h2>
                <p>Our mission is to make event ticketing simple, secure, and accessible. Whether you're organizing a concert, a conference, or a local event, we're here to provide a seamless experience for both event organizers and attendees.</p>
            </div>

            <div className="about-features">
                <h2>Why Choose Us?</h2>
                <ul>
                    <li><strong>Decentralized and Secure:</strong> Built on a decentralized network, ensuring transparency and security.</li>
                    <li><strong>User-Friendly Interface:</strong> Enjoy a smooth and intuitive experience from ticket purchase to entry.</li>
                    <li><strong>Real-Time Updates:</strong> Stay informed with real-time notifications and updates.</li>
                    <li><strong>Simplified Process:</strong> Streamline ticket issuance, transfer and authentication.</li>
                </ul>
            </div>

            <div className="about-team">
                <h2>Meet the Team</h2>
                <p>We're a team of passionate developers, designers, and event enthusiasts dedicated to transforming the ticketing industry.</p>
            </div>
            </div>
        </div>
    );
};

export default About;