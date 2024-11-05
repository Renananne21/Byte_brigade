import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, } from "react-router-dom";
import App from './App';
import SignUp from './Components/SignUp';
import CreateEvent from './Components/CreateEvent';
import About from './Components/About';
import Dashboard from './Components/Dashboard';
import ContactUs from './Components/Contact';
import './index.scss';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "signUP",
    element: <SignUp />,
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


]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
