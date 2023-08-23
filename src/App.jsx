import React, { useState, createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import StartPage from './StartPage';
import Quizzes from './Quizzes';
import Options from './Options';

export const AppContext = createContext();

export default function App() {
  const [isClicked, setIsClicked] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState({
    category: '',
    difficulty: '',
    numberOfQuestions: '',
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

  const contextValue = {
    setIsStarted,
    setIsClicked,
    setIsLoading,
    options,
    setOptions,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className='main-container'>
        {isStarted ? (
          <Quizzes />
        ) : isClicked ? (
          <Options isloading={isLoading} handleStartQuiz={handleStartQuiz} />
        ) : (
          <StartPage handleClick={handleClick} />
        )}
      </div>
    </AppContext.Provider>
  );
}
