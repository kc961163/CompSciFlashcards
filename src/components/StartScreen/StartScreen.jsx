// /src/components/StartScreen/StartScreen.jsx
import React from "react";
import "./StartScreen.css";

function StartScreen({ flashcardsCount, onStart, currentStreak, maxStreak }) {
  return (
    <div className="start-screen">
      <h1>Computer aided questions</h1>
      <p>
        Test your knowledge with these computer science flashcards. Click the
        button below to start!
      </p>
      <p>Number of cards: {flashcardsCount}</p>
      <div className="streak-info">
        <p>Current Streak: {currentStreak}</p>
        <p>Longest Streak: {maxStreak}</p>
      </div>
      <button className="start-button" onClick={onStart}>
        Start!
      </button>
    </div>
  );
}

export default StartScreen;