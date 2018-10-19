import React from 'react';

const NavBar = ({onRouteChange}) => {
  return  (
  	<nav>
	    <div className="nav-wrapper orange lighten-3">
	    <ul className="left hide-on-med-and-down">
        <li><a><i onClick={() => onRouteChange('principal')} className="material-icons">home</i></a></li>
        </ul>
	    <h5 className="brand-logo girlNextDoor center">Westiny</h5>
	    <ul className="right hide-on-med-and-down">
        <li><a><i className="material-icons">person_pin</i></a></li>
        <li><a>Julia Kroger</a></li>
        <li><a><i className="material-icons">subdirectory_arrow_right</i></a></li>

      </ul>
	    </div>
	</nav>

	);
}

export default NavBar;