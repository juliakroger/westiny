import React from 'react';

const Card = ({ city, img}) => {
  return  (
  	<div className='col'>
	<div className="card cardCities z-depth-5">
		<div className="card-image">
			<img className="city-image" alt='city' src={img} />    
			<p className="btn-floating halfway-fab waves-effect waves-light orange"><i className="material-icons">add</i></p>
	   	</div>

	    <div className="card-content">
	    	    <span className="card-title">{city}</span>
	        <i className="material-icons tiny">star</i>
	        <i className="material-icons tiny">star</i>
	        <i className="material-icons tiny">star</i>
	        <i className="material-icons tiny">star_half</i>
	        <i className="material-icons tiny">star_border</i>
	    </div>
	</div>
	</div>
	);
}

export default Card;