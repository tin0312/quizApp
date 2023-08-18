import React from 'react';

export default function StartPage({ handleClick }) {
  return (
    <>
      <div className='start-container'>
        <h1 className='start-container--name'>Quizzical</h1>
        <p className='start-container--info'>Test your knowledge </p>

        <button className='button' onClick={handleClick}>
          Click me
        </button>
      </div>
      <h2 className='developer'>Developed by Hoang Nhat Truong</h2>
    </>
  );
}
