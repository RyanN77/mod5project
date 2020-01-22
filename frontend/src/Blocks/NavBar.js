import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../reducerActions'

function NavBar(props) {
if (props.editUser === false){
    if (props.connected === true){
        return (
            <div>
              <div className="navbar-welcome">
                <h1>Welcome {props.currentUser.user.username}</h1>
                <button className="navbar-buttons"><Link className="navbar-links" to={'/games'}>All Games</Link></button>
              </div>
              <div className="navbar-loggedin-buttons">
                <button className="navbar-buttons" ><a className="navbar-links" href={`/profile/${props.currentUser.user.id}`}>Your Profile</a></button>
                <button className="navbar-buttons" onClick={props.logOut}>Log Out</button>
              </div>
            </div>
        )
    }
    return (
        <div className="navbar-loggedout-buttons">
          <button className="navbar-buttons"><Link className="navbar-links" to={'/sign_in'}>Login</Link></button>
          <button className="navbar-buttons"><Link className="navbar-links" to={'/games'}>All Games</Link></button>
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