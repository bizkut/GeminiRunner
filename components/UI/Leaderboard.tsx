import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch('/api/scores')
      .then(res => res.json())
      .then(data => setScores(data))
      .catch(err => console.error('Error fetching scores:', err));
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 p-8 rounded-lg z-100 w-full max-w-md text-white">
      <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400">
        <Trophy className="inline-block mr-2" />
        Top 10 Scores
      </h2>
      <ol className="list-decimal list-inside">
        {scores.map((score, index) => (
          <li key={index} className="flex justify-between p-2 border-b border-gray-700">
            <span>{score.name}</span>
            <span>{score.score}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
