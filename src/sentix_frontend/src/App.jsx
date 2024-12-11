import React, { useState } from 'react';
import { useRef, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { sentix_backend } from 'declarations/sentix_backend';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import BuyTickets from './Components/BuyTickets';
import EventImage from './Images/EventImage.jpg'
import Image1 from './Images/Img1.jpg';
import Image2 from './Images/Img2.jpg';
import Image3 from './Images/Img3.jpg';
import Image4 from './Images/Img4.jpg';
import ticketImage from './Images/ticketImage.jpg'
import CreateEvent from './Components/CreateEvent';

function App() {
  const navigate = useNavigate();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('All Events');
  const [visibleCount, setVisibleCount] = useState(4);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showBuyTicket, setShowBuyTicket] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const statusRef = useRef(null);
 
 
  
  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoading(true);
        const events = await sentix_backend.get_images();
      
        const details = await sentix_backend.get_events();
        console.log('Events:', details);
        const formattedEvents = events.map((event, index) => {
          if (!event.image || !(event.image instanceof Uint8Array)) {
            console.error("Invalid or missing image data for event:", event);
            return null; 
          
          }
        
          const base64Image = btoa(
            Array.from(event.image)
              .map(byte => String.fromCharCode(byte))
              .join('')
          );
        
          const eventDetails = details[index];
            if (!eventDetails) {
              console.error("Missing details for event at index:", index);
              return null;
            }

          return {
            id: event.id,
            image: `data:image/jpeg;base64,${base64Image}`, 
            title: eventDetails.title,
            description: eventDetails.description,
            eventType: 'festival',
            date: eventDetails.date,
            price: eventDetails.price,
          };
        });
        

        
        const validEvents = formattedEvents.filter(event => event !== null);
        setUpcomingEvents(validEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
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
                    <p className="slider-date">{event.date} </p>
                    <p className="slider-location">Kenya</p>
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

          <div className="events-grid" id='events-grid' >
            {filteredEvents.slice(0, visibleCount).map((event, index) => (
              <div className="event-card" key={index} onClick={ () =>(!isAuthenticated? login: handleBuyTicket(event.id, event.price))} >
                <div className="event-image-container" >
                  <img src={event.image} alt={event.title} className="event-image" />
                  <div className="event-type-badge">{event.eventType}</div>
                </div>
                <div className="event-details" >
                  <h3>{event.title}</h3>
                  <div className="event-info" >
                      <p className="event-date">{event.date}</p>
                      <p className="event-location">Kenya</p>
                      <p className="event-price">Price:{event.price} </p>
                      <p className="event-description">Description: {event.description}</p>
                     
                  </div>
                </div>
              </div>
            ))}
          </div>
          {visibleCount < filteredEvents.length && (
            <button className="load-more-button" onClick={() => setVisibleCount(upcomingEvents.length)}>
               See More 
            </button>
          )}
        </section>
      
        <div class="parent-card">
        <section className="create-event-section"></section>

        <section className="create-event-section">
          <h2>Create Your Own Event</h2>
          <div className="create-event-content" >
            <div className="create-event-text" >
              <p>Sell it All with TockenTix!</p>
              <p>Concerts. Workshops. Festivals<br/>Fashion shows</p>
              <p>Food and Drink Events. You name it!</p>
              
              <p>Ready to explore your potential?<br/> Lets's TockenTix!</p>
              {!isAuthenticated ?  (
                <button className="create-event-button" onClick={login}>Create Event</button>
              ): (
              <Link to="createEvent" className="create-event-button">Create Event</Link>)
            }
            </div>
            <img src={EventImage} alt="Create Event" className="create-event-image" />
          </div>
        </section>

        <section className="resell-section">
          <h2>Ticket Resale Marketplace</h2>
          <div className="resell-content" >
            <img src={ticketImage} alt="Resell Tickets" className="resell-image" />
            <div className="resell-text" >
              <p style={{ marginBottom: '20px', color: 'black' }}>Can't make it to an event?</p>
              <p style={{ marginBottom: '25px' }}>Sell your tickets to other fans and make a profi!</p>
              <p >Resell your tickets safely and easily on TockenTix!</p>
              <p style={{ marginBottom: '25px' }}>The #1 trusted platform for secure ticket resales</p>
              {!isAuthenticated ?  (
                <button className="resell-button" onClick={login}>Start Reselling</button>
              ): (
              <Link to="resell-ticket" className="resell-button">Start Reselling</Link>
              )}
            </div>
          </div>
          
        </section>
        </div>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section" >
              <h3>Events</h3>
              <ul >
        
                <li><a href='#events-grid'>Upcoming Events</a></li>
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