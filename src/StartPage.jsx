import React from 'react'

export default function StartPage({ handleStartQuiz }) {
  return (
    <>
      <div className="start-container">
        <h1 className="start-container--name">Quizzical</h1>
        <p className="start-container--info">Some description if needed</p>
        <button id="start-button" onClick={handleStartQuiz}>
          Start Quiz
        </button>
      </div>
      <h2 className="developer">Developed by Hoang Nhat Truong</h2>
    </>
  )
}
