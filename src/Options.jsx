import React, { useState } from "react";

export default function Options({
  handleStartQuiz,
  loading,
  options,
  handleChange,
}) {
  return (
    <form className="option-window" action="">
      <label htmlFor="category">Select a category:</label>
      <select
        value={options.category}
        name="category"
        id="category"
        onChange={handleChange}
      >
        <option value="">Any Category</option>
        <option value="">General Knowledge</option>
          <option value="">Entertainment: Books</option>
          <option value="">Entertainment: Film </option>
          <option value="">Entertainment: Music</option>
          <option value="">Entertainment: Musical & Theatres</option>
          <option value="">Entertainment: Television</option>
          <option value="">Entertainment: Video Games</option>
          <option value="">Entertainment: Board Games</option>
          <option value="">Science & Nature</option>
          <option value="">Science: Computers</option>
          <option value="">Science: Mathematics</option>
          <option value="">Mythology</option>
          <option value="">Sports</option>
          <option value="">Geography</option>
          <option value="">History</option>
          <option value="">Politics</option>
          <option value="">Art</option>
          <option value="">Celebrities</option>
          <option value="">Animals</option>
          <option value="">Vehicles</option>
          <option value="">Entertainment</option>
          <option value="">Science: Gadgets</option>
          <option value="">Entertainment: Japanese Anime & Manga</option>
          <option value="">Entertainment: Cartoon & Animation</option>
      </select>
      <label htmlFor="">Difficulty level</label>
      <select
        name="difficulty"
        id="difficulty"
        onChange={handleChange}
        value={options.difficulty}
      >
        <option value="">Challedge me</option>
        <option value="">Easy</option>
        <option value="">Medium</option>
        <option value="">Hard</option>
      </select>
      <label htmlFor="numberOfQuestions">Number of questions:</label>
      <input
        type="number"
        id="numberOfQuestions"
        name="numberOfQuestions"
        min="1"
        max="10"
        value={options.numberOfQuestions}
        onChange={handleChange}
      />

      {loading ? (
        <p className="loading-state">Loading...</p>
      ) : (
        <button className="button" type="button" onClick={handleStartQuiz}>
          Start Quiz
        </button>
      )}
    </form>
  );
}
