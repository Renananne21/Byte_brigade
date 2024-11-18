import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, } from "react-router-dom";
import App from './App';
import CreateEvent from './Components/CreateEvent';
import About from './Components/About';
import EventList from './Components/EventList';
import BuyTickets from './Components/BuyTickets';
import Confirmation from './Components/confirmation';
import ContactUs from './Components/Contact';
import './index.scss';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "contactUs",
    element: <ContactUs />,
  },
  {
    path: "createEvent",
    element: <CreateEvent />,
  },
  {
    path: "confirmation",
    element: <Confirmation />,
  },

]);

// Add viewport meta tag to make the UI responsive
const meta = document.createElement('meta');
meta.name = 'viewport';
meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
document.head.appendChild(meta);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,

);
