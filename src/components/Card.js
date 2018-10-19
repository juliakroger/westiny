import React from 'react';

const Card = ({onRouteChange}) => {
  return  (

<div className='col'>
	<div className="card cardCities">
		<div className="card-image">
			<img alt='city' src="https://www.urbanarts.com.br/imagens/produtos/026863/0/Ampliada/paisagem.jpg" />    
			<a className="btn-floating halfway-fab waves-effect waves-light orange"><i className="material-icons">add</i></a>
	   	</div>
	    <span className="card-title">Card Title</span>
	    <div className="card-content">
	    	<p onClick={() => onRouteChange('review')} className='pointer'>Go to review</p>
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