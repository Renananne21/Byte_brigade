import React, { useState } from 'react';
import { useRef, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { sentix_backend } from 'declarations/sentix_backend';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import BuyTickets from './Components/BuyTickets';
import EventImage from './Images/EventImage.jpg'
import ticketImage from './Images/ticketImage.jpg'
import CreateEvent from './Components/CreateEvent';
import { Layout,List, Divider } from 'antd';
import { Card, Typography, Button, Image } from 'antd'   
const { Footer } = Layout;
const { Title } = Typography;


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
            eventType: eventDetails.title,
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
                                  <h2 style={{ 
                                    color: '#ffffff',
                                    fontFamily: 'Arial, sans-serif',
                                    fontWeight: 'bold',
                                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                                  }}>{event.title}</h2>
                                  <div className="slider-info">
                                    <p className="slider-date" style={{ 
                                      color: '#ffffff',
                                      fontFamily: 'Arial, sans-serif',
                                      fontWeight: '600',
                                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                                    }}>{event.date} </p>
                                                     </div>


                </div>          
              </div>
            ))}
          </div>
        </div>


        <section className="events-section">
          <div className="events-header" style={{ textAlign: 'center' }}>
            <h2 style={{ 
              background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'fadeInUp 1s ease-out',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}>Upcoming Events</h2>


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
      
        <div className="side-by-side-sections" style={{ display: 'flex', gap: '2rem', justifyContent: 'center', padding: '2rem' }}>
          <Card className="create-event-section" style={{ boxShadow: '8px 0 16px -4px rgba(0, 0, 0, 0.2), -8px 0 16px -4px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.2)', transform: 'translateY(-5px)', transition: 'all 0.3s ease', maxWidth: '900px', flex: 1 }}>
            <Typography.Title level={2} style={{ background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'Brush Script MT, cursive' }}>✨ Create Your Own Event ✨</Typography.Title>
            <div className="create-event-content">
              <div className="create-event-text">
                <Typography.Paragraph style={{ fontSize: '1.5rem', fontFamily: 'Comic Sans MS, cursive' }}>Ready to Create your own event?</Typography.Paragraph>
                <Typography.Paragraph style={{ fontSize: '1.5rem', fontFamily: 'Comic Sans MS, cursive' }}>Let's TockenTix!</Typography.Paragraph>
                <Typography.Paragraph style={{ marginBottom: '25px', fontFamily: 'Comic Sans MS, cursive' }}>The #1 trusted platform for event creation</Typography.Paragraph>
                {!isAuthenticated ? (
                  <Button type="primary" onClick={login} style={{ background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)', border: 'none', animation: 'pulse 2s infinite' }}>✨ Create Event ✨</Button>
                ) : (
                  <Button type="primary" style={{ background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)', border: 'none', animation: 'pulse 2s infinite' }}><Link to="createEvent">✨ Create Event ✨</Link></Button>
                )}
              </div>
              <Image
                width={200}
                src={EventImage}
                alt="Create Event"
                className="create-event-image"
              />
            </div>
          </Card>

          <Card className="resell-section" style={{ boxShadow: '8px 0 16px -4px rgba(0, 0, 0, 0.2), -8px 0 16px -4px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.2)', transform: 'translateY(-5px)', transition: 'all 0.3s ease', maxWidth: '900px', flex: 1 }}>
            <Typography.Title level={2} style={{ background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'Brush Script MT, cursive' }}>🎫 Ticket Resale Marketplace 🎫</Typography.Title>
            <div className="resell-content">
              <div className="resell-text">
                <Typography.Paragraph style={{ fontSize: '1.5rem', fontFamily: 'Comic Sans MS, cursive' }}>Can't make it to an event?</Typography.Paragraph>
                <Typography.Paragraph style={{ fontSize: '1.5rem', fontFamily: 'Comic Sans MS, cursive' }}>Resell your tickets safely and easily on TockenTix!</Typography.Paragraph>
                <Typography.Paragraph style={{ marginBottom: '25px', fontFamily: 'Comic Sans MS, cursive' }}>The #1 trusted platform for secure ticket resales</Typography.Paragraph>
                {!isAuthenticated ? (
                  <Button type="primary" onClick={login} style={{ background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)', border: 'none', animation: 'pulse 2s infinite' }}>🎫 Start Reselling 🎫</Button>
                ) : (
                  <Button type="primary" style={{ background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)', border: 'none', animation: 'pulse 2s infinite' }}><Link to="resell-ticket">🎫 Start Reselling 🎫</Link></Button>
                )}
              </div>
              <Image
                width={200}
                src={ticketImage}
                alt="Resell Tickets"
                className="resell-image"
              />
            </div>
          </Card>       
        </div>

           
        <Footer style={{ padding: '20px 0' }}>
          <div className="footer-content" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
            <div className="footer-section">
              <Title level={4}>Events</Title>
              <List>
                <List.Item><a href="#events-grid">Upcoming Events</a></List.Item>
                <List.Item>Resell Tickets</List.Item>
                <List.Item>My Tickets</List.Item>
              </List>
            </div>
            <div className="footer-section">
              <Title level={4}>Company</Title>
              <List>
                <List.Item><Link to="/about">About Us</Link></List.Item>
                <List.Item>Careers</List.Item>
                <List.Item>Blog</List.Item>
              </List>
            </div>
            <div className="footer-section">
              <Title level={4}>Support</Title>
              <List>
                <List.Item>Help Center</List.Item>
                <List.Item><Link to="/contactUs">Contact Us</Link></List.Item>
                <List.Item>FAQs</List.Item>
              </List>
            </div>
          </div>
          <Divider style={{ margin: '16px 0' }} />
          <div className="footer-bottom">
            <Typography.Text>© 2024 TockenTix. All rights reserved.</Typography.Text>
          </div>
        </Footer>      </main>
    </div>
  );
}

export default App;