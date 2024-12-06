import { useState, useEffect } from 'react';
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../declarations/sentix_backend/index"; // Update path

const EventImage = ({ imageName, eventId, onBookEvent }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      setError(null);

      try {
        const agent = new HttpAgent({
          host: process.env.REACT_APP_IC_HOST || "http://localhost:4943"
        });
        
        // For local development
        if (process.env.NODE_ENV !== "production") {
          await agent.fetchRootKey();
        }

        const actor = Actor.createActor(idlFactory, {
          agent,
          canisterId: process.env.REACT_APP_CANISTER_ID,
        });

        const imageData = await actor.getEventImage(eventId);
        if (imageData && imageData.length > 0) {
          const blob = new Blob([new Uint8Array(imageData)], { type: 'image/jpeg' });
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
        } else {
          setError('Image not found');
        }
      } catch (err) {
        setError(`Failed to load image: ${err.message}`);
        console.error("Error fetching image:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();

    // Cleanup
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageName, eventId]);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <img 
      src={imageUrl} 
      alt={`Event: ${imageName}`}
      onClick={() => onBookEvent(eventId)}
      className="event-image"
      onError={(e) => {
        e.target.src = '/placeholder-image.jpg'; // Add a placeholder image
        setError('Failed to load image');
      }}
    />
  );
};
export default EventImage;