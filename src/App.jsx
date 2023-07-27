import React from 'react'
import './App.css'
import StartPage from './StartPage'
import { nanoid } from 'nanoid'
import { decode } from 'html-entities'
import Questions from './Questions'

export default function App() {
  const [selectedAnswers, setSelectedAnswers] = React.useState({})
  const [correctAnswers, setCorrectAnswers] = React.useState({})
  const [isStarted, setIsStarted] = React.useState(false)
  const [quizData, setQuizData] = React.useState([])
  const [score, setScore] = React.useState(0)
  const [showScore, setShowScore] = React.useState(false)
  const [refetch, setRefetch] = React.useState(false)

  const apiUrl = 'https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple'

  React.useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(apiUrl)
        const data = await response.json()

        const shuffledData = data.results.map((question) => { 
          const allAnswers = shuffleArray([...question.incorrect_answers, question.correct_answer])
          const decodedQuestion = decode(question.question)
          const decodedAnswers = allAnswers.map((answer) => decode(answer)) 
          const correctAnswer = decode(question.correct_answer) 
          return {
            id: nanoid(),
            question: decodedQuestion,
            answers: decodedAnswers,
            correctAnswer: correctAnswer,
          }
        })

        setQuizData(shuffledData)
        // as the accumulator goes over each of the elenment in the shuffledArray
        const correctAnswerses= shuffledData.reduce((acc, question) => {
          acc[question.id] = question.correctAnswer // set value of each correct answer to each coressponding questionID 
          return acc
        }, {})

        setCorrectAnswers(correctAnswerses)

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
    setIsStarted(true)
  }

  function handleCheckAnswer() {
    setShowScore(true)
  }


  function handleSelectedAnswer(questionID, selectedAnswer) {
    setSelectedAnswers((prevAnswer) => ({ ...prevAnswer, [questionID]: selectedAnswer }));
  }
 
  React.useEffect(() => {
    function calculateScore() {
      const userAnswers = Object.keys(selectedAnswers);
      const userScore = userAnswers.reduce((score, questionID) => {
        const selectedAnswer = selectedAnswers[questionID]
        const correctAnswer = correctAnswers[questionID]

        if (correctAnswer === selectedAnswer) {
          score += 1
        }

        return score;
      }, 0)

      setScore(userScore)
    }

    calculateScore();
  }, [selectedAnswers, correctAnswers])

  

  function handlePlayAgain() {
    setRefetch((prevState) => !prevState)
    setShowScore(false)
    setSelectedAnswers([])
    setCorrectAnswers([])
    setScore(0)
  }

  return (
    <div className="main-container">
      {isStarted ? (
        <Questions
          handleSelectedAnswer={handleSelectedAnswer}
          questions = {quizData}
          selectedAnswers={selectedAnswers}
          showScore={showScore}
          score={score}
          handleCheckAnswer={handleCheckAnswer}
          handlePlayAgain={handlePlayAgain}
          correctAnswers = {correctAnswers}
        />
      ) : (
        <StartPage handleStartQuiz={handleStartQuiz} />
      )}
    </div>
  )}



