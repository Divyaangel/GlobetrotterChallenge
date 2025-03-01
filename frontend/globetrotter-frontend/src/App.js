import React, { useState } from 'react';
import Game from './components/Game';
import Registration from './components/userRegister';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to handle successful registration
    const handleRegister = (username) => {
        setUsername(username);
        setIsLoggedIn(true);
    };

    // Function to handle successful login
    const handleLogin = (username) => {
        setUsername(username);
        setIsLoggedIn(true);
    };

    return (
        <div>
            {!isLoggedIn ? (
                <Registration onRegister={handleRegister} onLogin={handleLogin} />
            ) : (
                <Game username={username} />
            )}
        </div>
    );
};

export default App;