import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [text, setText] = useState("");

  const [letterCounter, setLetterCounter] = useState(0);
  const [wordCounter, setWordCounter] = useState(0);
  const [longestCounter, setLongestCounter] = useState(0);
  const [averageCounter, setAverageCounter] = useState(0);
  const [readingTimeCounter, setReadingTimeCounter] = useState(0);
  const [medianByLength, setMedianByLength] = useState("");
  const [medianWithoutLength, setMedianWithoutLength] = useState("");
  const [frequency, setFrequency] = useState([]);
  const [language, setLanguage] = useState("");

  const reading_per_sec = 4.25; //calculated with 255 per min

  const handleEmailChange = (event) => {
    setText(event.target.value);
  };

  const findMedian = (stringArray, byLength) => {
    const mid = Math.floor(stringArray.length / 2),
      nums = byLength
        ? [...stringArray].sort((a, b) => a.length - b.length)
        : [...stringArray];

    return stringArray.length % 2 !== 0
      ? nums[mid]
      : `${nums[mid - 1]} ${nums[mid]}`;
  };

  const wordFreq = (string) =>
    string.split(/\s/).reduce(
      (output, word) =>
        Object.assign(output, {
          [word]: output[word] ? output[word] + 1 : 1,
        }),
      {}
    );

  const sortByValue = (obj) => {
    const sortedWord = Object.entries(obj)
      .map((currentValue) => [currentValue[1], currentValue[0]])
      .sort((a, b) => parseInt(b) - parseInt(a))
      .slice(0, 5);
    const wordsObj = sortedWord.map((word) => ({
      count: word[0],
      word: word[1],
    }));
    return wordsObj;
  };

  const languageDetect = (stringArray) => {
    console.log(stringArray);
    const word = "am";
    const word2 = "is";
    const word3 = "are";
    const lang =
      stringArray.match("\\b" + word + "\\b") ||
      stringArray.match("\\b" + word2 + "\\b") ||
      stringArray.match("\\b" + word3 + "\\b")
        ? "English"
        : "Turkish";

    return lang;
  };

  const handleSubmit = (value) => {
    value.preventDefault();

    const letterCounter = text.replace(/\s/g, "").length;
    setLetterCounter(letterCounter);

    const wordCounter = text.trim().split(" ").length;
    setWordCounter(wordCounter);

    const longestCounter = text
      .split(" ")
      .reduce(
        (longestWord, currentWord) =>
          currentWord.length > longestWord.length ? currentWord : longestWord,
        ""
      );
    setLongestCounter(longestCounter);

    const averageCounter =
      text.replace(/\s/g, "").length / text.trim().split(" ").length;
    setAverageCounter(averageCounter);

    setReadingTimeCounter((wordCounter / reading_per_sec).toFixed(3));

    const medianByLength = findMedian(text.trim().split(" "), true);
    setMedianByLength(medianByLength);

    const medianWithoutLength = findMedian(text.trim().split(" "), false);
    setMedianWithoutLength(medianWithoutLength);

    const textCopy = text
      .replace(/[?.!,"\(\)]/g, "")
      .replace(/[ ]{2,}/g, "")
      .trim()
      .toLowerCase();

    console.log(sortByValue(wordFreq(textCopy)));
    setFrequency(sortByValue(wordFreq(textCopy)));

    setLanguage(languageDetect(textCopy));
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
              className="input-box"
              onChange={handleEmailChange}
              value={text}
            />
          </label>
          <input type="submit" value="Analyze" className="submitButton" />
        </form>
        <div className="solution-box">
          <div className="analyze-item">
            <h3 className="title">Number of Letter</h3>
            <h3 className="analyze-text">{letterCounter}</h3>
          </div>

          <div className="analyze-item">
            <h3 className="title">Word Count</h3>
            <h3 className="analyze-text">{wordCounter}</h3>
          </div>

          <div className="analyze-item">
            <h3 className="title">Longest Word</h3>
            <h3 className="analyze-text">{longestCounter}</h3>
          </div>

          <div className="analyze-item">
            <h3 className="title">Average word length</h3>
            <h3 className="analyze-text">{averageCounter}</h3>
          </div>

          <div className="analyze-item">
            <h3 className="title">Reading Duration in Seconds</h3>
            <h3 className="analyze-text">{readingTimeCounter}</h3>
          </div>

          <div className="analyze-item">
            <h3 className="title">Median Sorting by Length</h3>
            <h3 className="analyze-text">{medianByLength}</h3>
          </div>

          <div className="analyze-item">
            <h3 className="title">Median Without Sorting Length</h3>
            <h3 className="analyze-text">{medianWithoutLength}</h3>
          </div>

          <div className="analyze-item">
            <h3 className="title">Most Frequently used 5 Words</h3>

            <div className="frequency">
              {frequency.map((word, index) => {
                return (
                  <h3 className="analyze-text" key={index}>
                    {word.word} - {word.count}
                  </h3>
                );
              })}
            </div>
          </div>

          <div className="analyze-item">
            <h3 className="title">Language</h3>
            <h3 className="analyze-text">{language}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
