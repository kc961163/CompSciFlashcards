// src/components/Flashcard/Flashcard.jsx
import React from "react";
import "./Flashcard.css";

function Flashcard({ card, isFlipped, onFlip }) {
  return (
    <div className="flashcard" onClick={onFlip}>
      {isFlipped ? (
        <p>{card.answer}</p>
      ) : (
        <p>{card.question}</p>
      )}
    </div>
  );
}

export default Flashcard;