import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, } from "react-router-dom";
import App from './App';
import CreateEvent from './Components/CreateEvent';
import About from './Components/About';
import EventList from './Components/EventList';
import BuyTickets from './Components/BuyTickets';
import TicketPurchase from './Components/BuyTickets';
import ContactUs from './Components/Contact';
import ResellTicket from './Components/ResellTicket';
import Confirmation from './Components/confirmation';
import './index.scss';

const router = createBrowserRouter([
  {
    path: "/",
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
    path: "createEvent",
    element: <CreateEvent />,
  },
  {
    path: "eventList",
    element: <EventList />,
  }, 
  {
    path: "/buy-tickets/:eventId",
    element: <BuyTickets />,
  },
  {
    path: "resell-ticket",
    element: <ResellTicket />,
  },
  {
    path: "confirmation",
    element: <Confirmation />,
  },
  
  
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
