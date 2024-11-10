import React, { useState } from 'react';
import { useRef, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { sentix_backend } from 'declarations/sentix_backend';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import Navbar from './Components/Navbar';
import logo from './Images/logo.png';
=======
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import BuyTickets from './Components/BuyTickets';
import EventImage from './Images/EventImage.jpg'
>>>>>>> origin/master
import Image1 from './Images/Img1.jpg';
import Image2 from './Images/Img2.jpg';
import Image3 from './Images/Img3.jpg';
import Image4 from './Images/Img4.jpg';
<<<<<<< HEAD
import Button from './Components/Button';

=======
import ticketImage from './Images/ticketImage.jpg'
>>>>>>> origin/master

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
<<<<<<< HEAD
    maxTimeToLive: 8 * 24 * 60 * 60 * 1e9, // days * hours * nanoseconds
  },
};
const handleBuyTicket = (selectedEventId) => {
  console.log("Selected Event ID:", selectedEventId);
  console.log("Upcoming Events:", upcomingEvents);
  if (selectedEventId !== null) {
    const event = upcomingEvents.find(event => event.id === selectedEventId);
    if (event) {
      alert(`Ticket for "${event.title}" purchased successfully for $${event.price}!`);
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
=======
    maxTimeToLive: 8 * 24 * 60 * 60 * 1e9,
  },
};



function App() {
  const navigate = useNavigate();
  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
>>>>>>> origin/master
      image: Image1,
      title: "Concert in the Park",
      date: "2024-11-15",
      time: "7:00 PM",
      description: "Join us for a night of music under the stars!",
      eventType: "Concert",
<<<<<<< HEAD
      location: 'Central Park'
    },
    {
=======
      location: 'Central Park',
      price: '$50',
      capacity: '5000',
      ticketsSold: '3500'
    },
    {
      id: 2,
>>>>>>> origin/master
      image: Image2,
      title: "Art Exhibition",
      date: "2024-12-01",
      time: "5:00 PM",
      description: "Explore the latest works from local artists.",
      eventType: "Art",
<<<<<<< HEAD
      location: 'Art Gallery'
    },
    {
=======
      location: 'Art Gallery',
      price: '$25',
      capacity: '200',
      ticketsSold: '150'
    },
    {
      id: 3,
>>>>>>> origin/master
      image: Image3,
      title: "Fashion Week",
      date: "2024-11-24",
      time: "10:00 AM",
      description: "Immerse yourself in a world of fashion.",
      eventType: "Fashion",
<<<<<<< HEAD
      location: 'Convention Center'
    },
    {
=======
      location: 'Convention Center',
      price: '$100',
      capacity: '1000',
      ticketsSold: '800'
    },
    {
      id: 4,
>>>>>>> origin/master
      image: Image4,
      title: "Music Festival",
      date: "2024-11-30",
      time: "10:00 PM",
      description: "Celebrate the joy of music!",
      eventType: "Festival",
<<<<<<< HEAD
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
=======
      location: 'City Stadium',
      price: '$75',
      capacity: '10000',
      ticketsSold: '7500'
    },
    {
      id: 5,
      image: Image2,
      title: "Food Festival Extravaganza",
      date: "2024-12-01",
      time: "11:00 AM",
      description: "Taste dishes from around the world at our annual food festival.",
      eventType: "Festival",
      location: "Downtown Square",
      price: "$25",
      capacity: "8000",
      ticketsSold: "6000"
    },
    {
      id: 6,
      image: Image3,
      title: "Stand-Up Comedy Night",
      date: "2024-11-20",
      time: "8:30 PM",
      description: "Laugh out loud with some of the best comedians in the country!",
      eventType: "Comedy",
      location: "The Comedy Club",
      price: "$40",
      capacity: "300",
      ticketsSold: "250"
    },
    {
      id: 7,
      image: Image4,
      title: "Winter Wonderland Market",
      date: "2024-12-05",
      time: "10:00 AM",
      description: "Explore holiday shops, treats, and activities for all ages!",
      eventType: "Market",
      location: "City Hall Plaza",
      price: "$40",
      capacity: "10000",
      ticketsSold: "8000"
    },
    {
      id: 8,
      image: Image1,
      title: "Art Exhibition: Modern Marvels",
      date: "2024-11-25",
      time: "6:00 PM",
      description: "Discover modern art from upcoming artists at this exclusive gallery.",
      eventType: "Exhibition",
      location: "Art Museum",
      price: "$20",
      capacity: "500",
      ticketsSold: "450"
    },
    {
      id: 9,
      image: Image2,
      title: "Holiday Movie Marathon",
      date: "2024-12-10",
      time: "5:00 PM",
      description: "Catch all your favorite holiday classics on the big screen!",
      eventType: "Movie Screening",
      location: "Main Street Cinema",
      price: "$15",
      capacity: "200",
      ticketsSold: "150"
    },
    {
      id: 10,
      image: Image3,
      title: "Tech Conference 2024",
      date: "2024-12-15",
      time: "9:00 AM",
      description: "Join industry leaders for insights into the future of technology.",
      eventType: "Conference",
      location: "Convention Center",
      price: "$120",
      capacity: "2000",
      ticketsSold: "1800"
>>>>>>> origin/master
    }

  ]);

<<<<<<< HEAD
  function App() {
    return (
      <div>
        <h1>Welcome to My App</h1>
        <Button />
      </div>
    );
  }

 

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

=======


  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('All Events');
  const [visibleCount, setVisibleCount] = useState(6);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showBuyTicket, setShowBuyTicket] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const statusRef = useRef(null);

  const handleBuyTicket = (eventId, price) => {
    const event = upcomingEvents.find(event => event.id === eventId);
    navigate(`/buy-tickets/${eventId}`, { state: { event } });
  };

  const filteredEvents = upcomingEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedEventType === 'All Events' || event.eventType === selectedEventType;
    return matchesSearch && matchesType;
  });

  useEffect(() => {
    const init = async () => {
      const authClient = await AuthClient.create(defaultOptions.createOptions);
      if (await authClient.isAuthenticated()) {
        handleAuthenticated(authClient);
      }
    };
>>>>>>> origin/master
    init();
  }, []);

  const login = async () => {
    const authClient = await AuthClient.create(defaultOptions.createOptions);
<<<<<<< HEAD

=======
>>>>>>> origin/master
    await authClient.login({
      ...defaultOptions.loginOptions,
      onSuccess: () => handleAuthenticated(authClient),
    });
  };

<<<<<<< HEAD
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
      {isAuthenticated ? (
       <main>
       <div className="header">
         <Navbar></Navbar>
       </div>
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
    ) : (
      <div className="signUpPage">
      <nav>
        <img src={logo} className="logo" />
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contactUs">Contact</Link></li>
        </ul>
      </nav>
      <h1 className="signUpHeader">Please Log In</h1>
      <button onClick={login} className="signup">Log In with Internet Identity</button>
    </div>
        
        )}

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
=======
  const handleAuthenticated = (authClient) => {
    setIsAuthenticated(true);
    setShowToast(true);
  };

  return (
    <div className="app-container" >
      <Navbar />

      <main>
        {!isAuthenticated ? (
          <div className="hero-section">
            <h1 className="main-title" >TicketGO!</h1>
            <h2 className="subtitle" >Your Gateway to Unforgettable Experiences</h2>
            <p className="hero-text" >Secure your spot at exclusive events today</p>
            <button onClick={login} className="login-button" >Log In with Internet Identity</button>
          </div>
        ) : (
          <div className="welcome-section" >
            <h1 >Welcome to TicketGO!</h1>
            <p>Discover and book amazing events</p>
          </div>
        )}
        <section className="events-section" >
          <div className="events-header" >
            <h2>Upcoming Events</h2>
            <div className="search-filters" >
              <input
                type="text"
                placeholder="Search events..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} />
              <select
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value)}
                className="event-type-select">
                <option>All Events</option>
                <option>Concert</option>
                <option>Art</option>
                <option>Festival</option>
                <option>Fashion</option>
              </select>
            </div>
          </div>

          <div className="events-grid" >
            {filteredEvents.slice(0, visibleCount).map((event, index) => (
              <div className="event-card" key={index}>
                <div className="event-image-container" >
                  <img src={event.image} alt={event.title} className="event-image" />
                  <div className="event-type-badge">{event.eventType}</div>
                </div>
                <div className="event-details" >
                  <h3>{event.title}</h3>
                  <div className="event-info" >
                    <p className="event-date">{event.date} at {event.time}</p>
                    <p className="event-location">{event.location}</p>
                  </div>
                  <p className="event-description">{event.description}</p>
                  <div className="event-stats">
                    <span className="event-price">{event.price}</span>
                    <span className="tickets-remaining">
                      {event.capacity - event.ticketsSold} tickets left
                    </span>
                  </div>
                  <button className="buy-ticket-button" onClick={() => handleBuyTicket(event.id, event.price)}>Buy Tickets</button>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < filteredEvents.length && (
            <button className="load-more-button" onClick={() => setVisibleCount(upcomingEvents.length)}>
              Load More Events
            </button>
          )}
        </section>

        <section className="create-event-section">
          <h2>Create Your Own Event</h2>
          <div className="create-event-content" >
            <div className="create-event-text" >
              <h3>Sell it All with TicketGO!</h3>
              <p>From concerts to workshops, festivals to fashion shows - bring your ideas to life!</p>
              <p style={{ marginBottom: '25px' }}>Our platform is designed to help creators and organizers reach their perfect audience.</p>
              <Link to="createEvent" className="create-event-button">Create Event</Link>
            </div>
            <img src={EventImage} alt="Create Event" className="create-event-image" />
          </div>
        </section>

        <section className="resell-section">
          <h2>Ticket Resale Marketplace</h2>
          <div className="resell-content" >
            <img src={ticketImage} alt="Resell Tickets" className="resell-image" />
            <div className="resell-text" style={{ flex: '1' }}>
              <h3 style={{ fontSize: '28px', marginBottom: '20px', color: '#2c3e50' }}>Can't make it to an event?</h3>
              <p >Resell your tickets safely and easily on TicketGO!</p>
              <p style={{ marginBottom: '25px' }}>The #1 trusted platform for secure ticket resales</p>
              <button className="rese1ll-button">Start Reselling</button>
            </div>
          </div>
        </section>

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


      </main>
    </div>
  );
}
export default App;
>>>>>>> origin/master
