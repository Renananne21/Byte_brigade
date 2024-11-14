import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar, { filter } from './Navbar';

function BuyTickets(props)  {
  const navigate = useNavigate();
  const { state } = useLocation();
  const event = state?.event;
  const [quantity, setQuantity] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('credit');
  
  const totalPrice = quantity * parseFloat(event.price.replace('$', ''));


  useEffect(() => {
    if (selectedPayment === 'icp') {
      window.location.href = 'https://ramp.alchemypay.org/#/receivingMode';
    }
  }, [selectedPayment]);

 

  const handlePurchase = async () => {
   
      
      
      
      
      navigate("/confirmation", { 
        state: { 
          event,
        quantity,
        totalPrice,
        paymentMethod: selectedPayment 
        }
      });
    }; 

  return (
    <div className="buyTicketsPage">
    <Navbar />
    <div className="buy-tickets-container">
      <div className="ticket-details">
        <div className="event-header">
        <h1>{event.title}</h1>
        
        </div>        
                   
        

        <div className="details-grid">
        <img src={event.image} alt={event.title} className="event-image" />
        <div className="details">
          <div className="detail-item">
           
            <h3>Date & Time</h3>
            <p>{event.date} at {event.time}</p>
          </div>
          <div className="detail-item">
            <h3>Location</h3>
            <p>{event.location}</p>
          </div>
          <div className="detail-item">
            <h3>Base Price</h3>
            <p>{event.price}</p>
          </div>
          <div className="detail-item">
            <h3>Availability</h3>
            <p>{event.capacity - event.ticketsSold} tickets remaining</p>
          </div>
        </div>
        </div>
        <div className="event-description">
          <h3>Event Description</h3>
          <p>{event.description}</p>
        </div>
       
        <div className="purchase-section">
          <div className="quantity-selector">
            <label>Number of Tickets:</label>
            <select 
              value={quantity} 
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            >
              {[1,2,3,4,5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div className="payment-method">
            <h3>Payment Method</h3>
            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  value="credit"
                  checked={selectedPayment === 'credit'}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                />
                Credit Card
              </label>
              <label>
                <input
                  type="radio"
                  value="mpesa"
                  checked={selectedPayment === 'mpesa'}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                />
                Mpesa
              </label>
              <label>
                <input
                  type="radio"
                  value="icpToken"
                  checked={selectedPayment === 'icpToken'}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                />
                ICP token
              </label>
            </div>
          </div>

          <div className="price-summary">
            <div className="price-row">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span>Service Fee</span>
              <span>${(totalPrice * 0.10).toFixed(2)}</span>
            </div>
            <div className="price-row total">
              <span>Total</span>
              <span>${(totalPrice * 1.10).toFixed(2)}</span>
            </div>
          </div>

          <button 
            className="purchase-button"
            onClick={handlePurchase}
          >
            Complete Purchase
          </button>
        </div>        
        </div>
      </div>
    </div>
  );
};
export default BuyTickets;
