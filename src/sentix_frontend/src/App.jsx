import React, { useState } from 'react';
import { useRef, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { sentix_backend } from 'declarations/sentix_backend';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
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
    maxTimeToLive:BigInt(30 * 24 * 60 * 60 * 1000 * 1000 * 1000)
  },
};



function App() {
  const navigate = useNavigate();
  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      image: Image1,
      title: "Concert in the Park",
      date: "2024-11-15",
      time: "7:00 PM",
      description: "Join us for a night of music under the stars!",
      eventType: "Concert",
      location: 'Central Park',
      price: '$50',
      capacity: '5000',
      ticketsSold: '3500'
    },
    {
      id: 2,
      image: Image2,
      title: "Art Exhibition",
      date: "2024-12-01",
      time: "5:00 PM",
      description: "Explore the latest works from local artists.",
      eventType: "Art",
      location: 'Art Gallery',
      price: '$25',
      capacity: '200',
      ticketsSold: '150'
    },
    {
      id: 3,
      image: Image3,
      title: "Fashion Week",
      date: "2024-11-24",
      time: "10:00 AM",
      description: "Immerse yourself in a world of fashion.",
      eventType: "Fashion",
      location: 'Convention Center',
      price: '$100',
      capacity: '1000',
      ticketsSold: '800'
    },
    {
      id: 4,
      image: Image4,
      title: "Music Festival",
      date: "2024-11-30",
      time: "10:00 PM",
      description: "Celebrate the joy of music!",
      eventType: "Festival",
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
    }

  ]);



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
    init();
  }, []);

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

  const [currentSlide, setCurrentSlide] = useState(0);

  // Add this useEffect hook after your other useEffect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === 3 ? 0 : prevSlide + 1
      );
    }, 5000); // 30 seconds

    return () => clearInterval(slideInterval);
  }, []);

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
            <h3>Discover and book amazing events</h3>
            <div className="featured-slider">
              {upcomingEvents.slice(currentSlide, currentSlide + 1).map((event, index) => (
                <div
                  className="slider-card"
                  key={index}
                  onClick={() => handleBuyTicket(event.id, event.price)}
                >
                  <img src={event.image} alt={event.title} />
                  <div className="slider-content">
                    <h2>{event.title}</h2>
                    <div className="slider-info">
                      <p className="slider-date">{event.date} at {event.time}</p>
                      <p className="slider-location">{event.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
              <div className="event-card" key={index} onClick={() => handleBuyTicket(event.id, event.price)} >
                <div className="event-image-container" >
                  <img src={event.image} alt={event.title} className="event-image" />
                  <div className="event-type-badge">{event.eventType}</div>
                </div>
                <div className="event-details" >
                  <h3>{event.title}</h3>
                  <div className="event-info" >
                    <p className="event-date">{event.date} at {event.time}</p>
                    <p className="event-location">{event.location}</p>
                    <p className="event-price">Price: {event.price}</p>
                    <p className="event-description">{event.description}</p>
                    <p className="event-tickets">
                      Available Tickets: {event.capacity - event.ticketsSold} / {event.capacity}
                    </p>
                  </div>
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
              <Link to="resell-ticket" className="rese1ll-button">Start Reselling</Link>
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
