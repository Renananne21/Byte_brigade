import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ResellTicket = () => {
  const [formData, setFormData] = useState({
    price: '',
    description: '',
    eventName: '',
    date: '',
    location: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your resell logic here
    console.log('Ticket listed for resale:', formData);
    navigate('/marketplace');
  };

  return (
   <div className="resellPage">
    <Navbar />
    <div className="resell-container">
      <h2>Resell Your Ticket</h2>
      <form onSubmit={handleSubmit} className="resell-form">
        <div className="form-group">
          <label htmlFor="eventName">Event Name</label>
          <input
            type="text"
            id="eventName"
            value={formData.eventName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Event Date</label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Resale Price</label>
          <input
            type="number"
            id="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add details about your ticket (e.g., seat number, section, any restrictions)"
            rows="4"
          />
        </div>
        <button type="submit" className="resell-submit-btn">
          List Ticket for Resale
        </button>
      </form>
    </div>
    </div>
  );
};

export default ResellTicket;