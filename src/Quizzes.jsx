import React, { useState, useContext } from 'react';
import Question from './Question';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';
import { AppContext } from './App';
import { useWindowSize } from '@uidotdev/usehooks';
import Confetti from 'react-confetti';

export default function Quizzes() {
  const { options, setIsStarted, setIsClicked, setOptions } = useContext(AppContext);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [isRefetch, setIsRefetch] = useState(false);
  const { width, height } = useWindowSize();
  React.useEffect(() => {
    const apiUrl = `https://opentdb.com/api.php?amount=${options.numberOfQuestions}&category=${options.category}&difficulty=${options.difficulty}&type=multiple`;
    async function getData() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const shuffledData = data.results.map((question) => {
          const allAnswers = shuffleArray([...question.incorrect_answers, question.correct_answer]);
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
  }, [isRefetch]);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function handleSelectedAnswer(questionID, selectedAnswer) {
    setSelectedAnswers((prevAnswer) => {
      return {
        ...prevAnswer,
        [questionID]: selectedAnswer,
      };
    });
  }
  function handleCheckAnswer() {
    // check if all answers are selected
    // check if numbers of questions with corresponding selected answer equal to the actual questions
    const isAllSelected =
      Object.values(selectedAnswers).every((value) => value !== '') &&
      quizData?.length === Object.keys(selectedAnswers)?.length;
    //
    if (!isAllSelected) {
      window.alert('Please select all answers');
    } else {
      setShowScore(true);
    }
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
    setIsRefetch(true);
    setShowScore(false);
    setSelectedAnswers({});
    setCorrectAnswers({});
    setScore(0);
  }
  function returnToOptions(){
          setIsStarted(false)
          setIsClicked(true)
          setOptions({
            category: '', 
            difficulty: '',
            numberOfQuestions: '',
          })
          setCorrectAnswers({})
          setCorrectAnswers({})
          setScore(0)
          setShowScore(false) 
  }

  const quizElements = quizData?.map((question) => (
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
    <div className='main-container'>
      <div className='button-option-container'>
        <button onClick = {returnToOptions} className='button' id='to-option'>
          <span className='material-symbols-outlined'>arrow_back</span>Options
        </button>
      </div>
      {quizElements}

      {showScore ? (
        <>
          <Confetti width={width} height={height} />
          <div className='show-score'>
            <h3 className='user-score'>
              You scored {score} out of {quizData.length} correct answers
            </h3>
            <button className='button' onClick={handlePlayAgain}>
              Play Again
            </button>
          </div>
        </>
      ) : (
        <button className='button' onClick={handleCheckAnswer}>
          Check Answer
        </button>
      )}
    </div>
  );
}
/*


Task 3: Play again btn can refetch the same options data from the last API call

- Go back to option page

*/
