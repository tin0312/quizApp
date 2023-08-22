import React, { useContext, useState } from 'react';
import { AppContext } from './App';

export default function Options({ handleStartQuiz, isloading }) {
  const { options, setOptions, setIsStarted } = useContext(AppContext);
  const [showMessage, setShowMessage] = useState(false);
  0;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: name === 'numberOfQuestions' ? parseInt(value) : value,
    }));
  };
  const handleShowMessage = () => {
    const isSet = Object.values(options).every((value) => value !== '');
    if (!isSet) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
      handleStartQuiz();
    }
  };
  return (
    <form className='option-window' action=''>
      <select value={options.category} name='category' id='category' onChange={handleChange}>
        <option value=''>-- Any category --</option>
        <option value='9'>General Knowledge</option>
        <option value='10'>Entertainment: Books</option>
        <option value='11'>Entertainment: Film </option>
        <option value='12'>Entertainment: Music</option>
        <option value='13'>Entertainment: Musical & Theatres</option>
        <option value='14'>Entertainment: Television</option>
        <option value='15'>Entertainment: Video Games</option>
        <option value='16'>Entertainment: Board Games</option>
        <option value='17'>Science & Nature</option>
        <option value='18'>Science: Computers</option>
        <option value='19'>Science: Mathematics</option>
        <option value='20'>Mythology</option>
        <option value='21'>Sports</option>
        <option value='22'>Geography</option>
        <option value='23'>History</option>
        <option value='24'>Politics</option>
        <option value='25'>Art</option>
        <option value='26'>Celebrities</option>
        <option value='27'>Animals</option>
        <option value='28'>Vehicles</option>
        <option value='29'>Entertainment</option>
        <option value='30'>Science: Gadgets</option>
        <option value='31'>Entertainment: Japanese Anime & Manga</option>
        <option value='32'>Entertainment: Cartoon & Animation</option>
      </select>

      <label htmlFor=''>Difficulty level</label>
      <select name='difficulty' id='difficulty' onChange={handleChange} value={options.difficulty}>
        <option value=''>Random</option>
        <option value='easy'>Easy</option>
        <option value='medium'>Medium</option>
        <option value='hard'>Hard</option>
      </select>
      <label htmlFor='numberOfQuestions'>Number of questions:</label>
      <input
        type='number'
        id='numberOfQuestions'
        name='numberOfQuestions'
        min='1'
        max='10'
        value={options.numberOfQuestions}
        onChange={handleChange}
      />

      {isloading ? (
        <div className='lds-hourglass'></div>
      ) : (
        <button className='button' type='button' onClick={handleShowMessage}>
          Start Quiz
        </button>
      )}
      {showMessage && <p>Please select all </p>}
    </form>
  );
}
