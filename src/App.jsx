// src/App.jsx
import React, { useState } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen/StartScreen";
import FlashcardLayout from "./components/FlashcardLayout/FlashcardLayout";
import shuffle from "lodash.shuffle";


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
  
  // New state: cardOrder holds the shuffled flashcards order.
  const [cardOrder, setCardOrder] = useState(flashcards);
  // State to control whether to show the start screen.
  const [showStartScreen, setShowStartScreen] = useState(true);
  // State for the current card index.
  const [currentIndex, setCurrentIndex] = useState(0);
  // State for whether the current card is flipped.
  const [isFlipped, setIsFlipped] = useState(false);
  // State for the user's guess.
  const [userGuess, setUserGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  // New state for tracking the user's streaks.
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  // Updated handleStart: shuffle the flashcards and pick a random starting index.
  const handleStart = () => {
    const shuffled = shuffle(flashcards);
    setCardOrder(shuffled);
    setShowStartScreen(false);
  };

  // Handler to flip the card.
  const handleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  // Updated Next button: sequential navigation.
  const handleNextCard = () => {
    if (currentIndex < cardOrder.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setUserGuess("");     // reset guess
      setIsCorrect(null);   // reset feedback
    }
  };

  // Updated Back button: sequential navigation.
  const handlePrevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      setUserGuess("");     // reset guess
      setIsCorrect(null);   // reset feedback
    }
  };

  // New handler for shuffling from the flashcard layout.
  const handleShuffle = () => {
    const shuffled = shuffle(flashcards);
    setCardOrder(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // New handler to return to the start screen.
  const handleReturnToStart = () => {
    setShowStartScreen(true);
    setCurrentIndex(0);
    setIsFlipped(false);
    setUserGuess("");     // reset guess
    setIsCorrect(null);   // reset feedback
  };

  // Update handleSubmitGuess to incorporate streak tracking:
const handleSubmitGuess = () => {
  const correctAnswer = cardOrder[currentIndex].answer;
  const guess = userGuess.trim().toLowerCase();
  const answer = correctAnswer.trim().toLowerCase();

  // Fuzzy matching logic
  if (answer.includes(guess) || guess.includes(answer)) {
    setIsCorrect(true);
    // Update current streak
    setCurrentStreak(prevStreak => {
      const newStreak = prevStreak + 1;
      // If new streak exceeds max streak, update max streak
      if (newStreak > maxStreak) {
        setMaxStreak(newStreak);
      }
      return newStreak;
    });
  } else {
    setIsCorrect(false);
    // Reset current streak if answer is incorrect
    setCurrentStreak(0);
  }
};

  return (
    <div className="app">
      {showStartScreen ? (
        <StartScreen flashcardsCount={flashcards.length} onStart={handleStart} />
      ) : (
        <FlashcardLayout 
          flashcards={cardOrder}
          currentIndex={currentIndex}
          isFlipped={isFlipped}
          onFlip={handleFlip}
          userGuess={userGuess}
          setUserGuess={setUserGuess}
          isCorrect={isCorrect}
          onSubmitGuess={handleSubmitGuess}
          onNextCard={handleNextCard}
          onPrevCard={handlePrevCard}
          onShuffle={handleShuffle}
          onReturnToStart={handleReturnToStart}
          currentStreak={currentStreak}
          maxStreak={maxStreak}
        />
      )}
    </div>
  );
}

export default App;