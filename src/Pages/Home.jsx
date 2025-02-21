import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 text-center">
      <h1 className="text-5xl font-bold mb-4 animate-fade-in">Welcome to the Ultimate Quiz Challenge</h1>
      <p className="text-lg mb-8 max-w-2xl">
        Test your knowledge and challenge yourself with fun and interactive quizzes.
        Choose your quiz type to begin!
      </p>
      
      <div className="flex gap-6 flex-col sm:flex-row">
        <Link to="/quiz">
          <button className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold text-xl shadow-lg hover:bg-yellow-500 transition-transform transform hover:scale-105 w-64">
            Multiple Choice 📝
          </button>
        </Link>
        
        <Link to="/integer-quiz">
          <button className="bg-green-400 text-black px-8 py-4 rounded-lg font-semibold text-xl shadow-lg hover:bg-green-500 transition-transform transform hover:scale-105 w-64">
            Number Quiz 🔢
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;