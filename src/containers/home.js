import React from 'react';
import Navbar from '../components/Navbar';
import Principal from '../components/Principal';
import Review from '../components/Review';

class home extends React.Component {


  constructor(){
    super();
    this.state = {
      route: 'review'
    }
  }

  onRouteChange = (route) => {
    this.setState({route: route})
  }

  render() {
    return (
      <div className="App">
      <Navbar onRouteChange={this.onRouteChange}/>
{
  (this.state.route === 'review') ?
  <Review />
  :
  <Principal onRouteChange={this.onRouteChange}/>

}
      </div>
    ); 
  }
}

export default home;