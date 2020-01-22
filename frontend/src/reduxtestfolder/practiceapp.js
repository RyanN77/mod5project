import React from 'react';
import './App.css';

import { connect } from 'react-redux'
import { addLike, deleteLike, hideTheNav, formChange, addUser } from '../reducerActions'

function App(props) {

  const allUsers = () => {
    return props.users.map(user => {
      return <li>{user}</li>
    })
  }

  return (
    <div className="App">
      {props.hideNavBar === false ? <p>TEST</p> : <></> }
      <header className="App-header">
        <div>{props.likes}</div>
          <button onClick={props.likes === 10 ? props.deleteLike : props.addLike}>add a like</button>
          <button onClick={props.hideTheNav}>hide nav bar</button>
        <form onSubmit={props.addUser}>
        <input onChange={props.formChange} name="username" placeholder="username"></input>
        <input onChange={props.formChange} name="password" placeholder="password" type="password"></input>
        <input type="submit"/>
        </form>
        <ul>
          {allUsers()}
        </ul>
      </header>
    </div>
  );
}

function msp(state){
  return {
    isLoggedIn: state.isLoggedIn,
    users: state.users,
    hideNavBar: state.hideNavBar,
    likes: state.likes,
  }
}

const mdp = {
  addLike,
  deleteLike,
  hideTheNav,
  formChange,
  addUser,
}

export default connect(msp, mdp)(App);