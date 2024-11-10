import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, } from "react-router-dom";
import App from './App';
import CreateEvent from './Components/CreateEvent';
import About from './Components/About';
import EventList from './Components/EventList';
import TicketPurchase from './Components/BuyTickets';
import Dashboard from './Components/Dashboard';
import ContactUs from './Components/Contact';
import TicketPage from './Components/ticketPage';
import ResellTicketPage from './Components/resellPage';
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
    path: "buyTicket",
    element: <TicketPurchase />,
  },

]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
