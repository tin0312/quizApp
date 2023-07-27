import React from 'react'
import Question from './Question'

export default function Questions({ questions, selectedAnswers, handleSelectedAnswer, showScore, score, handleCheckAnswer, handlePlayAgain, correctAnswers}) {
  const quizElements = questions.map((question) => (
    <Question
      key={question.id}
      question={question}
      answers={question.answers}
      selectedAnswers={selectedAnswers}
      handleSelectedAnswer={handleSelectedAnswer}
      showScore={showScore}
      correctAnswers={correctAnswers}
    />))
  return (
    <div className="main-container">
    {quizElements}
    
    {showScore ? (
      <div className="show-score">
        <h3 className="user-score">You scored {score} out of {questions.length} correct answers</h3>
        <button id="play-again-btn" onClick={handlePlayAgain}>
          Play Again
        </button>
      </div>
    ) : (
      <button id="check-btn" onClick={handleCheckAnswer}>
        Check Answer
      </button>
    )}
  </div>
  )
}
