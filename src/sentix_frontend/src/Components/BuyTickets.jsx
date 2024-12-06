import React, { useState } from "react";
import { sentix_backend } from 'declarations/sentix_backend';
import Navbar from "./Navbar";



function TicketPurchase(){
  const [ticket, setTicket] = useState("");

  function handleSubmit(event){
    event.preventDefault();

    const eventID = Number(event.target.elements.eventID.value);
    const price = Number(event.target.elements.price.value);

    sentix_backend.buy_ticket(eventID, price)
    .then((ticket) => {
      setTicket(ticket);
      console.log('Ticket bought successfully!');
    })
    .catch((error) => {
      console.error('Failed to buy ticket, please try again later:', error);
    });

  return false; 

  }
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Navbar from './Navbar';
import MpesaIcon from '/home/isaack/sentix/src/sentix_frontend/src/Images/mpesa icon.jpg';
import CreditCardIcon from '/home/isaack/sentix/src/sentix_frontend/src/Images/credit card icon.png';
import ICPIcon from '/home/isaack/sentix/src/sentix_frontend/src/Images/ICP icon.jpg';
import TransferICPComponent from './Pay' // Adjust the path as needed

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
    <div>
      <Navbar />

      <form onSubmit={handleSubmit}>
        <div>
          <label>Event ID</label>
          <input type="text" name="eventID" required />
        </div>
        
        <div>
          <label>Price</label>
          <input type="number" name="price" required />
        </div>

        <button type="submit">Purchase ticket</button>
      </form>

      {/* Display the created event data */}
      {ticket && (
        <div>
          <h3>Ticket purchased Successfully!</h3>
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
      )}
    </div>
  );
}

export default TicketPurchase;