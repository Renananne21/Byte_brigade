import React, { useState, useEffect } from 'react';
import { sentix_backend } from "declarations/sentix_backend";

const ReadImages = ({ onBookEvent }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        // Assuming your backend has a function called get_all_images
        const allImages = await sentix_backend.get_all_images();
        setImages(allImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, []);

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  if (images.length === 0) return <div>Loading...</div>;

  return (
    <div>
      {images.map((image, index) => (
        <img 
          key={index}
          src={`data:image/jpeg;base64,${arrayBufferToBase64(image.chunks)}`}
          alt={`Event ${index + 1}`}
          onClick={() => onBookEvent(image.id)}
          style={{ cursor: 'pointer', margin: '10px' }}
        />
      ))}
    </div>
  );
};

export default ReadImages;