import React from 'react';


const Container = ({onRouteChange}) => {
  return  (
  	<div className='Container'>
  	  	<nav>
	    <div className="nav-wrapper orange lighten-3">
	    <h5 className="brand-logo girlNextDoor center">Westiny</h5>
	    </div>
	</nav>
		
	    <div className="container">
		    <h1 className='girlNextDoor'>Discover the colorful world</h1>
		    <h4 className='Dosis'>NEW ADVENTURE</h4>
		    <p className='Dosis'>A social media to find tips & tricks to have a perfect vacation and qualify the places that you visit.</p>
	    	<button 
	    	onClick={() => onRouteChange('signin')}
	    	className="btn deep-orange darken-4 z-depth-5 waves-effect waves-light" type="submit" name="action">SIGN IN</button>
	    	<button 
	    	onClick={() => onRouteChange('register')}
	    	className="btn deep-orange darken-4 z-depth-5 waves-effect waves-light" type="submit" name="action">REGISTER</button>
	    </div>
	</div>
    );
}

export default Container;

