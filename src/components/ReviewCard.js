import React from 'react';

const ReviewCard = ({ entry, rate, username}) => {
  return  (
  <div>
      <div className="card orange lighten-4 z-depth-1">
        <div className="card-content black-text">
          <p>{entry}</p>
          <p>{rate}★</p>
          <h6 className="orange-text">{username}</h6>
        </div>
      </div>
	</div>

    );
}

export default ReviewCard;