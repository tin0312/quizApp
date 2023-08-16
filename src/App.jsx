import React, { useState } from "react";
import "./App.css";
import StartPage from "./StartPage";
import Quizzes from "./Quizzes";

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleStartQuiz = () => {
    setIsLoading(true);
    // set timeout before fetching the data
    setTimeout(() => {
      setIsStarted(true);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="main-container">
      {isStarted ? (
        <Quizzes />
      ) : (
        <StartPage handleStartQuiz={handleStartQuiz} isLoading={isLoading}/>
      )}
    </div>
  );
}

