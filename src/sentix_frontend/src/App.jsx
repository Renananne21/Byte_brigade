import React, { useState } from 'react';
import { sentix_backend } from 'declarations/sentix_backend';
import { Link } from 'react-router-dom';
import logo from './Images/logo.png';
import Image1 from './Images/Img1.jpg';
import Image2 from './Images/Img2.jpg';
import Image3 from './Images/Img3.jpg';
import Image4 from './Images/Img4.jpg';

const handleCreateEvent = async (title, description, date, price, image) => {
  try {
    const response = await sentix_backend.create_event(title, description, date, price, image);
    alert("Event created successfully!");
  } catch (error) {
    alert("Failed to create event.");
    console.error("Create Event Error:", error);
  }
};


function App() {
  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      image: Image1, title: "Concert in the Park", date: "November 15, 2024", time: "7:00 PM",
      description: "Join us for a night of music under the stars!", eventType: "Concert", location: 'Central Park',
      moreDescription: 'Join us for an unforgettable evening of music!',
      ticketOptions: [
        { type: 'General Admission', price: 20 },
        { type: 'VIP', price: 50 },
      ],
    },
    {
      image: Image2, title: "Art Exhibition", date: "December 1, 2024", time: "5:00 PM",
      description: "Explore the latest works from local artists.", eventType: "Art"
    },
    {
      image: Image3, title: "Fashion Week", date: "November 24, 2024", time: "10:00 AM",
      description: "Dont miss the chance to immerse yourself in a world of fashion", eventType: "Fashion"
    },
    {
      image: Image4, title: "November Music Festival", date: "November 30, 2024", time: "10:00 PM",
      description: "Come and celebrate the joy of music!", eventType: "Festival"
    }
  ]);



  return (
    <div>
      <main>
        <div className="header">
          <nav>
            <img src={logo} className="logo" />
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contactUs">Contact</Link></li>
            </ul>
            <div>
              <Link to="/signUp" className="signup">Sign Up</Link>
            </div>
          </nav>
        </div>
        <div className='upcomingEvents'>
          <div className="item">
            <h2>Upcoming Events</h2>
            <form className="searchbar">
              <input type="text" placeholder="Search..." className='search' />
            </form>
            <select name="SelectEvent" className="eventDropdown">
              <option>Event type</option>
              <option>Concert</option>
              <option>Art</option>
              <option>Festival</option>
              <option>Fashion</option>
            </select>
          </div>
          <div className="eventsGrid">
            {upcomingEvents.map((event, index) => (
              <Link to="/buy-ticket/:eventId">
                <div className="eventCard" key={index}>
                  <img src={event.image} className="eventImage" />
                  <h3>{event.title}</h3>
                  <p>{event.date} at {event.time}</p>
                  <p>{event.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <button className="more" >More</button>
        </div>
        <div className="createResell">
          <div className="createEvent">
            <h2>Add Your Event Now!</h2>
            <p>Have an event? Create Your event and sell tickets easily on TicketGo.</p>
            <Link to="createEvent"><button className="createbtn">Create</button></Link>
          </div>
          <div className="resell">
            <h2>Ticket Resale Market</h2>
            <p>Got tickets you no longer need? Resell them here!</p>
            <div className="resellbtns">
              <button className="resellbtn">Resell</button>
              <button className="learnmorebtn">Learn More</button>
            </div>
          </div>
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
              <p><Link to="/contactUs">Contact Us</Link></p>
              <p>FAQs</p>
            </div>
          </div>
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
