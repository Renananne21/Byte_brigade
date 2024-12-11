import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Confirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { event, quantity, totalPrice, paymentMethod } = state;
  
  const orderNumber = Math.floor(Math.random() * 1000000);
  const purchaseDate = new Date().toLocaleDateString();

  return (
    <div className="confirmation">
       <Navbar />
      <div className="confirmation-container">
       
        <div className="confirmation-header">
          <h1>Thank You for Your Purchase! ✓</h1>
        </div>

        <div className="order-details">
          <h2>Order Summary</h2>
          <div className="order-info">
            <p><strong>Order Number:</strong> #{orderNumber}</p>
            <p><strong>Purchase Date:</strong> {purchaseDate}</p>
          </div>
          <div>
          <div className="event-summary">
            <img src={event.image} alt={event.title} className="event-thumbnail" />
            <div className="event-info">
              <h3>{event.title}</h3>
              <p>{event.date} at {event.time}</p>
              <p>{event.location}</p>
              <p>Quantity: {quantity} tickets</p>
            </div>
            <div className="payment-summary">
            <h3>Payment Details</h3>
            <div className="payment-info">
             {/* <p><strong>Payment Method:</strong> {paymentMethod}</p>
              <p><strong>Service Fee:</strong> ${(totalPrice * 0.10).toFixed(2)}</p>
              <p className="total-amount"><strong>Total Paid:</strong> ${(totalPrice * 1.10).toFixed(2)}</p>*/}
            </div>
          </div>
          </div>

         

          <div className="next-steps">
            <h3>What's Next?</h3>
            <ul>
              <li>Your tickets have been sent to your email</li>
              <li>Show your QR code at the venue entrance</li>
              <li>Arrive at least 30 minutes before the event</li>
            </ul>
          </div>
          </div>
          <div className="action-buttons">
            <button 
              className="download-tickets"
              onClick={() => {/* Add download logic */}}
            >
              Download Tickets
            </button>
            <button 
              className="return-home"
              onClick={() => navigate('/')}
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
     </div>
    
  );
};

export default Confirmation;