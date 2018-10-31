import React from 'react';
import Card from './Card';


class Principal extends React.Component {

	constructor(){
		super();
		this.state = {
			cities: []
		}
	}


componentDidMount(){
	const self = this;
	fetch('http://localhost:3000/places')
	.then(response => response.json())
	.then(data => {this.state.cities = data;
		self.forceUpdate()})
}



render (){

  return  (
<div className="container">
	<h1 className="girlNextDoor">Find places</h1> 
	<nav>
	<div className="nav-wrapper">
	<form>
		<div className="input-field orange lighten-4">
	    <input id="search" type="search" />
	    <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
	    <p className='pointer'></p>
	    </div>
	</form>
	</div>
	</nav>

    <h5>Cities:</h5>

	<div class="row">

{
	this.state.cities.map((city) => (<Card city={city.city} img={city.img} />))
}	
	</div>
</div>
        
    );
}}

export default Principal;