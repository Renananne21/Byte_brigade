import React, { useState } from 'react';
import { sentix_backend } from 'declarations/sentix_backend';
import Navbar from './Navbar'; 

function CreateEvent() {
    const [selectedFileContent, setSelectedFileContent] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [eventImage, setEventImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(null);
    const [createdEvent, setCreatedEvent] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        price: '',
        eventId: ''
    });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEvent = {
            title: formData.title,
            date: formData.date,
            price: formData.price,
            description: formData.description,
            image: eventImage
        };
        try {
            const result = await sentix_backend.create_event(newEvent);
            setCreatedEvent(result);
        } catch (error) {
            console.error("Failed to create event:", error);
        }
    };
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
   
    
               

    return (
        <div className="createEventPage">
            <Navbar></Navbar>
        <div className="create-event-container">
            <h1>Create Event</h1>

            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="event ID">Event ID</label>
                <input type="text" name="eventId" value={formData.eventId}
                            onChange={handleInputChange}
                            required  />
            </div>
              <div className="form-group">
                <label htmlFor="Title"> Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange}required />
              </div>
              <div className="form-group">
                <label htmlFor="Description">Description</label>
                <textarea name="description" value={formData.description} required />
              </div>
              <div className="form-group">
                <label htmlFor="Date">Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="Price">Price</label>
                <input type="number" name="price" value={formData.price} onChange={handleInputChange}required />
              </div>

                             
                <div className="form-group">
                <label htmlFor="EventImage">Upload Event Image</label>
                <button type="button" className='upload-button'onClick={uploadEventPhotos}>
                📤 Add file
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
            {createdEvent && (
        <div>
          <h3>Event Created Successfully!</h3>
        </div>
      )}
  
            </div>
        </div>
    );


      
      
  
}

export default CreateEvent;