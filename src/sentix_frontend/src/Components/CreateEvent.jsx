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
    const [eventImage, setEventImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

   
    const uploadEventPhotos = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        
        input.onchange = async () => {
            setUploadProgress(0);
            try {
                const file = input.files[0];
                const batch = assetManager.batch();
                const {width, height} = await detailsFromFile(file);
    
                    // Create event-specific path
                    const fileName = `event-${Date.now()}-${file.name}`;
                    const key = await batch.store(file, {
                        path: '/events/images',
                        fileName
                    });

                    await batch.commit({
                        onProgress: ({current, total}) => setUploadProgress(current / total)
                    });

                    setEventImage({key, fileName, width, height});
                        
            } catch (error) {
                toast.error("Failed to upload event image");
                console.error(error);
            }
            setUploadProgress(null);
        };

        input.click();
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

    const newEvent = {
        title: formData.title,
        date: formData.date,
        // ... other event fields
        image: eventImage // This will now be available in your upcoming events
    };

    // Your existing event creation API call
    await createEvent(newEvent);
};
    
                  
    
               

    return (
        <div className="createEventPage">
            <Navbar></Navbar>
        <div className="create-event-container">
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
                <label htmlFor="EventImage">Upload Event Image</label>
                <button type="button" className='upload-button'onClick={uploadEventPhotos}>
                &uarr;  Add file
                </button>
                {eventImage && (
                    <img 
                        src={eventImage.key} 
                        alt="Event preview" 
                        className="preview-image"
                    />
                )}
                {uploadProgress !== null && (
                    <div className="upload-progress">
                        {Math.round(uploadProgress * 100)}%
                    </div>
                )}
            </div>

                <button type="submit" className='submit-event'>Create Event</button>
            </form>
            </div>
        </div>
    );
};

export default CreateEvent;
