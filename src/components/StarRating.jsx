// src/components/StarRating.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StarRating = ({ rating }) => {
  const totalStars = 5;
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    stars.push(
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        className={i <= rating ? 'text-yellow-500' : 'text-gray-300'}
      />
    );
  }

  return <div className="flex justify-center mb-2">{stars}</div>;
};

export default StarRating;
