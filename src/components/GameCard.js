import React from 'react';

const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <h2>{game.name}</h2>
      <p>{game.summary}</p>
      <p>Rating: {game.rating}</p>
      <p>Release Date: {new Date(game.firstReleaseDate).toLocaleDateString()}</p>
    </div>
  );
};

export default GameCard;
