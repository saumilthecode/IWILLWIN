// src/components/EmotionTraining/EmotionTraining.jsx
import React, { useState, useEffect } from 'react';
import './EmotionTraining.css';

const EmotionTraining = () => {
    const [currentEmotion, setCurrentEmotion] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [stats, setStats] = useState({
        correct: 0,
        total: 0
    });

    const callGeminiAPI = async (prompt) => {
        const API_KEY = 'YOUR_GEMINI_API_KEY';
        const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            return null;
        }
    };

    const loadNewVideo = async () => {
        const prompt = `Describe an emotional expression for difficulty level: ${difficulty}`;
        const response = await callGeminiAPI(prompt);
        
        if (response) {
            updateUI(response);
        }
    };

    const updateUI = (data) => {
        // Update video source and emotion options based on API response
    };

    const checkAnswer = (selectedEmotion) => {
        setStats(prevStats => ({
            ...prevStats,
            total: prevStats.total + 1,
            correct: selectedEmotion === currentEmotion ? prevStats.correct + 1 : prevStats.correct
        }));
    };

    const setDifficultyLevel = (level) => {
        setDifficulty(level);
        loadNewVideo();
    };

    useEffect(() => {
        loadNewVideo();
    }, []);

    return (
        <div className="container">
            <div className="header">
                <h1>Emotion Recognition Training</h1>
                <p>Practice identifying emotions and social cues</p>
            </div>

            <div className="difficulty-selector">
                <button onClick={() => setDifficultyLevel('easy')} className="emotion-btn">Easy</button>
                <button onClick={() => setDifficultyLevel('medium')} className="emotion-btn">Medium</button>
                <button onClick={() => setDifficultyLevel('hard')} className="emotion-btn">Hard</button>
            </div>

            <div className="video-container">
                <video id="emotionVideo" width="100%" height="auto" controls>
                    <source src="" type="video/mp4" />
                </video>
            </div>

            {/* Rest of your JSX */}
        </div>
    );
};

export default EmotionTraining;
