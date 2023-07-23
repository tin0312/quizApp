import React from 'react'
import './App.css'
import StartPage from './StartPage'
import { nanoid } from 'nanoid'
import { decode } from 'html-entities'
import Questions from './Questions'

export default function App() {
  const [selectedAnswers, setSelectedAnswers] = React.useState({})
  const [correctAnswer, setCorrectAnswer] = React.useState([])// an array of correct answers 
  const [startQuiz, setStartQuiz] = React.useState(false)
  const [result, setResult] = React.useState([])
  const [score, setScore] = React.useState(0)
  const [showScore, setShowScore] = React.useState(false)
  const [refetch, setRefetch] = React.useState(false)

  const apiUrl = 'https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple'

  React.useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(apiUrl)
        const data = await response.json()

        const shuffledResults = data.results.map((question) => {// each question here is an object 
          const allAnswers = shuffleArray([...question.incorrect_answers, question.correct_answer])// all answers
          const decodedQuestion = decode(question.question)
          const decodedAnswers = allAnswers.map((answer) => decode(answer)) // 5 objects, each object has an array of 4 answers
          const correctAnswer = decode(question.correct_answer) // an array of 5 correct answers

          return {
            id: nanoid(),
            question: decodedQuestion,
            answers: decodedAnswers,
            correctAnswer: correctAnswer,
          }
        })

        setResult(shuffledResults)// now result is an array of 5 objects, each object has 4 properties: id, question, answers, correctAnswer
        // each object now has an ID 
        setCorrectAnswer(shuffledResults.map((question) => question.correctAnswer))
      } catch (error) {
        console.log(error)
      }
    }

    getData()
  }, [refetch])

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }

  function handleStartQuiz() {
    setStartQuiz(true)
  }

  function handleCheckAnswer() {
    setShowScore(true)
  }


  function handleSelectedAnswer(questionID, selectedAnswer) {
    const updatedSelectedAnswers = { ...selectedAnswers };
    updatedSelectedAnswers[questionID] = selectedAnswer;
    setSelectedAnswers(updatedSelectedAnswers);
  }
 
  React.useEffect(() => {
    function calculateScore() {
      const userScore = Object.keys(selectedAnswers).reduce((score, questionID) => {
        const question = result.find((q) => q.id === questionID);
        const selectedAnswer = selectedAnswers[questionID];
  
        if (question.correctAnswer === selectedAnswer) {
          return score + 1;
        } else {
          return score;
        }
      }, 0);
      setScore(userScore);
    }
  
    calculateScore();
  }, [selectedAnswers]);
  

  function handlePlayAgain() {
    setRefetch((prevState) => !prevState)
    setShowScore(false)
    setSelectedAnswers([])
    setCorrectAnswer([])
    setScore(0)
  }

  return (
    <div className="main-container">
      {startQuiz ? (
        <Questions
          handleSelectedAnswer={handleSelectedAnswer}
          questions={result}
          selectedAnswers={selectedAnswers}
          showScore={showScore}
          score={score}
          handleCheckAnswer={handleCheckAnswer}
          handlePlayAgain={handlePlayAgain}
        />
      ) : (
        <StartPage handleStartQuiz={handleStartQuiz} />
      )}
    </div>
  )}


// Current behaviours of the app
// 1.Incorrect answers are not labled in red
// 2. Correct answers are not labeled as correct answers
// 3. Correct answers are not showing up after the check answer button


