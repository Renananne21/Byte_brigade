import React from "react";
import { useNavigate } from "react-router-dom";

const TicketPage = () => {
  const history = useNavigate();
  
  const tickets = [
    { id: "1", eventName: "Concert ABC", eventDate: "2024-11-15", originalPrice: 50 },
    // ... more tickets
  ];

  const handleResell = (ticketId) => {
    history.push(`/resell/${ticketId}`); // Navigate to the Resell Ticket Page
  };

  return (
    <div>
      <h1>Your Tickets</h1>
      {tickets.map((ticket) => (
        <div key={ticket.id}>
          <h3>{ticket.eventName}</h3>
          <p>Date: {ticket.eventDate}</p>
          <button onClick={() => handleResell(ticket.id)}>Resell</button>
        </div>
      ))}
    </div>
  );
};

export default TicketPage;
