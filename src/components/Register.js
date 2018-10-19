import React from 'react';

class Register extends React.Component {


    constructor(props){
      super(props);
      this.state = {
        RegisterName: '',
        RegisterUsername: '',
        RegisterPassword: ''
      }
    }

    onNameChange = (event) => {
      this.setState({RegisterName: event.target.value})
    }

    onUsernameChange = (event) => {
      this.setState({RegisterUsername: event.target.value})
    }

    onPasswordChange = (event) => {
      this.setState({RegisterPassword: event.target.value})
    }

  onSubmitRegister = () => {
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.RegisterName,
        username: this.state.RegisterUsername,
        password: this.state.RegisterPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
        this.props.onRouteChange('signin');
        }
      })

  }

  render(){
    return  (
  <center>
  <div className="container">
          <div className="z-depth-1 orange lighten-3 cardAccount" >
  
  
      <h1 className="girlNextDoor">Register</h1>
      <div className="card horizontal">
  
        <div className="card-stacked">
          <div className="card-content">
              <div className="input-field">
              <input onChange={this.onNameChange} id="name" type="text" className="validate " />
              <label htmlFor="name">Name</label>
            </div>
  
            <div className="input-field">
              <input onChange={this.onUsernameChange} id="username" type="text" className="validate " />
              <label htmlFor="username">Username</label>
            </div>
  
            <div className="input-field">
              <input onChange={this.onPasswordChange} id="password" type="password" className="validate" />
              <label htmlFor="password">Password</label>
            </div>
  
            <input onClick={this.onSubmitRegister} className="btn deep-orange darken-4 z-depth-5 waves-effect waves-light white-text pointer" placeholder="register"/>
  
      </div>
         </div>
  
          
        </div>
      </div>
  
    
          </div>
          
  </center>
      );
  }}

export default Register;