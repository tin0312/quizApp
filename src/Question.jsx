import React from 'react'

export default function Question({ question, answers, selectedAnswers,handleSelectedAnswer, showScore, correctAnswers }) {
  const styles = {
    backgroundColor: '#94D7A2',
    border: 'none',
  }

  const answerOptions = answers.map((answer, index) => {
    const isSelected = answer === selectedAnswers[question.id] // purple
    const isCorrectAnswer = answer === correctAnswers[question.id] // green


    return (
      <div key={index} className="container--answer">
        <input
          value={answer}
          onChange={() => handleSelectedAnswer(question.id, answer)}
          checked={isSelected}
          disabled={showScore}
          type="radio"
          name={`question-${question.id}`}
          id={`question-${question.id}-${index}`}
          className={showScore && !isCorrectAnswer ? 'incorrect-answer' : ''}
        />
        <label style={showScore && isCorrectAnswer ? styles : {}} htmlFor={`question-${question.id}-${index}`}>
          {answer}
        </label>
      </div>
    )
  })

  return (
    <div className="container">
      <h2>{question.question}</h2>
      <form className="container--answers">{answerOptions}</form>
    </div>
  )
}
// selected answers : purple 

// => when users select answer options

// correct answers : green (compare the selectedAnswers with the correct answer)
// incorrect answers : red (compare the selectedAnswer with the incorrect answer)
// the other answers : disabled

// => when users click the check answer button











