import React, { useState } from 'react';
import { sentix_backend } from 'declarations/sentix_backend';
import Navbar from './Navbar';



function CreateEvent() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        price: '',
        eventId: ''
    });
    const [error, setError] = useState(null);
    const [eventImage, setEventImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(null);
    const [createdEvent, setCreatedEvent] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            // Convert image to uint8array for IC
            const arrayBuffer = await file.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);

            setEventImage({
                file,
                preview: URL.createObjectURL(file)
            });
        } catch (err) {
            setError('Failed to process image');
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (!eventImage) {
                throw new Error('Please upload an event image');
            }

            const priceInTokens = BigInt(Math.floor(Number(formData.price)));

            const event = {
                title: formData.title,
                date: formData.date,
                description: formData.description,
                price: priceInTokens,
            };

            const result = await sentix_backend.create_event(
                event.title,
                event.description,
                event.date,
                event.price
            );
            setSuccess(true);
            setCreatedEvent(result);


        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create event');
        } finally {
            setLoading(false);
        }
    };

    const uploadEventPhotos = async (e) => {
        setUploadProgress(0);
        try {
            const file = e.target.files[0];
            if (!file) {
                throw new Error('No file selected');
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                throw new Error('Please select an image file');
            }

            // Convert to array buffer for IC
            const arrayBuffer = await file.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);

            // Create preview
            const preview = URL.createObjectURL(file);

            setEventImage({
                file: uint8Array,
                preview,
                fileName: file.name
            });

            setUploadProgress(100);
        } catch (error) {
            console.error('Upload error:', error);
            setError(error.message);
        } finally {
            setUploadProgress(null);
        }
    };





    return (
        <div className="createEventPage">
            <Navbar />
            <div className="create-event-container">
                <h1>Create Event</h1>

                {error && (
                    <div className="error-message" role="alert">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="success-message" role="alert">
                        Event created successfully!
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="event ID">Event ID</label>
                        <input type="text" name="eventId" value={formData.eventId}
                            onChange={handleInputChange}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Title"> Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Description">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Date">Date</label>
                        <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Price">Price</label>
                        <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
                    </div>


                    <div className="form-group">
                        <label htmlFor="EventImage">Upload Event Image</label>
                        <input type="file" id="image-upload" accept='image/**' className="upload-input" onChange={uploadEventPhotos}></input>
                        <p class="upload-text">Drag and drop your file here or click to upload</p>

                        {uploadProgress !== null && (
                            <div className="progress-bar">
                                Upload Progress: {uploadProgress}%
                            </div>
                        )}

                        {eventImage?.preview && (
                            <div className="image-preview">
                                <img
                                    src={eventImage.preview}
                                    alt="Event preview"
                                    className="preview-image"
                                />
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className='submit-event'
                        disabled={loading || !formData.title || !formData.description || !formData.date || !formData.price}>
                        {loading ? 'Creating...' : 'Create Event'}
                    </button>
                    {error && (
                        <div className="error-alert">
                            {error.toString()}
                        </div>
                    )}
                </form>


            </div>
        </div>
    );

}

export default CreateEvent;