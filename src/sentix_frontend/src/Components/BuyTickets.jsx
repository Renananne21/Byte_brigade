import React, { useState } from "react";
import { HttpAgent, Actor } from "@dfinity/agent";
import Navbar from "./Navbar";

// Define the canister ID for your ticket purchase
const ticketCanisterId = "YOUR_CANISTER_ID"; // Replace with your actual ticket canister ID

function TicketPurchasePage() {
  const [eventId, setEventId] = useState("");
  const [price, setPrice] = useState("");
  const [purchaseStatus, setPurchaseStatus] = useState("");

  // Handle the purchase of a ticket
  const handleBuyTicket = async () => {
    if (!eventId || !price) {
      setPurchaseStatus("Please provide event ID and price.");
      return;
    }

    try {
      // Initialize the agent to interact with the canister
      const agent = new HttpAgent({}); // No identity required here
      agent.fetchRootKey(); // Ensure the agent has the root key

      // Define the ticket canister and the buy_ticket method
      const ticketCanister = Actor.createActor(
        {
          buy_ticket: Actor.Func([nat64, nat64], { id: nat64, event_id: nat64, price: nat64, owner: Principal }),
        },
        {
          agent,
          canisterId: ticketCanisterId,
        }
      );

      // Call the buy_ticket function with eventId and price as parameters
      const ticket = await ticketCanister.buy_ticket(Number(eventId), Number(price));
      
      // Display success message with the purchased ticket ID
      setPurchaseStatus(`Ticket purchased successfully! Ticket ID: ${ticket.id}`);
    } catch (error) {
      console.error("Error purchasing ticket:", error);
      setPurchaseStatus("Failed to purchase the ticket. Please try again.");
    }
  };

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

export default TicketPurchasePage;
