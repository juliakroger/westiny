import React from 'react';
import Coment from './Coment';
import AllReviews from './AllReviews';

class Review extends React.Component {

    constructor(){
    super();
    this.state = {
      city: '',
      img: '',
      about: ''
    }
  }



componentDidMount(){
  const CITY_ID = 23;
  const self = this;
  fetch('http://localhost:3000/places/' + CITY_ID)
  .then(response => response.json())
  .then(data => {
    this.state.city = data[0].city;
    this.state.img = data[0].img;
    this.state.about = data[0].about;
    self.forceUpdate();
  })
}



  render()  {
  return (
  	<div>
  	<div className='container'>
  	<div className="col orange lighten-4 z-depth-1">
  	<div className="row ">
  		<div className='col s6'>
  			<h1 className='girlNextDoor'>{this.state.city}</h1>
  			<p>{this.state.about}</p>
  		</div>
  		<div className='col s6'>
  			<img alt='City' className='responsive-img'src={this.state.img} />    	    
  		</div>
  	</div>
  	</div>
  
  
  	<AllReviews />
  	
  	</div>
  
  
  	<footer className="page-footer orange lighten-3">
  		<Coment />	
      </footer> 
  
  
  
    </div>);
    };
}

export default Review;