import React from "react";

const Scoreboard = ({ score, total }) => {
  return (
    <div className="text-center text-lg font-semibold mt-6">
      <h2>Final Score: <span className="text-blue-600">{score}/{total}</span></h2>
    </div>
  );
};

export default Scoreboard;
