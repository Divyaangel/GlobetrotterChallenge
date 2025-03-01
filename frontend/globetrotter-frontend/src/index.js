import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Create a root
const root = createRoot(document.getElementById('root'));

// Render your app
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);