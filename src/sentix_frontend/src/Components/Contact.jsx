import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';


function ContactUs() {
    return (
        <div className="contact">
            <Navbar></Navbar>
            <header>
                
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

                        <button type="submit">Send Message</button>
                    </form>
                </div>

                <div className="info">
                    <h2>Contact Information</h2>
                    <p><strong>Phone:</strong> <a href="tel:+1234567890">+1 234 567 890</a></p>
                    <p><strong>Email:</strong> <a href="mailto:info@example.com">info@ticketgo.com</a></p>
                    <p><strong>Address:</strong>  Nairobi, Kenya</p>
                </div>
            </main>

            <footer>
                <div className="wholefooter">
                    <div className="footer">
                        <div className="events">
                            <h2>Events</h2>
                            <p>Upcoming Events</p>
                            <p>Resell Tickets</p>
                            <p>My Tickets</p>
                        </div>
                        <div className="company">
                            <h2>Company</h2>
                            <p><Link to="/about">About US</Link></p>
                            <p>Careers</p>
                            <p>Blogs</p>
                        </div>
                        <div className="support">
                            <h2>Support</h2>
                            <p>Help Center</p>
                            <p>Contact Us</p>
                            <p>FAQs</p>
                        </div>
                    </div>
                    <p>&copy; 2024 Your Company. All rights reserved.</p>
                </div>

            </footer>
        </div>
    );
};

export default ContactUs;
