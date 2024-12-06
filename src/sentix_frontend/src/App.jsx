import React, { useState } from 'react';
import { useRef, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { sentix_backend } from 'declarations/sentix_backend';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Cart from './Components/Cart';
import BuyTickets from './Components/BuyTickets';
import EventImage from './Images/EventImage.jpg'
import Image1 from './Images/Img1.jpg';
import Image2 from './Images/Img2.jpg';
import Image3 from './Images/Img3.jpg';
import Image4 from './Images/Img4.jpg';
import ticketImage from './Images/ticketImage.jpg'
import CreateEvent from './Components/CreateEvent';

function App() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const events = await sentix_backend.get_images();
        
        const formattedEvents = events.map(event => {
          if (!event.image || !(event.image instanceof Uint8Array)) {
            console.error("Invalid or missing image data for event:", event);
            return null; 
          }
        
          const base64Image = btoa(
            Array.from(event.image)
              .map(byte => String.fromCharCode(byte))
              .join('')
          );
        
          return {
            id: event.id,
            image: `data:image/jpeg;base64,${base64Image}`, 
            title: 'Hackathon',
            description: 'coders',
            eventType: 'festival',
          };
        });
        
        
        const validEvents = formattedEvents.filter(event => event !== null);
        setUpcomingEvents(validEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, []);

  function arrayBufferToBase64(chunks) {
    if (!chunks || chunks.length === 0) {
      return '';
    }
    try {
      const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
      const mergedArray = new Uint8Array(totalLength);
      let offset = 0;
      
      for (let i = 0; i < chunks.length; i++) {
        const chunk = new Uint8Array(chunks[i]);
        mergedArray.set(chunk, offset);
        offset += chunk.length;
      }
      
      const base64String = btoa(String.fromCharCode.apply(null, mergedArray));
      return `data:image/jpeg;base64,${base64String}`;
    } catch (error) {
      console.error("Error converting array buffer to base64:", error);
      return '';
    }
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('All Events');
  const [visibleCount, setVisibleCount] = useState(4);
  
  const [showToast, setShowToast] = useState(false);
  const [showBuyTicket, setShowBuyTicket] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const statusRef = useRef(null);

  const handleAddToCart = (event) => {
    setCart(prevCart => [...prevCart, event]);
  };

  const handleRemoveFromCart = (eventId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== eventId));
  };

  const handleBuyTicket = (eventId, price) => {
    const event = upcomingEvents.find(event => event.id === eventId);
    navigate(`/buy-tickets/${eventId}`, { state: { event } });
  };

  const filteredEvents = upcomingEvents.filter(event => {
    const matchesSearch = event.title && event.description ? 
      (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())) : true;
    const matchesType = selectedEventType === 'All Events' || event.eventType === selectedEventType;
    return matchesSearch && matchesType;
  });

  const [currentSlide, setCurrentSlide] = useState(0);


  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === 3 ? 0 : prevSlide + 1
      );

    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  return (

    <div className="app-container">
      <Navbar upcomingEvents={upcomingEvents} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main>



        <div className="welcome-section">
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


        <section className="events-section">
          <div className="events-header">
            <h2>Upcoming Events</h2>


            <div className="search-filters">
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
                      <p className="event-date">Date and Time: TBA</p>
                      <p className="event-location">Location: TBA</p>
                      <p className="event-price">Price: TBA</p>
                      <p className="event-description">Description: TBA</p>
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
               See More Events
            </button>
          )}
        </section>
        <Cart cartItems={cart} onRemove={handleRemoveFromCart} />

        <section className="create-event-section"></section>

        <section className="create-event-section">
          <h2>Create Your Own Event</h2>
          <div className="create-event-content" >
            <div className="create-event-text" >
              <p>Sell it All with TockenTix!</p>
              <p>Concerts. Workshops. Festivals<br/>Fashion shows</p>
              <p>Food and Drink Events. You name it!</p>
              <p style={{ marginBottom: '25px' }}>Our platform is designed to help creators and organizers reach their perfect audience.</p>
              <p>Ready to explore your potential?<br/> Lets's TockenTix!</p>
              <Link to="createEvent" className="create-event-button">Create Event</Link>
            </div>
            <img src={EventImage} alt="Create Event" className="create-event-image" />
          </div>
        </section>

        <section className="resell-section">
          <h2>Ticket Resale Marketplace</h2>
          <div className="resell-content" >
            <img src={ticketImage} alt="Resell Tickets" className="resell-image" />
            <div className="resell-text" >
              <p style={{ fontSize: '28px', marginBottom: '20px', color: 'black' }}>Can't make it to an event?</p>
              <p >Resell your tickets safely and easily on TockenTix!</p>
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
        
                <li><a href='.events-section'>Upcoming Events</a></li>
                <li>Resell Tickets</li>
                <li>My Tickets</li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Company</h3>
              <ul >
                <li><Link to="/about" style={{ color: '#black', textDecoration: 'none' }}>About Us</Link></li>
                <li>Careers</li>
                <li>Blog</li>
              </ul>
            </div>
            <div className="footer-section" >
              <h3 >Support</h3>
              <ul >
                <li>Help Center</li>
                <li><Link to="/contactUs" style={{ color: '#black', textDecoration: 'none' }}>Contact Us</Link></li>
                <li>FAQs</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 TockenTix. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;