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
      console.log(e)
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

  goBack = (e) => {
    if(this.state.showCreateForm === true){
      this.setState({
        showCreateForm: false
      })
    } else {
      window.history.back()
    }
  }

  render(){
    // console.log(this.state.showErrors)
    return (
  <div className="signin-main-container">
    <div className="signin-container">
      <div className="signin-form">
        <form onSubmit={e => this.submitForm(e)} >
          <div className="signin-form-container">
            <h3>USERNAME</h3>
            <input className="signin-form-fields" name="username" value={this.props.username} onChange={(e) => this.props.formChange(e)} ></input>
            <h3>PASSWORD</h3>
            <input className="signin-form-fields" name="password" value={this.props.password} onChange={(e) => this.props.formChange(e)} type="password"></input>
            {this.state.showCreateForm === true ? 
            <>
              <h3>BIO</h3>
              <input className="signin-form-fields" name="bio" value={this.props.bio} onChange={(e) => this.props.formChange(e)} ></input>
              <h3>IMAGE URL</h3>
              <input className="signin-form-fields" name="img_url" value={this.props.img_url} onChange={(e) => this.props.formChange(e)} ></input>
            </>
            : null}
          </div>
            {this.state.showCreateForm === false ? 
            <>
              <input className="signin-buttons" type="Submit" value="Submit"></input>
              <button className="signin-buttons" onClick={(e) => this.createUserForm(e)}>New User Form</button>
            </>
              : 
              <button className="signin-buttons" onClick={(e) => this.submitForm(e)}>Create User!</button>
              }
              {this.state.showError === true && this.state.showCreateForm === false ? <h3>Username or password does not exist or is incorrect. Please try again.</h3>: null}
              {this.props.connected === true ? <h3>SUCCESSFULLY LOGGED IN</h3>: null}
          </form>
          <button onClick={(e) => this.goBack(e)}>Go Back</button>
        </div>
      </div>
    </div>
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
