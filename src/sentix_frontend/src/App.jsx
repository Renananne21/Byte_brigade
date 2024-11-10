import React, { useState } from 'react';
import { useRef, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { sentix_backend } from 'declarations/sentix_backend';
import { Link } from 'react-router-dom';
import Navbar from './Components/Navbar';
import logo from './Images/logo.png';
import EventImage from './Images/EventImage.jpg'
import Image1 from './Images/Img1.jpg';
import Image2 from './Images/Img2.jpg';
import Image3 from './Images/Img3.jpg';
import Image4 from './Images/Img4.jpg';
import ticketImage from './Images/ticketImage.jpg' 


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
        : "https://identity.ic0.app/#authorize",
    maxTimeToLive: 8 * 24 * 60 * 60 * 1e9, // days * hours * nanoseconds
  },
};
const handleBuyTicket = (selectedEventId) => {
  console.log("Selected Event ID:", selectedEventId);
  console.log("Upcoming Events:", upcomingEvents);
  if (selectedEventId !== null) {
    const event = upcomingEvents.find(event => event.id === selectedEventId);
    if (event) {
      alert(`Ticket for "${event.title}" purchased successfully for ${event.price}!`);
    }
  } else {
    alert("Please select an event to purchase a ticket.");
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
    },
    {
      image: Image1,
      title: "Concert in the Park",
      date: "2024-11-15",
      time: "7:00 PM",
      description: "Join us for a night of music under the stars!",
      eventType: "Concert",
      location: 'Central Park'
    },
    {
      image: Image2,
      title: "Art Exhibition",
      date: "2024-12-01",
      time: "5:00 PM",
      description: "Explore the latest works from local artists.",
      eventType: "Art",
      location: 'Art Gallery'
    },
    {
      image: Image3,
      title: "Fashion Week",
      date: "2024-11-24",
      time: "10:00 AM",
      description: "Immerse yourself in a world of fashion.",
      eventType: "Fashion",
      location: 'Convention Center'
    },
    {
      image: Image4,
      title: "Music Festival",
      date: "2024-11-30",
      time: "10:00 PM",
      description: "Celebrate the joy of music!",
      eventType: "Festival",
      location: 'City Stadium'
    },
    {
      image: Image1,
      title: "Jazz Night",
      date: "2024-12-10",
      time: "8:00 PM",
      description: "An evening of smooth jazz.",
      eventType: "Concert",
      location: 'Jazz Club'
    },
    {
      image: Image2,
      title: "Tech Conference 2024",
      date: "2024-12-15",
      time: "9:00 AM",
      description: "Join industry leaders for the latest in technology.",
      eventType: "Conference",
      location: 'Tech Center'
    },
    {
      image: Image3,
      title: "Food Festival",
      date: "2024-12-20",
      time: "11:00 AM",
      description: "Taste dishes from around the world.",
      eventType: "Festival",
      location: 'Downtown Square'
    },
    {
      image: Image4,
      title: "Holiday Market",
      date: "2024-12-05",
      time: "4:00 PM",
      description: "Shop for unique gifts at our annual holiday market.",
      eventType: "Market",
      location: 'Community Center'
    },
    {
      image: Image1,
      title: "Yoga Retreat",
      date: "2025-01-10",
      time: "9:00 AM",
      description: "Relax and rejuvenate at our yoga retreat.",
      eventType: "Wellness",
      location: 'Mountain Resort'
    },
    {
      image: Image2,
      title: "Open Mic Night",
      date: "2024-11-22",
      time: "6:00 PM",
      description: "Showcase your talent at our open mic night!",
      eventType: "Performance",
      location: 'Local Cafe'
    }

  ]);




  const [visibleCount, setVisibleCount] = useState(4);

  const handleMoreClick = () => {
    setVisibleCount(upcomingEvents.length);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const statusRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const authClient = await AuthClient.create(defaultOptions.createOptions);

      if (await authClient.isAuthenticated()) {
        handleAuthenticated(authClient);
      }
      renderIndex();
      setupToast();
    };

    init();
  }, []);

  const login = async () => {
    const authClient = await AuthClient.create(defaultOptions.createOptions);

    await authClient.login({
      ...defaultOptions.loginOptions,
      onSuccess: () => handleAuthenticated(authClient),
    });
  };

  const setupToast = () => {
    const closeButton = statusRef.current?.querySelector("button");
    closeButton?.addEventListener("click", () => {
      setShowToast(false);
    });
  };

  // Function to handle authentication state
  const handleAuthenticated = (authClient) => {
    setIsAuthenticated(true);
    setShowToast(true); // Show toast when authenticated
    console.log("User is authenticated");
  };

  const renderIndex = () => {
    console.log("Render index");
  };
  
  

  return (
    <div>
      
        <main>
          <div className="header">
            <Navbar></Navbar>
          </div>
          {!isAuthenticated ? (
              <div className="signUpPage">         
                <div className="signUpHeader">
                  <h1 className="signUpHeader">TicketGO!</h1>
                  <h1>Your ticket to Unforgettable Experiences</h1>
                  <p>Secure your spot at the best events</p>
                  <button onClick={login} className="signup">Log In with Internet Identity</button>
                </div>
              </div>
      ) : (
        <div className="signUpPage">         
                <div className="signUpHeader">
                  <h1 className="signUpHeader">TicketGO!</h1>
                  <h1>Your ticket to Unforgettable Experiences</h1>                  
                </div>
              </div>
      ) }
          <div className='upcomingEvents'>
            <div className="item">
              <h2>Upcoming Events</h2>
              <form className="searchbar">
                <input type="text" placeholder="Search..." className='search' />
              </form>
              <select name="SelectEvent" className="eventDropdown">
                <option>All Events</option>
                <option>Concert</option>
                <option>Art</option>
                <option>Festival</option>
                <option>Fashion</option>
              </select>
            </div>
            <div className="eventsGrid">
              {upcomingEvents.slice(0, visibleCount).map((event, index) => (
                <Link to={handleBuyTicket}>
                  <div className="eventCard" key={index}>
                    <img src={event.image} className="eventImage" />
                    <h3>{event.title}</h3>
                    <p>{event.date} at {event.time}</p>
                    <p>{event.description}</p>
                  </div>
                </Link>
              ))}
            </div>
            <button className="more" onClick={handleMoreClick} >Discover More Events</button>
          </div>
          
          <div className="createResell" >  
          <h2>Add Your Event Now!</h2>            
              <div className="createEvent" >
              <div className="text" >
              <p>Sell it All with TicketGO!<br/>Concerts.Workshops.Festivals.Fashion Shows.Food & Drink Events.You name it!</p>
              <p>TicketGO is built for creators and organizers to bring any idea to life and find what clicks with your audience.</p>
              <p>Ready to eplore your potential?<br/>Let's TicketGO!</p>
              </div>
              <div className="image" >
                <img src={EventImage} alt="" />
              </div>
              </div>
              <Link to="createEvent"><button className="createbtn">Create Your Event</button></Link>            
            </div>
            
            <div className="createResell">
            <h2>Ticket Resale Market</h2>
              <div className="resell" >
              <div className="image" >
                <img src={ticketImage} alt="" />
              </div>
              <div className="text" >
              <p>Got tickets you no longer need?<br/> Resell your Tickets Easily with TicketGO!<br/>TicketGO is the #1 platform for event-goers to buy and resell tickets effortlessly</p>
              <p>Create your own ticketing hub, manage resales, secure payments, and keep everything smooth, all in one place</p>
              <p>Zero hassle. No hidden fees </p>
              <p>What are you waiting for? GetTicketGO</p>
              </div>
              </div>
                <button className="resellbtn">Resell</button>
               </div> 
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
              <p>© 2024 Your Company. All rights reserved.</p>
            </div>
          </footer>
        </main>
    </div>
  );
}

export default App;
