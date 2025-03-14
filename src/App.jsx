// src/App.jsx
import React, { useState } from "react";
import "./App.css";
import StartScreen from "./components/StartScreen/StartScreen";
import FlashcardLayout from "./components/FlashcardLayout/FlashcardLayout";
import shuffle from "lodash.shuffle";
import EndScreen from "./components/EndScreen/EndScreen";


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
  
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [cardOrder, setCardOrder] = useState(flashcards); // Active deck; will be shuffled on start
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userGuess, setUserGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  // New state for streak counters:
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  // New state for mastered cards:
  const [masteredCards, setMasteredCards] = useState([]);

  // New state for ending the quiz:
  const [showEndScreen, setShowEndScreen] = useState(false);

  // When the user clicks the Start button:
  const handleStart = () => {
    const shuffled = shuffle(flashcards);
    setCardOrder(shuffled);
    setCurrentIndex(0); // Start at index 0 of the shuffled array
    setShowStartScreen(false);
  };

  // Toggle the flip state of the current card:
  const handleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  // Navigate to the next card (sequentially):
  const handleNextCard = () => {
    if (currentIndex < cardOrder.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetCardState();
    }
  };

  // Navigate to the previous card (sequentially):
  const handlePrevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      resetCardState();
    }
  };

  // Shuffle the active deck:
  const handleShuffle = () => {
    const shuffled = shuffle(flashcards);
    setCardOrder(shuffled);
    setCurrentIndex(0);
    resetCardState();
  };

  // Handler to reset flip state, guess input, and feedback:
  const resetCardState = () => {
    setIsFlipped(false);
    setUserGuess("");
    setIsCorrect(null);
  };

  // Handle guess submission with fuzzy matching and streak updates:
  const handleSubmitGuess = () => {
    const correctAnswer = cardOrder[currentIndex].answer;
    const guess = userGuess.trim().toLowerCase();
    const answer = correctAnswer.trim().toLowerCase();

    if (answer.includes(guess) || guess.includes(answer)) {
      setIsCorrect(true);
      // Update streak: increase current streak and update max streak if needed
      setCurrentStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > maxStreak) {
          setMaxStreak(newStreak);
        }
        return newStreak;
      });
    } else {
      setIsCorrect(false);
      setCurrentStreak(0);
    }
  };

  // Handle marking a card as mastered:
  const handleMarkMastered = () => {
    const currentCard = cardOrder[currentIndex];
    // Use card.question as a simple unique identifier
    if (!masteredCards.includes(currentCard.question)) {
      setMasteredCards(prev => [...prev, currentCard.question]);
    }
    // Remove mastered card from the active deck
    const updatedDeck = cardOrder.filter(card => card.question !== currentCard.question);
    setCardOrder(updatedDeck);
    // If no cards remain, show the End Screen
    if (updatedDeck.length === 0) {
      setShowEndScreen(true);
    } else {
      setCurrentIndex(0); // reset to the first card of the updated deck
    }
    resetCardState();
  };

  // Handler to return to the start screen (e.g., after ending the quiz)
  const handleReturnToStart = () => {
    // Reset all states to their initial values
    setShowStartScreen(true);
    setCardOrder(flashcards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setUserGuess("");
    setIsCorrect(null);
    setCurrentStreak(0);
    setMaxStreak(0);
    setMasteredCards([]);
    setShowEndScreen(false);
  };

  // Main render logic:
  return (
    <div className="app">
      {showEndScreen ? (
        // Render EndScreen component when quiz is finished (not shown here, assumed to be implemented)
        <EndScreen 
          currentStreak={currentStreak}
          maxStreak={maxStreak}
          masteredCount={masteredCards.length}
          onRestart={handleReturnToStart}
        />
      ) : showStartScreen ? (
        <StartScreen 
          flashcardsCount={flashcards.length} 
          onStart={handleStart}
          currentStreak={currentStreak}
          maxStreak={maxStreak}
        />
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
          onMarkMastered={handleMarkMastered}
          currentStreak={currentStreak}
          maxStreak={maxStreak}
        />
      )}
    </div>
  );
}

export default App;