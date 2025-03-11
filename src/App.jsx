// src/App.jsx
import React, { useState } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen/StartScreen";
import FlashcardLayout from "./components/FlashcardLayout/FlashcardLayout";


const App = () => {

  const flashcards = [
    {
      question: "What does CPU stand for?",
      answer: "Central Processing Unit"
    },
    {
      question: "What is RAM?",
      answer: "Random Access Memory"
    },
    {
      question: "What does HTTP stand for?",
      answer: "HyperText Transfer Protocol"
    },
    {
      question: "What is the main language for web development?",
      answer: "JavaScript"
    },
    {
      question: "What does CSS stand for?",
      answer: "Cascading Style Sheets"
    },
    // Add more flashcards as needed...
  ];
  
  // State
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Start button handler
  const handleStart = () => {
    setShowStartScreen(false);
  };

  // Flip the card
  const handleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  // Next card (random)
  const handleNextCard = () => {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    setCurrentIndex(randomIndex);
    setIsFlipped(false);
  };

  return (
    <div className="app">
      {showStartScreen ? (
        <StartScreen 
          flashcardsCount={flashcards.length}
          onStart={handleStart}
        />
      ) : (
        <FlashcardLayout 
          flashcards={flashcards}
          currentIndex={currentIndex}
          isFlipped={isFlipped}
          onFlip={handleFlip}
          onNextCard={handleNextCard}
        />
      )}
    </div>
  );
}

export default App;