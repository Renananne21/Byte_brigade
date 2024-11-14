import React, { useState } from 'react';
import { sentix_backend } from 'declarations/sentix_backend';
import Navbar from './Navbar';

const handleCreateEventbtn = async (title, description, date, price, image) => {
    try {
      const response = await sentix_backend.create_event(eventId,title, description, date, price, image);
      alert("Event created successfully!");
    } catch (error) {
      alert("Failed to create event.");
      console.error("Create Event Error:", error);
    }
  };

function CreateEvent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreateEventbtn(title, description, date, price, image);
    };

    return (
        <div className="createEventPage">
        <div className="create-event-container">
            <Navbar></Navbar>
            <h1>Create Event</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Event Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="date">Event Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input
                        type="text"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" >Create Event</button>
            </form>
            </div>
        </div>
    );
};

export default CreateEvent;