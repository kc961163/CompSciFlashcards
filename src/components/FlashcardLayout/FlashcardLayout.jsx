// src/components/FlashcardLayout/FlashcardLayout.jsx
import React from "react";
import Flashcard from "../Flashcard/Flashcard";
import "./FlashcardLayout.css";

function FlashcardLayout({ flashcards, currentIndex, isFlipped, onFlip, onNextCard }) {
  return (
    <div className="flashcard-layout">
      <Flashcard 
        card={flashcards[currentIndex]} 
        isFlipped={isFlipped} 
        onFlip={onFlip} 
      />
      <button className="next-button" onClick={onNextCard}>
        →
      </button>
    </div>
  );
}

export default FlashcardLayout;