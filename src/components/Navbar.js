import React from 'react';

const NavBar = ({onRouteChange}) => {

  return  (
  	<nav>
	    <div className="nav-wrapper orange lighten-3">
	    <ul className="left hide-on-med-and-down">
        <li className='NavIcons pointer'><i onClick={() => onRouteChange('principal')} className="material-icons">home</i></li>
        </ul>
	    <h5 className="brand-logo girlNextDoor center">Westiny</h5>
	    <ul className="right hide-on-med-and-down">
        <li className='NavIcons'><i className="material-icons">person_pin</i></li>
        <li className='NavIcons'>Julia Kroger</li>
        <li className='NavIcons pointer'><i className="material-icons">subdirectory_arrow_right</i></li>

      </ul>
	    </div>
	</nav>

	);
}

export default NavBar;