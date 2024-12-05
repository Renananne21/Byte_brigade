import React, { useState } from 'react';
import { sentix_backend } from 'declarations/sentix_backend';
import Navbar from './Navbar';
import ImagesUpload from './ImageUpload';
import { Actor } from '@dfinity/agent';

const handleCreateEventbtn = async (title, description, date, price) => {
    try {
      const response = await sentix_backend.create_event(title, description, date, parseInt(price));
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
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [uploads, setUploads] = useState([]); 
    const [isLoadingImage, setIsLoadingImage] = useState(false); 
    const [progress, setProgress] = useState(null); 
    const [selectedImage, setSelectedImage] = useState(null);
    const [ actor, setActor ] = useState(null);

        const loadImages = async () => {
            try {
                const images = await sentix_backend.get_images();
                setUploads(images);
                alert('Image loaded successfully!');
            } catch (error) {
                alert('Error loading images. Please try again.');
                console.error('Error loading images:', error);
            }
        };

        const handleImageUpload = async () => {
            if (!selectedImage) return;
    
            setIsLoadingImage(true);
            const file = selectedImage.target.files[0];
            const reader = new FileReader();
        
            reader.onload = async () => {
              try {
                const imageData = new Uint8Array(reader.result);
                const chunks = [...imageData];
                const id = await sentix_backend.upload_image(chunks);
                loadImages();
                setSelectedImage(null);
              } catch (error) {
                console.error('Error uploading image:', error);
              } finally {
                setIsLoadingImage(false);
              }
            };
        
            reader.readAsArrayBuffer(file);
          };

    const handleSubmit = async (e) => {
        e.preventDefault();

    const newEvent = {
        title: title,
        date: date,
        description: description,
        price: parseInt(price),
    
    };

    
    await handleCreateEventbtn(title, description, date, parseInt(price));
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
                        onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                        required
                    />
                </div>

              
                <div className="image-upload-section">
                <input 
                    type="file" 
                    onChange={(e) => setSelectedImage(e)} 
                    accept='image/*'
                    style={{ display: 'none' }}
                    id="imageInput"
                />
                <button 
                    type="button" 
                    onClick={() => document.getElementById('imageInput').click()}
                >
                    Select Image
                </button>
                <button 
                    type="button" 
                    onClick={handleImageUpload}
                    disabled={!selectedImage}
                >
                    Upload Image
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

                <button type="submit" >Create Event</button>
            </form>
            </div>
        </div>
    );
};

export default CreateEvent;