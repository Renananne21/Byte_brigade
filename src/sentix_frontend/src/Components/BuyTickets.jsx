import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Navbar from './Navbar';
import MpesaIcon from '/home/renan/Byte_brigade/src/sentix_frontend/src/Images/mpesa icon.jpg';
import CreditCardIcon from '/home/renan/Byte_brigade/src/sentix_frontend/src/Images/credit card icon.png';
import ICPIcon from '/home/renan/Byte_brigade/src/sentix_frontend/src/Images/ICP icon.jpg';

function BuyTickets() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const event = state?.event;
  const [quantity, setQuantity] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('credit');
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

  const totalPrice = quantity * parseFloat(event.price.replace('$', ''));

  useEffect(() => {
    if (selectedPayment === 'icp') {
      const initializeICPConnection = async () => {
        const connected = await window?.ic?.plug?.isConnected();
        if (!connected) {
          try {
            await window?.ic?.plug?.requestConnect();
          } catch (error) {
            setError('Failed to connect to Internet Computer');
          }
        }
      };
      
      initializeICPConnection();
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

  const handleToggleTransfer = () => {
    setShowTransferComponent(prev => !prev);
  };

 

  async function connectToPlug(el) {
     setIsLoading(true);
     try{
      const hasAllowed = await window.ic?.plug?.requestConnect();
      if (hasAllowed) {
        const balance = await window.ic?.plug?.requestBalance();
        if (balance[0]?.value >= totalPrice * 1.10) {
          // Proceed with transfer
          
        } else {
          setError('Insufficient balance');
        }
        const transferResult = await handleICPTransfer(totalPrice * 1.10);
          if (transferResult.success) {
            handlePurchase();
          }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
     }
    
          
  
    setTimeout(() => {
      el.target.disabled = false;
    }, 8000);
  }
  
  
  


  const connectToNFID = async () => {
    try {
      const authClient = await window.ic.nfid.authorize({
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000)
      });
      console.log('Connected to NFID wallet:', authClient);
    } catch (error) {
      console.error('Failed to connect to NFID wallet:', error);
    }
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
                {[1, 2, 3, 4, 5].map(num => (
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
                  <img src={CreditCardIcon} alt="" />
                  Credit Card
                </label>
                <label>
                  <input
                    type="radio"
                    value="mpesa"
                    checked={selectedPayment === 'mpesa'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                  />
                  <img src={MpesaIcon} alt="" />
                  Mpesa
                </label>
                <label>
                  <input
                    type="radio"
                    value="icpToken"
                    checked={selectedPayment === 'icpToken'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                  />
                  <img src={ICPIcon} alt="" />
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
          
          <button className="purchase-button" onClick={selectedPayment === 'icpToken'?  connectToPlug :handlePurchase}>Complete Purchase </button>
        </div>        
        </div>
      </div>
    </div>
  );
}

export default BuyTickets;
