import React, { useState } from 'react';
import { sentix_backend } from 'declarations/sentix_backend';
import Navbar from './Navbar'; 

function CreateEvent() {
  const [concert, setConcert] = useState(''); 

  function handleSubmit(event) {
    event.preventDefault();

    const eventId = Number(event.target.elements.eventId.value);
    const title = event.target.elements.title.value;
    const description = event.target.elements.description.value;
    const date = event.target.elements.date.value;
    const price = Number(event.target.elements.price.value);

    sentix_backend.create_event(eventId, title, description, date, price)
      .then((concert) => {
        setConcert(concert);
        console.log('Event created successfully!');
      })
      .catch((error) => {
        console.error('Failed to create event:', error);
      });

    return false; 
  }

  return (
    <div className="create-event-container">
            <Navbar></Navbar>
            <h1>Create Event</h1>

            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="event ID">Event ID</label>
                <input type="text" name="eventId" required />
            </div>
              <div className="form-group">
                <label htmlFor="Title"> Title</label>
                <input type="text" name="title" required />
              </div>
              <div className="form-group">
                <label htmlFor="Description">Description</label>
                <textarea name="description" required />
              </div>
              <div className="form-group">
                <label htmlFor="Date">Date</label>
                <input type="date" name="date" required />
              </div>
              <div className="form-group">
                <label htmlFor="Price">Price</label>
                <input type="number" name="price" required />
              </div>

              <button type="submit">Create Event</button>
            </form>

      {/* Display the created event data */}
      {concert && (
        <div>
          <h3>Event Created Successfully!</h3>
        </div>
      )}
    </div>
  );
}

export default CreateEvent;