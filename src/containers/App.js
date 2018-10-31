import React, { Component } from 'react';
import './App.css';
import Container from '../components/Container';
import Signin from '../components/Signin';
import Register from '../components/Register';

class App extends Component {

	constructor(){
		super();
		this.state = {
			route: 'container'
		}
	}
	onRouteChange = (route) => {
		this.setState({route: route})
	}

  render() {
    return (

      <div className="App">
      
{
	(this.state.route === 'register') ?
    <Register onRouteChange={this.onRouteChange} />
    : ( this.state.route === 'signin') ?
    <Signin onRouteChange={this.onRouteChange} />
    : 
    <Container onRouteChange={this.onRouteChange} />
}
      </div>

    );
  }
}

export default App;
