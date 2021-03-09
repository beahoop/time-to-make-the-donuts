import React, { Component } from 'react';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',

    }
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    this.setState({[event.target.name]: event.target.value});
  }


render(){
  return(
    <>
      <form className="loginform" onSubmit={(e) => this.props.handleLogin(e, this.state)}>
      <input type="text" name="username" value={this.state.username} placeholder="username" onChange={this.handleInput} required/><br/>
      <input type="email" name="email" value={this.state.email} placeholder="email" onChange={this.handleInput} required/><br/>
      <input type="password" name="password" value={this.state.password} placeholder="password" onChange={this.handleInput} required/><br/>
      <button className="btn" type="submit">Login</button>
      </form>
    </>
  )
}

}


export default Login;
