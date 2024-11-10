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
        </div>
      )}
    </div>
  );
}

export default TicketPurchase;