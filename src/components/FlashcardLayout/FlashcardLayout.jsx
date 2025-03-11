// src/components/FlashcardLayout/FlashcardLayout.jsx
import React from "react";
import Flashcard from "../Flashcard/Flashcard";
import "./FlashcardLayout.css";

function FlashcardLayout({ flashcards, currentIndex, isFlipped, onFlip, onNextCard, onPrevCard, onShuffle }) {
  return (
    <div className="flashcard-layout">
      <Flashcard 
        card={flashcards[currentIndex]} 
        isFlipped={isFlipped} 
        onFlip={onFlip} 
      />
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
      </div>
    </div>
  );
}

export default FlashcardLayout;