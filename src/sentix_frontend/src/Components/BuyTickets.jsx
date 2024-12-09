import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import MpesaIcon from '/home/isaack/sentix/src/sentix_frontend/src/Images/mpesa icon.jpg';
import CreditCardIcon from '/home/isaack/sentix/src/sentix_frontend/src/Images/credit card icon.png';
import ICPIcon from '/home/isaack/sentix/src/sentix_frontend/src/Images/ICP icon.jpg';
import TransferICPComponent from './Pay' 


function BuyTickets() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const event = state?.event;
  const [quantity, setQuantity] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('credit');
  const [showTransferComponent, setShowTransferComponent] = useState(false);
  
  if (!event) {
    return (
      <div className="buyTicketsPage">
        <Navbar />
        <div className="buy-tickets-container">
          <h2 style={{ color: '#FF6B6B' }}>Event not found</h2>
          <button onClick={() => navigate('/')}>Return to Home</button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (selectedPayment === 'icp') {
      // Handle ICP-specific logic if needed
    }
  }, [selectedPayment]);

  const handlePurchase = async () => {
    navigate("/confirmation", { 
      state: { 
        event,
        quantity,
        paymentMethod: selectedPayment 
      }
    });
  }; 

  const handleToggleTransfer = () => {
    setShowTransferComponent(prev => !prev);
  };

  function main() {
    const button = document.querySelector('#connect-plug');
    button.addEventListener("click", connectToPlug);
  }

  async function connectToPlug(el) {
    el.target.disabled = true;
    const hasAllowed = await window.ic?.plug?.requestConnect();
    if (hasAllowed) {
      el.target.textContent = "Plug wallet is connected";
      const requestBalanceResponse = await window.ic?.plug?.requestBalance();
      const balance = requestBalanceResponse[0]?.value;
      if (balance > 0) {
        el.target.textContent = "Plug wallet has enough balance";
        setTimeout(() => {
          el.target.textContent = "Requesting transfer...";
        }, 3000);
  
        const requestTransferArg = {
          to: receiverAccountId,
        };
  
        if (transferStatus === 'COMPLETED') {
          el.target.textContent = `Plug wallet transferred ${coffeeAmount} e8s`;
        } else if (transferStatus === 'PENDING') {
          el.target.textContent = "Plug wallet is pending.";
        } else {
          el.target.textContent = "Plug wallet failed to transfer";
        }
      } else {
        el.target.textContent = "Plug wallet doesn't have enough balance";
      }
    } else {
      el.target.textContent = "Plug wallet connection was refused";
    }
  
    setTimeout(() => {
      el.target.disabled = false;
    }, 8000);
  }
  
  document.addEventListener("DOMContentLoaded", main);

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
            <h1 style={{ color: '#4A90E2' }}>{event.title}</h1>
          </div>        
          <div className="details-grid">
            <img src={event.image} alt={event.title} className="event-image" />
            <div className="details">
              <div className="detail-item">
                <h3 style={{ color: '#50C878' }}>Date</h3>
                <p style={{ color: '#5D6D7E' }}>{event.date}</p>
              </div>
              <div className="detail-item">
                <h3 style={{ color: '#FF69B4' }}>Location</h3>
                <p style={{ color: '#5D6D7E' }}>Kenya</p>
              </div>
              <div className="detail-item">
                <h3 style={{ color: '#9B59B6' }}>Base Price</h3>
                <p style={{ color: '#5D6D7E' }}>{event.price}</p>
              </div>
        
          <div className="event-description">
            <h3 style={{ color: '#F39C12' }}>Description</h3>
            <p style={{ color: '#5D6D7E' }}>{event.description}</p>
          </div>
          </div>
          </div>
          <div className="purchase-section">
            <div className="quantity-selector">
              <label style={{ color: '#E74C3C' }}>Number of Tickets:</label>
              <select 
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                style={{ color: '#5D6D7E' }}
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div className="payment-method">
              <h3 style={{ color: '#2ECC71' }}>Payment Method</h3>
              <div className="payment-options">
                <label style={{ color: '#5D6D7E' }}>
                  <input
                    type="radio"
                    value="credit"
                    checked={selectedPayment === 'credit'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                  />
                  <img src={CreditCardIcon} alt="" />
                  Credit Card
                </label>
                <label style={{ color: '#5D6D7E' }}>
                  <input
                    type="radio"
                    value="mpesa"
                    checked={selectedPayment === 'mpesa'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                  />
                  <img src={MpesaIcon} alt="" />
                  Mpesa
                </label>
                <label style={{ color: '#5D6D7E' }}>
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

            <button 
              className="purchase-button"
              onClick={selectedPayment === 'icpToken' ? connectToPlug : handlePurchase}
              style={{
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96C93D, #FED766)',
                backgroundSize: '400% 400%',
                animation: 'gradient 3s ease infinite, pulse 1.5s ease infinite',
                padding: '15px 30px',
                border: 'none',
                borderRadius: '25px',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2), 0 0 20px #4A90E2, 0 0 40px #4A90E2',
                transition: 'transform 0.2s, box-shadow 0.3s',
              }}
            >
              Complete Purchase
            </button>
            <style>
              {`
                @keyframes gradient {
                  0% { background-position: 0% 50% }
                  50% { background-position: 100% 50% }
                  100% { background-position: 0% 50% }
                }
                @keyframes pulse {
                  0% { transform: scale(1); box-shadow: 0 4px 15px rgba(0,0,0,0.2), 0 0 20px #4A90E2, 0 0 40px #4A90E2; }
                  50% { transform: scale(1.05); box-shadow: 0 4px 15px rgba(0,0,0,0.2), 0 0 30px #4A90E2, 0 0 60px #4A90E2; }
                  100% { transform: scale(1); box-shadow: 0 4px 15px rgba(0,0,0,0.2), 0 0 20px #4A90E2, 0 0 40px #4A90E2; }
                }
                .purchase-button:hover {
                  transform: scale(1.05);
                  box-shadow: 0 4px 15px rgba(0,0,0,0.2), 0 0 30px #4A90E2, 0 0 60px #4A90E2;
                }
              `}
            </style>

            {showTransferComponent && <TransferICPComponent />}
          </div>        
        </div>
      </div>
    </div>
  );
}

export default BuyTickets;