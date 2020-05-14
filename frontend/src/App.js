import React, {useState, useEffect} from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import { connect } from 'react-redux'
import { addLike, formChange, resetValues, setUser } from './reducerActions'

import NavBar from './Blocks/NavBar'
import Gamelist from './Components/Gamelist';
import SignIn from './Components/signInForm';
import Profile from './Components/Profile';
import GameInstance from './Components/GameInstance'

function App(props) {

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/profile/:id" render={(props) => <><NavBar {...props}/><Profile {...props} /></>}/>
          <Route path="/games/:id" render={(props) => <><NavBar {...props}/><GameInstance {...props} /></>}/>
          <Route path="/games" render={(props) => <><NavBar {...props}/><Gamelist {...props}/></>}/>
          <Route path="/sign_in" render={(props) => <><SignIn {...props}/></>}/>
          <Route path="/" render={Video}/>
        </Switch>
      </BrowserRouter>
    )
  
}

export function Video(){
  console.log("video")
  return (
    <video autoPlay muted loop id="myvideo" src="video.mp4" type="video/mp4">
      VIDEO NOT SUPPORTED
    </video>
  )
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
  addLike,
  formChange,
  resetValues,
  setUser
}

export default connect(msp, mdp)(App);



