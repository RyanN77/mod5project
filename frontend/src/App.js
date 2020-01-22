import React, {useState,useEffect} from "react";
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
  const navBar = <NavBar />
  console.log(props)

    return (
      <BrowserRouter>
        <Switch>

          <Route path="/profile/:id" render={(props) => <><NavBar /><Profile {...props} /></>}/>
          <Route path="/games/:id" render={(props) => <>{navBar}<GameInstance {...props} /></>}/>
          <Route path="/games" render={(props) => <>{navBar}<Gamelist {...props}/></>}/>
          <Route path="/sign_in" render={(props) => <SignIn {...props}/>}/>

        </Switch>
      </BrowserRouter>
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

// export default connect(msp, mdp)(App);
export default connect(msp, mdp)(App);

// componentDidMount() {
//   this.loginStatus()
// }

// loginStatus = () => {
//   fetch('http://localhost:3000/logged_in', {
//     credentials: 'include'
//   }).then(resp => resp.json()).then(loginInfo => {
//     this.setState({
//       isLoggedIn: loginInfo.logged_in,
//       user: loginInfo.user
//     })
//   })
// }

