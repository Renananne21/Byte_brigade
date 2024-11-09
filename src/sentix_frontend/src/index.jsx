import './styles.css';

import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' in React 18
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

// Create a root element using createRoot for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
