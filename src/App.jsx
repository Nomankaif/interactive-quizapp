import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Quiz from "./Components/Quiz";
import IntegerQuiz from "./Components/IntegerQuiz";
function App() {
  return (
    <Router>
      <nav className="bg-white shadow-md p-4 flex justify-center space-x-6 text-lg">
        <Link to="/" className="text-blue-600 font-semibold hover:underline">Home</Link>
        <Link to="/quiz" className="text-blue-600 font-semibold hover:underline">Quiz</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/integer-quiz" element={< IntegerQuiz/>} />

      </Routes>
    </Router>
  );
}

export default App;
