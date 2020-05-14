import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../reducerActions'

function NavBar(props) {
if (props.editUser === false){
    if (props.connected === true){
        return (
            <div>
              <div className="navbar-container">
                <h1 className="navbar-welcome">Welcome {props.currentUser.user.username}</h1>
                <Link className="navbar-links" to={'/games'}><button className="navbar-buttons">All Games</button></Link>
              </div>
              <div className="navbar-loggedin-buttons">
                <Link className="navbar-links" to={`/profile/${props.currentUser.user.id}`}><button className="navbar-buttons">Your Profile</button></Link>
                <button className="navbar-buttons" onClick={props.logOut}>Log Out</button>
              </div>
            </div>
        )
    }
    return (
        <div className="navbar-loggedout-buttons">
          <Link className="navbar-links" to={'/sign_in'}><button className="navbar-buttons">Login</button></Link>
          <Link className="navbar-links" to={'/games'}><button className="navbar-buttons">All Games</button></Link>
        </div>
    )
} else return null
}

function msp(state){
    return {
  
      connected: state.connected,
      currentUser: state.currentUser,
      editUser: state.editUser,
  
      username: state.username,
      password: state.password,
      bio: state.bio,
      img_url: state.img_url
  
    }
  }
  
  const mdp = {
    logOut
  }

export default connect(msp, mdp)(NavBar);