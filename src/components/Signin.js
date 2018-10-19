import React from 'react';

class Signin extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      signinUsername: '',
      signinPassword: ''
    }
  }

  onUsernameChange = (event) => {
    this.setState({signinUsername: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signinPassword: event.target.value})
  }

  onSubmitSignin = () => {
  fetch('http://localhost:3000/signin', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      username: this.state.signinUsername,
      password: this.state.signinPassword
    })
  })
    .then(response => response.json())
    .then(user => {
            if(user.id){
              window.location.href = '/home';
            }
    })
  }

  render(){
  return  (
    <center>
    <div className="container">
      <div className="z-depth-1 orange lighten-3 cardAccount" >
        <h1 className="girlNextDoor">Sign in</h1>
        <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <div className="input-field">
              <input onChange={this.onUsernameChange} id="username" type="text" className="validate " />
              <label htmlFor="username">Username</label>
            </div>
        
            <div className="input-field">
              <input onChange={this.onPasswordChange} id="password" type="password" className="validate" />
              <label htmlFor="password">Password</label>
            </div>
        
            <button onClick={this.onSubmitSignin} className="btn deep-orange darken-4 z-depth-5 waves-effect waves-light" type="submit">sign in</button>
            <br/><p onClick={() => this.props.onRouteChange('register')} className='pointer'>Don't have an account? Register here</p>
            </div>
          </div>       
        </div>
        </div>
      </div>       
      </center> 
        );
}}

export default Signin;