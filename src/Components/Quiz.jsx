import React, { useState, useEffect } from "react";
import { quizData } from "../Utils/data";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      handleTimeout();
    }
    const timer = setTimeout(() => setTimeLeft(prev => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleTimeout = () => {
    if (!showFeedback) {
      setShowFeedback(true);
      setTimeout(nextQuestion, 1500);
    }
  };

  const handleAnswerSelection = (option) => {
    if (showFeedback) return;
    
    setSelectedAnswers(prev => ({ ...prev, [currentQuestion]: option }));
    setShowFeedback(true);
    
    if (option === quizData[currentQuestion].answer) {
      setScore(prev => prev + 1);
    }

    setTimeout(nextQuestion, 1500);
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(30);
    } else {
      setQuizOver(true);
    }
  };

  const QuestionCard = () => (
    <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold text-gray-800">
          Question {currentQuestion + 1} of {quizData.length}
        </h2>
        <div className="px-4 py-2 bg-red-50 rounded-full">
          <span className="text-red-600 font-semibold">{timeLeft}s remaining</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
        <div
          className="bg-blue-600 h-full rounded-full transition-all duration-500"
          style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="mb-8">
        <p className="text-xl text-gray-700 font-serif">
          {quizData[currentQuestion].question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-4">
        {quizData[currentQuestion].options.map((option) => {
          const isSelected = selectedAnswers[currentQuestion] === option;
          const isCorrect = option === quizData[currentQuestion].answer;
          
          return (
            <button
              key={option}
              onClick={() => handleAnswerSelection(option)}
              disabled={showFeedback}
              className={`
                w-full p-4 text-left rounded-lg border-2 transition-all duration-300
                ${!showFeedback ? 'hover:border-blue-500 hover:bg-blue-50' : ''}
                ${!showFeedback ? 'border-gray-200' : ''}
                ${showFeedback && isSelected && isCorrect ? 'border-green-500 bg-green-50' : ''}
                ${showFeedback && isSelected && !isCorrect ? 'border-red-500 bg-red-50' : ''}
                font-medium text-lg
              `}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showFeedback && isSelected && (
                  <span className={`font-serif text-xl ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {isCorrect ? '✓' : '✗'}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={nextQuestion}
        className="mt-8 bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300 w-full"
      >
        {currentQuestion + 1 < quizData.length ? "Skip Question" : "Finish Quiz"}
      </button>
    </div>
  );

  const ResultCard = () => (
    <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">Quiz Complete</h2>
        <div className="text-6xl font-bold text-blue-600 mb-2">{score}/{quizData.length}</div>
        <p className="text-gray-600">Final Score</p>
      </div>

      <div className="space-y-6">
        {quizData.map((q, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <p className="font-serif text-lg text-gray-800 mb-4">{q.question}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`font-serif text-xl ${
                  selectedAnswers[index] === q.answer ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedAnswers[index] === q.answer ? '✓' : '✗'}
                </span>
                <p className={`font-medium ${
                  selectedAnswers[index] === q.answer ? 'text-green-600' : 'text-red-600'
                }`}>
                  Your Answer: {selectedAnswers[index] || "Not Answered"}
                </p>
              </div>
              {selectedAnswers[index] !== q.answer && (
                <p className="text-blue-600 font-medium">
                  Correct Answer: {q.answer}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => window.location.reload()}
        className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 w-full"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      {!quizOver ? <QuestionCard /> : <ResultCard />}
    </div>
  );
};

export default Quiz;