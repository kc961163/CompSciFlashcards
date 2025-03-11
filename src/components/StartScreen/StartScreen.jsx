// /src/components/StartScreen/StartScreen.jsx
import React from "react";
import "./StartScreen.css";

function StartScreen({ flashcardsCount, onStart }) {
  return (
    <div className="start-screen">
      <h1>Computer aided questions</h1>
      <p>
        Test your knowledge with these computer science flashcards. Click the
        button below to start!
      </p>
      <p>Number of cards: {flashcardsCount}</p>
      <button className="start-button" onClick={onStart}>
        Start!
      </button>
    </div>
  );
}

export default StartScreen;