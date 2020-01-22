import React from "react";
import { connect } from 'react-redux';
import { formChange, resetValues, successfulLogin } from '../reducerActions'

class SignIn extends React.Component {

  state = {
    showCreateForm: false,
    showError: false
  }

  createUserForm = (e) => {
    this.props.resetValues() 
    this.setState({
      showCreateForm: true
    })
  }

  submitForm = (e) => {
    if (this.state.showCreateForm === true){
      this.createUser(e)
    } else {
      this.login(e)
    }
  }

  login = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify({
        username: this.props.username,
        password: this.props.password
      })
    }).then(resp => resp.json()).then(loginAttempt => {
        // console.log(loginAttempt)
        if (loginAttempt.logged_in === true){
          this.props.resetValues()
          this.props.successfulLogin(loginAttempt)
          this.props.history.goBack()
        }
        else this.setState({
          showError: true
        })
    }).catch(error => error)
  }

  createUser = (e) => {
    console.log("attempted creation successful")
    e.preventDefault()
    fetch('http://localhost:3000/users', {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
          username: this.props.username,
          password: this.props.password,
          bio: this.props.bio,
          img_url: this.props.img_url
      })
    }).then(resp => resp.json()).then(data => {
      this.props.resetValues() 
      window.location.reload();
    })
  }

  render(){
    // console.log(this.state.showErrors)
    return (
      <>
        <form onSubmit={e => this.submitForm(e)} >
          <h1>USERNAME</h1>
          <input name="username" value={this.props.username} onChange={(e) => this.props.formChange(e)} ></input>
          <h1>PASSWORD</h1>
          <input name="password" value={this.props.password} onChange={(e) => this.props.formChange(e)} type="password"></input>
          {this.state.showCreateForm === true ? 
          <>
            <h1>BIO</h1>
            <input name="bio" value={this.props.bio} onChange={(e) => this.props.formChange(e)} ></input>
            <h1>IMAGE URL</h1>
            <input name="img_url" value={this.props.img_url} onChange={(e) => this.props.formChange(e)} ></input>
          </>
          : null}
          <input type="Submit" value="Submit"></input>
        </form>
        {this.state.showCreateForm === false ? 
          <>
            <button onClick={e => this.createUserForm(e)}>New User Form</button>
          </>
          : null}
          {this.state.showError === true && this.state.showCreateForm === false ? <h1>Username or password does not exist or is incorrect. Please try again.</h1>: null}
          {this.props.connected === true ? <h1>SUCCESSFULLY LOGGED IN</h1>: null}
        </>
      )
  }
}


// export default SignIn

function msp(state){
  return {
    connected: state.connected,
    currentUser: state.currentUser,
    username: state.username,
    password: state.password,
    bio: state.bio,
    img_url: state.img_url
  }
}

const mdp = {
  formChange,
  resetValues,
  successfulLogin
}

export default connect(msp, mdp)(SignIn);
