import React, { useState } from 'react';
import { sentix_backend } from 'declarations/sentix_backend';
import Navbar from './Navbar';
import ImagesUpload from './ImageUpload';
import { Actor } from '@dfinity/agent';

const handleCreateEventbtn = async (title, description, date, price, image) => {
    try {
      const response = await sentix_backend.create_event(title, description, date, parseInt(price), image);
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
    const [image, setImage] = useState([]);
    const [uploads, setUploads] = useState([]); 
    const [isLoadingImage, setIsLoadingImage] = useState(false); 
    const [progress, setProgress] = useState(null); 
    const [selectedImage, setSelectedImage] = useState(null);
    const [ actor, setActor ] = useState(null);

        const loadImages = async () => {
            try {
                const images = await sentix_backend.get_images();
                setUploads(images);
                console.log('Uploaded images:', images);
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
                const chunks = Array.from(imageData);
                const id = await sentix_backend.upload_image(chunks);
                setImage(chunks);
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
        if (!selectedImage) {
            alert("Please upload an image first");
            return;
        }
        await handleImageUpload();
        await handleCreateEventbtn(title, description, date, parseInt(price), image);
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

              
                <div className="form-group">
                <input 
                    type="file" 
                    onChange={(e) => setSelectedImage(e)} 
                    accept='image/*'
                    id="imageInput"

                />
                {/*<button 
                    type="button" 
                    onClick={() => document.getElementById('imageInput').click()}
                >
                    Select Image
                </button>*/}
                <p class="upload-text">Drag and drop your file here or click to upload</p>
                {selectedImage && (
                    <span>{selectedImage.target.files[0].name}</span>
                )}
                {isLoadingImage && <p>Uploading image...</p>}
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

                <button className='submit-event pulse-button' type="submit" disabled={isLoadingImage}>
                    <span className="button-text">Create Event</span>
                    
                </button>
            </form>
            </div>
            <style jsx>{`
                .createEventPage {
                    position: relative;
                    overflow: hidden;
                }
                .musical-notes {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                }
                .musical-notes div {
                    position: absolute;
                    font-size: 30px;
                    color: rgba(0, 0, 0, 0.2);
                    animation: float 6s infinite;
                }
                .note-1 { left: 10%; animation-delay: 0s; }
                .note-2 { left: 30%; animation-delay: 1s; }
                .note-3 { left: 50%; animation-delay: 2s; }
                .note-4 { left: 70%; animation-delay: 3s; }
                .note-5 { left: 90%; animation-delay: 4s; }
                @keyframes float {
                    0% { top: 100%; opacity: 1; }
                    100% { top: -10%; opacity: 0; }
                }
                .pulse-button {
                    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                    border: none;
                    border-radius: 30px;
                    padding: 15px 40px;
                    color: white;
                    font-size: 18px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    animation: pulse 2s infinite;
                }
                .pulse-button:hover {
                    transform: scale(1.05);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
                }
                .pulse-button:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
                .button-text {
                    margin-right: 8px;
                }
                .button-icon {
                    font-size: 20px;
                }
            `}</style>
        </div>
    );
};

export default CreateEvent;