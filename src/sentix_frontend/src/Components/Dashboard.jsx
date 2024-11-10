<<<<<<< HEAD
import React from 'react';
import Image1 from '/home/venus/Byte_brigade/src/sentix_frontend/src/Images/Img1.jpg';
import Image2 from '/home/venus/Byte_brigade/src/sentix_frontend/src/Images/Img2.jpg';
import Image3 from '/home/venus/Byte_brigade/src/sentix_frontend/src/Images/Img3.jpg';
import Image4 from '/home/venus/Byte_brigade/src/sentix_frontend/src/Images/Img4.jpg'
=======
/*import React from 'react';
import Image1 from './Images/Img1.jpg';
import Image2 from './Images/Img2.jpg';
import Image3 from './Images/Img3.jpg';
import Image4 from './Images/Img4.jpg';
>>>>>>> origin/master


function Dashboard ()  {
    const events = [
        {
            title: "Concert in the Park",
            date: "November 15, 2024 at 7:00 PM",
            description: "Join us for a night of music under the stars!",
<<<<<<< HEAD
            image: Image1
=======
            image: {Image1}
>>>>>>> origin/master
        },
        {
            title: "Art Exhibition",
            date: "December 1, 2024 at 5:00 PM",
            description: "Explore the latest works from local artists.",
<<<<<<< HEAD
            image: Image2
=======
            image: {Image2}
>>>>>>> origin/master
        },
        {
            title: "Fashion Week",
            date: "November 24, 2024 at 10:00 AM",
            description: "Catch the latest trends in fashion.",
<<<<<<< HEAD
            image: Image3
=======
            image:{Image3}
>>>>>>> origin/master
        },
        {
            title: "November Music Festival",
            date: "November 30, 2024 at 10:00 PM",
            description: "Experience live performances by top artists.",
<<<<<<< HEAD
            image: Image4
=======
            image: {Image4}
>>>>>>> origin/master
        }
    ]
    return (
        <div className="container">
            
            <div className="events">
                {events.map((event, index) => (
                    <div className="card" key={index}>
                        <img src={event.image} alt={event.title} />
                        <div className="card-content">
                            <h2>{event.title}</h2>
                            <p>{event.date}</p>
                            <p className="card-description">{event.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
<<<<<<< HEAD
export default Dashboard;
=======
export default Dashboard;*/
>>>>>>> origin/master
