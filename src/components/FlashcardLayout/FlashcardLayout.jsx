// src/components/FlashcardLayout/FlashcardLayout.jsx
import React from "react";
import Flashcard from "../Flashcard/Flashcard";
import "./FlashcardLayout.css";

function FlashcardLayout({ 
  flashcards, 
  currentIndex, 
  isFlipped, 
  onFlip, 
  userGuess,
  setUserGuess,
  isCorrect,
  onSubmitGuess,
  onNextCard, 
  onPrevCard, 
  onShuffle, 
  onReturnToStart,
  currentStreak,
  maxStreak
}) {
  return (
    <div className="flashcard-layout">
      <Flashcard 
        card={flashcards[currentIndex]} 
        isFlipped={isFlipped} 
        onFlip={onFlip} 
      />
      {/* Display streak counters */}
      <div className="streak-display">
        <p>Current Streak: {currentStreak}</p>
        <p>Longest Streak: {maxStreak}</p>
      </div>
      {/* Input for user's guess and submit button */}
      <div className="guess-section">
        <input
          type="text"
          className="guess-input"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          placeholder="Enter your guess"
        />
        <button className="submit-button" onClick={onSubmitGuess}>
          Submit
        </button>
        {isCorrect !== null && (
          <p className={`feedback ${isCorrect ? "correct" : "incorrect"}`}>
            {isCorrect ? "Correct!" : "Incorrect, try again!"}
          </p>
        )}
      </div>
      <div className="navigation-buttons">
        <button className="nav-button" onClick={onPrevCard} disabled={currentIndex === 0}>
          Back
        </button>
        <button className="nav-button" onClick={onNextCard} disabled={currentIndex === flashcards.length - 1}>
          Next
        </button>
        <button className="nav-button" onClick={onShuffle}>
          Shuffle
        </button>
        <button className="nav-button" onClick={onReturnToStart}>
          Return to Start
        </button>
      </div>
    </div>
  );
}

export default FlashcardLayout;