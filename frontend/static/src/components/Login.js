import React, { Component } from 'react';
import { withRouter } from "react-router-dom";


class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',

    }
    this.handleInput = this.handleInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleInput(event) {
    this.setState({[event.target.name]: event.target.value});
  }

handleLogin(e, obj){
  this.props.handleLogin(e, this.state);
  this.props.history.push("/recipes")
}

render(){
  return(
    <>

      <form className="loginform" onSubmit={(e) => this.handleLogin(e, this.state)}>
      <input type="text" name="username" value={this.state?.username} placeholder="username" onChange={this.handleInput} required/><br/>
      <input type="password" name="password" value={this.state?.password} placeholder="password" onChange={this.handleInput} required/><br/>
      <button className="btn" type="submit">Login</button>
      </form>

    </>
  )
}

}


export default withRouter(Login);
