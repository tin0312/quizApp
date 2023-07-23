import React from 'react'

export default function Question({ question, answers, selectedAnswers,handleSelectedAnswer, showScore }) {
  const styles = {
    backgroundColor: '#94D7A2',
    border: 'none',
  }

  const answerOptions = answers.map((answer, index) => {
    //The answer is selected if the answerID === questionID
    const isSelected = selectedAnswers.find((a) => a.questionId === question.id && a.selectedAnswer === answer)

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
          className={showScore && !isSelected ? 'incorrect-answer' : ''}
        />
        <label style={showScore && isSelected ? styles : {}} htmlFor={`question-${question.id}-${index}`}>
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

// There is one way to do here is that: we can check of the answerID === questionID then it is  
// "checked" status









