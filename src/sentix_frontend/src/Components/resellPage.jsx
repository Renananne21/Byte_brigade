import React from "react";

const ResellTicketPage = ({ match }) => {
  const ticketId = match.params.ticketId;

  // You would fetch the ticket details based on ticketId here
  const ticketDetails = {
    id: ticketId, // Example: Using the ticketId from the URL
    eventName: "Concert ABC",
    eventDate: "2024-11-15",
    originalPrice: 50,
  };

  const handleResell = async (ticketId, price) => {
    // Implement the resell logic here, such as API calls to your backend
    console.log(`Ticket ${ticketId} is being resold for $${price}`);
  };

  return (
    <div>
      <h1>Resell Ticket</h1>
      <ResellTicket ticketDetails={ticketDetails} onResell={handleResell} />
    </div>
  );
};

export default ResellTicketPage;
