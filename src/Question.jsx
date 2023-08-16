import React from "react";

export default function Question({
  question,
  answers,
  selectedAnswers,
  handleSelectedAnswer,
  showScore,
  correctAnswers,
}) {
  const styles = {
    backgroundColor: "#94D7A2",
    border: "none",
  };

  const answerOptions = answers.map((answer, index) => {
    const isSelected = answer === selectedAnswers[question.id]; 
    const isCorrectAnswer = answer === correctAnswers[question.id]; 

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
          className={showScore && !isCorrectAnswer ? "incorrect-answer" : ""}
        />
        <label
          style={showScore && isCorrectAnswer ? styles : {}}
          htmlFor={`question-${question.id}-${index}`}
        >
          {answer}
        </label>
      </div>
    );
  });

  return (
    <div className="container">
      <h2>{question.question}</h2>
      <form className="container--answers">{answerOptions}</form>
    </div>
  );
}
