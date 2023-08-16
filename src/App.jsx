import React, { useState } from "react";
import "./App.css";
import StartPage from "./StartPage";
import Quizzes from "./Quizzes";
import Options from "./Options";

export default function App() {
  const [isClicked, setIsClicked] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState({
    category: "",
    difficulty: "",
    numberOfQuestions: "",
  });

  const handleStartQuiz = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsStarted(true);
      setIsLoading(false);
    }, 2000);
  };

  const handleClick = () => {
    setIsClicked(true);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setOptions((prevOptions) => {
      return {
        ...prevOptions,
        [name]: name === "numberOfQuestion" ? parseInt(value) : value,
      };
    });
  };
  const handlePlayAgain = () => {
    setIsStarted(false)
    setIsClicked(true)
  }

  return (
    <div className="main-container">
      {isStarted ? (
        <Quizzes
          options={options}
          setIsClicked = {setIsClicked}
          setIsStarted = {setIsStarted}
          setOptions = {setOptions}
        />
      ) : isClicked ? (
        <Options
          handleStartQuiz={handleStartQuiz}
          loading={isLoading}
          options={options}
          handleChange={handleChange}
        />
      ) : (
        <StartPage handleClick={handleClick} />
      )}
    </div>
  );
}


/*

hit play again => make isClicked true => rendering option page again


*/