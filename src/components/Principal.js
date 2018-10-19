import React from 'react';
import Card from './Card';


const Principal = ({onRouteChange}) => {
  return  (
<div className="container">
	<h1 className="girlNextDoor">Find places</h1> 
	<nav>
	<div className="nav-wrapper">
	<form>
		<div className="input-field orange lighten-4">
	    <input id="search" type="search" />
	    <label className="label-icon" for="search"><i className="material-icons">search</i></label>
	    </div>
	</form>
	</div>
	</nav>

    <h5>Cities:</h5>

	<div className='row'>
	<Card onRouteChange={onRouteChange}/>
	
	</div>
</div>
        
    );
}

export default Principal;