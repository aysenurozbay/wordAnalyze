import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [text, setText] = useState("");

  const [letterCounter, setLetterCounter] = useState(0);
  const [wordCounter, setWordCounter] = useState(0);
  const [longestCounter, setLongestCounter] = useState(0);
  const [averageCounter, setAverageCounter] = useState(0);
  const [readingTimeCounter, setReadingTimeCounter] = useState(0);
  const [median, setMedian] = useState(0);

  const reading_per_sec = 4.25; //calculated with 255 per min
  const mid = [];
  const nums = [];

  const handleEmailChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (value) => {
    value.preventDefault();
    setLetterCounter(text.replace(/\s/g, "").length);
    setWordCounter(text.trim().split(" ").length);
    setLongestCounter(
      text
        .split(" ")
        .reduce(
          (longestWord, currentWord) =>
            currentWord.length > longestWord.length ? currentWord : longestWord,
          ""
        )
    );
    setAverageCounter(
      text.replace(/\s/g, "").length / text.trim().split(" ").length
    );
    setReadingTimeCounter(Math.ceil(wordCounter / reading_per_sec));
    setMedian(
      text
        .split(" ")
        .sort((a, b) => a.length - b.length)
        .Math.floor(text.length / 2) %
        2 !==
        0
        ? nums[mid]
        : (nums[mid - 1] + nums[mid]) / 2
    );
  };
  return (
    <div className="App">
      <div className="container">
        <h3 className="main-title"> Word Analyzer</h3>
        <form className="form" onSubmit={handleSubmit}>
          <label>
            <textarea
              type="text"
              placeholder="Type yourself here..."
              name="words"
              className="inputBox"
              onChange={handleEmailChange}
              value={text}
            />
          </label>
          <input type="submit" value="Analyze" className="submitButton" />
        </form>

        <div className="solutionBox">
          <div className="analyzeItem">
            <h3 className="title">Number of Letter</h3>
            <h3 className="analyzeText">{letterCounter}</h3>
          </div>
          <div className="analyzeItem">
            <h3 className="title">Word Count</h3>
            <h3 className="analyzeText">{wordCounter}</h3>
          </div>
          <div className="analyzeItem">
            <h3 className="title">Longest Word</h3>
            <h3 className="analyzeText">{longestCounter}</h3>
          </div>
          <div className="analyzeItem">
            <h3 className="title">Average word length</h3>
            <h3 className="analyzeText">{averageCounter}</h3>
          </div>

          <div className="analyzeItem">
            <h3 className="title">Reading Duration in Seconds</h3>
            <h3 className="analyzeText">{readingTimeCounter}</h3>
          </div>

          <div className="analyzeItem">
            <h3 className="title">Median</h3>
            <h3 className="analyzeText">{median}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
