import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';


function ContactUs() {
    return (
        <div className="contact">
            <header>
                <Navbar></Navbar>
                <h1>Contact Us</h1>
            </header>

            <main>
                <div>
                    <h2>Get in Touch</h2>
                    <form action="submit_contact_form.php" method="POST">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required />

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />

                        <label htmlFor="subject">Subject:</label>
                        <input type="text" id="subject" name="subject" />

                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" rows="4" required></textarea>

                        <button className="sendMessage"type="submit">Send Message</button>
                    </form>
                </div>

                <div className="info">
                    <h2>Contact Information</h2>
                    <p><strong>Phone:</strong> <a href="tel:+1234567890">+1 234 567 890</a></p>
                    <p><strong>Email:</strong> <a href="mailto:info@example.com">info@ticketgo.com</a></p>
                    <p><strong>Address:</strong>  Nairobi, Kenya</p>
                </div>
            </main>

            <footer className="footer">
          <div className="footer-content">
            <div className="footer-section" >
              <h3>Events</h3>
              <ul >
                <li>Upcoming Events</li>
                <li>Resell Tickets</li>
                <li>My Tickets</li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Company</h3>
              <ul >
                <li><Link to="/about" style={{ color: '#666', textDecoration: 'none' }}>About Us</Link></li>
                <li>Careers</li>
                <li>Blog</li>
              </ul>
            </div>
            <div className="footer-section" >
              <h3 >Support</h3>
              <ul >
                <li>Help Center</li>
                <li><Link to="/contactUs" style={{ color: '#666', textDecoration: 'none' }}>Contact Us</Link></li>
                <li>FAQs</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 TicketGO. All rights reserved.</p>
          </div>
        </footer>
        </div>
    );
};

export default ContactUs;
