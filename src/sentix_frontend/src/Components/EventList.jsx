import React, { useEffect, useState } from 'react';
import { sentix_backend } from 'declarations/sentix_backend';
import Navbar from './Navbar';

const EventList = () => {
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        try {
            const allEvents = await sentix_backend.get_all_events();
            setEvents(allEvents);
        } catch (error) {
            console.error("Failed to fetch events:", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div>
            <h1>All Events</h1>
            <div className="events-grid">
                {events.map((event) => (
                    <div key={event.id} className="event-card">
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <p>{event.date}</p>
                        <p>{event.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventList;
