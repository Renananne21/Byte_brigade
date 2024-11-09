// src/components/Hero.js
import React from 'react';
import Hero from './components/Hero';  // If Hero.jsx is in the components folder

function Hero() {
  return (
    <div className="bg-cover bg-center h-screen text-center p-10 flex items-center justify-center bg-gray-800">
      <div className="text-white">
        <h1 className="text-5xl font-bold mb-5">Welcome to Byte Brigade</h1>
        <p className="text-lg mb-5">Delivering digital solutions seamlessly.</p>
        <button className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">Learn More</button>
      </div>
    </div>
  );
}

export default Hero;
