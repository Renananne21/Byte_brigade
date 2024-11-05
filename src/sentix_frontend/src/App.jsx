import { useState } from 'react';
import { sentix_backend } from 'declarations/sentix_backend';
import { Actor, HttpAgent } from '@dfinity/agent';
import logo from './Images/logo.png';
import Image1 from './Images/Img1.jpg';
import Image2 from './Images/Img2.jpg';
import Image3 from './Images/Img3.jpg';
import Image4 from './Images/Img4.jpg';

const agent = new HttpAgent();

const upcomingEvents = [
  {
    image: Image1,
    title: "Concert in the Park",
    date: "November 15, 2024",
    time: "7:00 PM",
    description: "Join us for a night of music under the stars!"
  },
  {
    image: Image2,
    title: "Art Exhibition",
    date: "December 1, 2024",
    time: "5:00 PM",
    description: "Explore the latest works from local artists."
  },
  {
    image: Image3,
    title: "Fashion Week",
    date: "November 24, 2024",
    time: "10:00 AM",
    description: "Dont miss the chance to immerse yourself in a world of fashion"
  },
  {
    image: Image4,
    title: "November Music Festival",
    date: "November 30, 2024",
    time: "10:00 PM",
    description: "Come and celebrate the joy of music!"
  }
];

const handleBuyTicket = async (eventId, price) => {
  try {
    const response = await sentix_backend.buy_ticket(eventId, price);
    alert("Ticket purchased successfully!");
  } catch (error) {
    alert("Failed to buy ticket. Please try again.");
    console.error("Buy Ticket Error:", error);
  }
};


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
    return (
    <main>
      <div class="header">
        <nav>
          <img src={logo} class="logo" />
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#Contact">Contact</a></li>
          </ul>
        <div>
            <a href="#login" class="login">Log In</a>
            <a href="#signup" class="signup">Sign Up</a>
          </div>
        </nav>  
      </div>
      <div class='upcomingEvents'>
      <div class="item">
      <h2>Upcoming Events</h2>
      <select name="SelectEvent" class="eventDropdown">
          <option>Event type</option>
          <option>Concert</option>
          <option>Workshop</option>
          <option>Festival</option>
      </select>
      </div>
      <div class="eventsGrid">
          {upcomingEvents.map((event,index) => (
            <div class ="eventCard" key={index}>
              <img src={event.image} class="eventImage" />
              <h3>{event.title}</h3>
              <p>{event.date} at {event.time}</p>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
        <button class="more">More</button>
        </div>
        <div class="createResell">

          <div class="createEvent">
            <h2>Add Your Event Now!</h2>
            <p>Have an event? Create Your event and sell tickets easily on TicketGo.</p>
            <button class="createbtn" onClick = { () => { handleCreateEvent}}>Create</button>

          </div>
          <div class="BuyTicket">
            <h2>Ticket Resale Market</h2>
            <p>Got tickets you no longer need? Resell them here!</p>
            <button class="resellbtn" onClick={() => handleBuyTicket(event.id, event.price)}>Buy Ticket</button>

            <button class="learnmorebtn">Learn More</button>
            </div>
        </div>
        <div class="wholefooter">
        <div class="footer">
          <div class="events">
            <h2>Events</h2>
            <p>Upcoming Events</p>
            <p>Resell Tickets</p>
            <p>My Tickets</p>
          </div>
          <div class="company">
            <h2>Company</h2>
            <p>About US</p>
            <p>Careers</p>
            <p>Blogs</p>
          </div>
          <div class="support">
            <h2>Support</h2>
            <p>Help Center</p>
            <p>Contact Us</p>
            <p>FAQs</p>
          </div>
          </div>
          <p class="lastline">©2024 TicketGO  |  Terms & Conditions  | Privacy</p>
        </div>
    </main>
  );
}

export default App;