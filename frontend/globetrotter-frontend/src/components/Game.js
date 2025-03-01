import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Confetti from 'react-confetti';
import ChallengeFriend from './ChallengeFriend';
import './Game.css';
import { useLocation } from 'react-router-dom';

const Game = ({ username }) => {
    const [destination, setDestination] = useState(null);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [options, setOptions] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [globalHighScore, setGlobalHighScore] = useState(0);
    const [userHighScore, setUserHighScore] = useState(0);
    const [challengedHighScore, setChallengedHighScore] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Check for invite link parameters
        const queryParams = new URLSearchParams(location.search);
        const challenger = queryParams.get('challenger');
        const score = queryParams.get('score');

        if (challenger && score) {
            // Update challenged high score
            axios.get(`https://globetrotterchallengebackend2.onrender.com/api/user/set-challenged-highscore`, {
                params: { challenger, score },
            })
            .then((response) => {
                setChallengedHighScore(response.data.challengedHighScore);
            })
            .catch((error) => {
                console.error('Error updating challenged high score:', error);
            });
        }

        // Fetch other data (e.g., global high score, user high score)
        fetchHighScores();
    }, [location, username]);

    const fetchRandomDestination = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://globetrotterchallengebackend2.onrender.com/api/destinations/random');
            setDestination(response.data);
            generateOptions(response.data);
            setShowDetails(false);
            setFeedback('');
            setIsAnswered(false);
        } catch (error) {
            console.error('Error fetching destination:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const generateOptions = (correctDestination) => {
        const options = [correctDestination.city, 'Paris', 'Tokyo', 'New York'];
        setOptions(options.sort(() => Math.random() - 0.5));
    };

    const updateScore = async (newScore) => {
        try {
            await axios.post(`https://globetrotterchallengebackend2.onrender.com/api/user/${username}/update-score`, {
                score: newScore,
            });
            console.log('Score updated successfully!');
        } catch (error) {
            console.error('Error updating score:', error);
        }
    };

    const fetchHighScores = async () => {
        try {
            const userHighScoreResponse = await axios.get(`https://globetrotterchallengebackend2.onrender.com/api/user/${username}/highscore`);
            const globalHighScoreResponse = await axios.get('https://globetrotterchallengebackend2.onrender.com/api/user/globalhighscore');
            setGlobalHighScore(globalHighScoreResponse.data.globalHighScore);
            setUserHighScore(userHighScoreResponse.data.highScore);
        } catch (error) {
            console.error('Error fetching high scores:', error);
        }
    };

    const handleAnswer = (answer) => {
        if (isAnswered || isLoading) return;

        setIsAnswered(true);

        if (answer === destination.city) {
            setFeedback('🎉 Correct!');
            const newScore = score + 1;
            setScore(newScore);
            setCorrectAnswers(correctAnswers + 1);
            setShowDetails(true);
            updateScore(newScore);
        } else {
            setFeedback(`😢 Incorrect! The correct answer is ${destination.city}.`);
            setIncorrectAnswers(incorrectAnswers + 1);
            setShowDetails(true);
        }
    };

    useEffect(() => {
        fetchRandomDestination();
        fetchHighScores();
    }, [username]);

    return (
        <div className="game-container">
            {/* Confetti */}
            {feedback === '🎉 Correct!' && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }}
                />
            )}

            {/* Header Section */}
            <div className="header">
                <h1 className="game-title">Globetrotter Challenge</h1>
                <div className="profile-section">
                    <p>Welcome, {username}! 😇</p>
                    <p>Global High Score: <span className="score-value">{globalHighScore}</span></p>
                    <p>Your High Score: <span className="score-value">{userHighScore}</span></p>
                    <p>Challenged High Score: <span className="score-value">{challengedHighScore}</span></p>
                    <p>Your Current Score: <span className="correct-answers">{correctAnswers}</span></p>
                    <p>Incorrect Answers: <span className="incorrect-answers">{incorrectAnswers}</span></p>
                </div>
            </div>

            {/* Game Content */}
            <div className="game-content">
                {destination && (
                    <div>
                        <h2>Clues:</h2>
                        <ul>
                            {destination.clues.map((clue, index) => (
                                <li key={index}>{clue}</li>
                            ))}
                        </ul>
                        <h3>Guess the Destination:</h3>
                        <div className="options">
                            {options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(option)}
                                    disabled={isAnswered || isLoading}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {feedback && <p className="feedback">{feedback}</p>}

                {showDetails && (
                    <div className="details">
                        <h3>Fun Facts:</h3>
                        <ul>
                            {destination.fun_fact.map((fact, index) => (
                                <li key={index}>{fact}</li>
                            ))}
                        </ul>
                        <h3>Trivia:</h3>
                        <ul>
                            {destination.trivia.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <button
                    className="next-button"
                    onClick={fetchRandomDestination}
                    disabled={!isAnswered || isLoading}
                >
                    {isLoading ? 'Loading...' : 'Next'}
                </button>
            </div>

            {/* Challenge Friend Section */}
            <ChallengeFriend username={username} score={score} />
        </div>
    );
};

export default Game;
