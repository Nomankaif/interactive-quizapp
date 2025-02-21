import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const quizzes = {
  math: [
    { question: "What is 12 + 28?", answer: 40 },
    { question: "What is 15 × 4?", answer: 60 },
    { question: "What is 81 ÷ 9?", answer: 9 },
  ],
  history: [
    { question: "In which year was the Declaration of Independence signed?", answer: 1776 },
    { question: "How many states are there in the United States?", answer: 50 },
  ],
};

const IntegerQuiz = () => {
  const [quizType, setQuizType] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (quizType && timeLeft === 0) {
      handleSubmit();
    }
    if (quizType) {
      const timer = setTimeout(() => setTimeLeft(prev => prev > 0 ? prev - 1 : 0), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, quizType]);

  const startQuiz = (type) => {
    setQuizType(type);
    setQuestions(quizzes[type]);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswers({});
    setQuizOver(false);
    setTimeLeft(30);
  };

  const handleSubmit = () => {
    if (showFeedback) return;

    const numAnswer = parseInt(answer);
    setSelectedAnswers(prev => ({ ...prev, [currentQuestion]: numAnswer }));
    setShowFeedback(true);

    if (numAnswer === questions[currentQuestion].answer) {
      setScore(prev => prev + 1);
    }

    setTimeout(nextQuestion, 2000);
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    setAnswer("");
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(30);
    } else {
      setQuizOver(true);
    }
  };

  if (!quizType) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Choose a Quiz</h1>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => startQuiz("math")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Math Quiz
          </button>
          <button
            onClick={() => startQuiz("history")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition w-full sm:w-auto"
          >
            History Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {!quizOver ? (
        <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <div className="px-4 py-2 bg-red-50 rounded-full text-sm sm:text-base">
              <span className="text-red-600 font-semibold">{timeLeft}s remaining</span>
            </div>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
            <div
              className="bg-green-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>

          <p className="text-lg sm:text-xl text-gray-700 mb-6 text-center">
            {questions[currentQuestion].question}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter your answer"
              className="flex-1 p-3 sm:p-4 text-lg border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
              disabled={showFeedback}
            />
            <button
              onClick={handleSubmit}
              disabled={!answer || showFeedback}
              className="bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>

          {showFeedback && (
            <div className={`mt-6 p-4 rounded-lg ${
              parseInt(answer) === questions[currentQuestion].answer
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}>
              {parseInt(answer) === questions[currentQuestion].answer
                ? "✓ Correct!"
                : `✗ Incorrect. The answer is ${questions[currentQuestion].answer}`}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Quiz Complete</h2>
          <div className="text-5xl sm:text-6xl font-bold text-green-600 mb-2">{score}/{questions.length}</div>
          <p className="text-gray-600">Final Score</p>

          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <Link to="/" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition">
                Back Home
              </button>
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegerQuiz;
