import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import MpesaIcon from '/home/isaack/sentix/src/sentix_frontend/src/Images/mpesa icon.jpg';
import CreditCardIcon from '/home/isaack/sentix/src/sentix_frontend/src/Images/credit card icon.png';
import ICPIcon from '/home/isaack/sentix/src/sentix_frontend/src/Images/ICP icon.jpg';
import TransferICPComponent from './Pay' // Adjust the path as needed

function BuyTickets(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const event = state?.event;
  const [quantity, setQuantity] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('credit');
  const [showTransferComponent, setShowTransferComponent] = useState(false);
  

  // const totalPrice = quantity * parseFloat(event.price.replace(''));

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
        // totalPrice,
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
        // Updates the button text
        el.target.textContent = "Plug wallet has enough balance";
        setTimeout(() => {
          el.target.textContent = "Requesting transfer...";
        }, 3000);
  
        const requestTransferArg = {
          to: receiverAccountId,
          amount: coffeeAmount,
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
      el.target.textContent = "Buy me a coffee"
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

            {/* <div className="price-summary">
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
            </div> */}

            <button 
              className="purchase-button"
              onClick={handlePurchase}
            >
              Complete Purchase
            </button>

            <button onClick={connectToPlug} className="connect-plug-button">
              Connect to Plug Wallet
            </button>

            <button onClick={connectToNFID} className="connect-nfid-button">
              Connect to NFID Wallet
            </button>

            <button onClick={handleToggleTransfer}>
              {showTransferComponent ? "Hide Transfer ICP" : "Transfer ICP"}
            </button>

            {showTransferComponent && <TransferICPComponent />}
          </div>        
        </div>
      </div>
    </div>
  );
}

export default BuyTickets;