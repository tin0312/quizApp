import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

export default function Questions() {
  const [selectedAnswers, setSelectedAnswers] = React.useState({});
  const [correctAnswers, setCorrectAnswers] = React.useState({});
  const [quizData, setQuizData] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [showScore, setShowScore] = React.useState(false);
  const [refetch, setRefetch] = React.useState(false);

  const apiUrl =
    "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple";

  React.useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const shuffledData = data.results.map((question) => {
          const allAnswers = shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
          ]);
          const decodedQuestion = decode(question.question);
          const decodedAnswers = allAnswers.map((answer) => decode(answer));
          const correctAnswer = decode(question.correct_answer);
          return {
            id: nanoid(),
            question: decodedQuestion,
            answers: decodedAnswers,
            correctAnswer: correctAnswer,
          };
        });
        setQuizData(shuffledData);
        // as the accumulator goes over each of the elenment in the shuffledArray
        const correctAnswers = shuffledData.reduce((acc, question) => {
          acc[question.id] = question.correctAnswer; // set value of each correct answer to each coressponding questionID
          return acc;
        }, {});

        setCorrectAnswers(correctAnswers);
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, [refetch]);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function handleCheckAnswer() {
    setShowScore(true);
  }

  function handleSelectedAnswer(questionID, selectedAnswer) {
    setSelectedAnswers((prevAnswer) => {
      return {
        ...prevAnswer,
        [questionID]: selectedAnswer,
      };
    });
  }

  React.useEffect(() => {
    function calculateScore() {
      const userAnswers = Object.keys(selectedAnswers);
      const userScore = userAnswers.reduce((score, questionID) => {
        const selectedAnswer = selectedAnswers[questionID];
        const correctAnswer = correctAnswers[questionID];

        if (correctAnswer === selectedAnswer) {
          score += 1;
        }

        return score;
      }, 0);

      setScore(userScore);
    }

    calculateScore();
  }, [selectedAnswers, correctAnswers]);

  function handlePlayAgain() {
    setRefetch((prevState) => !prevState);
    setShowScore(false);
    setSelectedAnswers([]);
    setCorrectAnswers([]);
    setScore(0);
  }

  const quizElements = quizData.map((question) => (
    <Question
      key={question.id}
      answers={question.answers}
      question={question}
      selectedAnswers={selectedAnswers}
      handleSelectedAnswer={handleSelectedAnswer}
      showScore={showScore}
      correctAnswers={correctAnswers}
    />
  ));

  return (
    <div className="main-container">
      {quizElements}

      {showScore ? (
        <div className="show-score">
          <h3 className="user-score">
            You scored {score} out of {quizData.length} correct answers
          </h3>
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
  );
}
