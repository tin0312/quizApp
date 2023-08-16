import React from "react";

export default function StartPage({ handleStartQuiz, isLoading }) {
  return (
    <>
      <div className="start-container">
        <h1 className="start-container--name">Quizzical</h1>
        <p className="start-container--info">Challegen yourself</p>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <button id="start-button" onClick={handleStartQuiz}>
            Start Quiz
          </button>
        )}
      </div>
      <h2 className="developer">Developed by Hoang Nhat Truong</h2>
    </>
  );
}
