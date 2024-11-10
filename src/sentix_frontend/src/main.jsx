import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, } from "react-router-dom";
import App from './App';
import CreateEvent from './Components/CreateEvent';
import About from './Components/About';
import EventList from './Components/EventList';
<<<<<<< HEAD
import Dashboard from './Components/Dashboard';
import ContactUs from './Components/Contact';
import TicketPage from './Components/ticketPage';
import ResellTicketPage from './Components/resellPage';
=======
import BuyTickets from './Components/BuyTickets';
import Confirmation from './Components/confirmation';
import ContactUs from './Components/Contact';
>>>>>>> origin/master
import './index.scss';

const router = createBrowserRouter([
  {
<<<<<<< HEAD
    path: "Dasboard",
=======
    path: "/",
>>>>>>> origin/master
    element: <App />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "contactUs",
    element: <ContactUs />,
  },
  {
<<<<<<< HEAD
    path: "/",
    element: <Dashboard />,
  },
  {
=======
>>>>>>> origin/master
    path: "createEvent",
    element: <CreateEvent />,
  },
  {
    path: "eventList",
    element: <EventList />,
<<<<<<< HEAD
  },
]);

=======
  }, 
  {
    path: "/buy-tickets/:eventId",
    element: <BuyTickets />,
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

>>>>>>> origin/master

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
<<<<<<< HEAD
);
=======

);
>>>>>>> origin/master
