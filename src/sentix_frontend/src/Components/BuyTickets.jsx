/*import React, { useState } from "react";
import { HttpAgent, Actor } from "@dfinity/agent";
import Navbar from "./Navbar";


// Define the canister ID for your ticket purchase
const ticketCanisterId = "YOUR_CANISTER_ID"; // Replace with your actual ticket canister ID

function TicketPurchasePage() {
  const [eventId, setEventId] = useState("");
  const [price, setPrice] = useState("");
  const [purchaseStatus, setPurchaseStatus] = useState("");

  // Handle the purchase of a ticket
 
  return (
    <div className="signUpPage">
       <Navbar></Navbar>
      <h1 className="signUpHeader">Buy Ticket</h1>
      <div buyTicketForm>
      <div className="buyTicket">
        <label>Event ID:</label>
        <input
          type="text"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
        />
      </div>
      <div className="buyTicket">
        <label>Price:</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <button onClick={handleBuyTicket} className="signUp">Buy Ticket</button>
      <p>{purchaseStatus}</p>
      </div>
    </div>
  );
}

export default TicketPurchasePage;*/
