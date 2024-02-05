import React from 'react';
import Card from '../Card/Card';

const Cards = ({ info }) => {
  console.log('log de card', info);

  return (
    <div className="cards-container">
      {info && info.map(game => (
        <Card key={`${game.id}-${game.slug}`} info={game} /> 
      ))}
    </div>
  );
}

export default Cards;
