import React, { useState } from 'react';
import axios from 'axios';
import './register.css';

const Registration = ({ onRegister, onLogin }) => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [isLoginMode, setIsLoginMode] = useState(false); // Toggle between Login and Register

    const handleSubmit = async () => {
        if (!username) {
            setError('Please enter a username.');
            return;
        }
    
        try {
            let response;
            if (isLoginMode) {
                // Use query parameters for GET request
                response = await axios.get('http://localhost:5000/api/user/login', {
                    params: { username }, // Pass username as a query parameter
                });
            } else {
                // Use POST request for registration
                response = await axios.post('http://localhost:5000/api/user/register', {
                    username,
                    score: 0, // Default score for registration
                });
            }
    
            if (response.data.message) {
                if (isLoginMode) {
                    onLogin(username); // Notify parent component of successful login
                } else {
                    onRegister(username); // Notify parent component of successful registration
                }
            } else {
                setError(response.data.message); // Handle other potential errors
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    setError('Username is already registered. Please try a different name.');
                } else if (error.response.status === 404) {
                    setError('Username not found. Please register first.');
                } else {
                    setError('An error occurred. Please try again.');
                }
            } else {
                setError('An error occurred. Please try again.');
            }
            console.error('Error:', error);
        }
    };
    

    return (
        <div className="gradient-custom">
        <div className="card">
          <h2>{isLoginMode ? 'Login' : 'Register'} to Start</h2>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError(''); // Clear error message when user types
            }}
          />
          <button onClick={handleSubmit}>{isLoginMode ? 'Login' : 'Register'}</button>
      
          {/* Toggle between Login and Register */}
          <p>
            {isLoginMode ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setError(''); // Clear error message when switching modes
              }}
              style={{ background: 'none', border: 'none', color: '#0d6efd', cursor: 'pointer' }}
            >
              {isLoginMode ? 'Register' : 'Login'}
            </button>
          </p>
      
          {/* Display error message if any */}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    );
};

export default Registration;