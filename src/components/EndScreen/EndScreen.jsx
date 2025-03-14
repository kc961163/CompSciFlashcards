// src/components/EndScreen/EndScreen.jsx
import React from "react";
import "./EndScreen.css";

function EndScreen({ currentStreak, maxStreak, masteredCount, onRestart }) {
  return (
    <div className="end-screen">
      <h1>Quiz Completed!</h1>
      <p>Final Current Streak: {currentStreak}</p>
      <p>Longest Streak: {maxStreak}</p>
      <p>Mastered Cards: {masteredCount}</p>
      <button className="restart-button" onClick={onRestart}>
        Restart Quiz
      </button>
    </div>
  );
}

export default EndScreen;