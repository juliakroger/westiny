import React from 'react';
import ReviewCard from './ReviewCard';


class AllReviews extends React.Component {

  constructor(){
    super();
    this.state = {
      rates: []
    }
  }

componentDidMount(){
  const self = this;
  fetch('http://localhost:3000/rates/The Wall')
  .then(response => response.json())
  .then(data => {this.state.rates = data;
    console.log(data)
    self.forceUpdate()})
}



  render(){ 
    return (
  <div>{
    this.state.rates.map((rate) => (<ReviewCard entry={rate.entry} rate={rate.rate} username={rate.username}/>))

  }</div>
    
      );
  }
}

export default AllReviews;