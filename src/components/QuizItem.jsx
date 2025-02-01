import React, { useState } from "react";

const QuizItem = ({ question, onSelectAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedAnswer(option);
    onSelectAnswer(question.id, option);
  };

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="quiz-item">
      <h3>Q.no: {question.id} {question.question}</h3>
      <div className="options">
        {question.options.map((option, index) => (
          <label
            key={index}
            className={`option-label ${showAnswer ? 
              option === question.answer 
                ? "correct" 
                : selectedAnswer === option 
                  ? "incorrect" 
                  : "" 
              : ""}`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option}
              onChange={() => handleOptionClick(option)}
              checked={selectedAnswer === option}
            />
            {option}
          </label>
        ))}
      </div>
      <button onClick={handleShowAnswer}>
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </button>
      {showAnswer && (
        <p>
          {selectedAnswer === question.answer
            ? "✅ Correct!"
            : "❌ Incorrect!"} The answer is <b>{question.answer}</b>
        </p>
      )}
    </div>
  );
};

export default QuizItem;