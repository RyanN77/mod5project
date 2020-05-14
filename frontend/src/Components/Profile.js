import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetValues, logOut, editUserInfo, updateUserInfo, editUserFormChange, revertChange } from '../reducerActions'

function Profile(props){

const [userInfo, setUserInfo] = useState({})
const [gameData, setGameData] = useState([])

async function userFetch(){
  console.log(props.match)
  const resp = await fetch(`http://localhost:3000/users/${props.match.params.id}`);
  resp.json().then(data => {
    // info i would be getting to display on dom
    setUserInfo(data)
  })
}

const followFetch = async () => {
  const resp = await fetch(`http://localhost:3000/follows/${props.match.params.id}`);
  resp.json().then(data => {
    console.log(data)
    const gameIds = data.map(item => {
      return item.game_id
    })
    const responses = gameIds.map(theId => {
      return fetch(`http://localhost:3000/games/${theId}`).then(results => results.json()).then(data => data)
    })
    const allPromises = Promise.all(responses).then(t => {
      setGameData(t)
    })
  })
}

useEffect(() => {
  userFetch()
  followFetch()
}, [gameData])

const updateUser = () => {
    fetch(`http://localhost:3000/users/${props.match.params.id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      username: props.currentUser.user.username,
      bio: props.currentUser.user.bio,
      img_url: props.currentUser.user.img_url
    })
  }).then(resp => resp.json()).then(update => {
    updateUserInfo(update)
    userFetch();
  })
}

const deleteAccount = () => {
  fetch(`http://localhost:3000/users/${props.match.params.id}` , {
    method: "DELETE"
  }).then(() => {
    props.logOut()
    props.history.push('/games')
  })
}

  return ( 
    <>
    {props.editUser === true ? 
      <div className="profile-edit-main-container">
        <form className="profile-edit-container" onSubmit={updateUser}>
          <div className="profile-fields-container">
            <h3>Image URL:</h3>
            <input className="profile-fields" name="img_url" value={props.currentUser.user.img_url} onChange={(e) => props.editUserFormChange(e)}></input>
          </div>
          <div className="profile-fields-container">
            <h3>Username:</h3>
            <input className="profile-fields" name="username" value={props.currentUser.user.username} onChange={(e) => props.editUserFormChange(e)}></input>
          </div>
          <div className="profile-fields-container">
            <h3>Bio:</h3>
            <input className="profile-fields" name="bio" value={props.currentUser.user.bio} onChange={(e) => props.editUserFormChange(e)}></input>
          </div>
          <div className="profile-form">
            <input className="profile-form-options" type="submit"></input>
            <button className="profile-form-options" onClick={() => props.revertChange(userInfo)}>Go Back</button>
          </div>
        </form>
      </div>
    : 
    <div className="profile-box">
        <div className="profile-info">
          <div className="profile-image-info">
            <img className="profile-image" src={userInfo.img_url} onError={(e) => {return e.target.onerror != 'https://www.evolvefish.com/assets/images/Decals/EF-VDC-00035(Black).jpg' ? e.target.src="https://www.evolvefish.com/assets/images/Decals/EF-VDC-00035(Black).jpg": e.target.src }}></img>
              <div className="profile-main-info">
                <h3 className="profile-username">{userInfo.username}</h3>
                <p className="profile-bio">{userInfo.bio}</p>
              </div>
            </div>
          <div className="profile-follows">
          <h4>Games Following:</h4> 
            {gameData.map(game => {
              return (
                <>
                  <div><Link className="profile-titles" to={`/games/${game.id}`}>{game.name}</Link></div>
                </>
              )
            })}  
              {props.currentUser.user ? parseInt(props.currentUser.user.id) === parseInt(props.match.params.id) ? 
                <div className="profile-buttons-container">
                  <button className="profile-buttons" onClick={() => props.editUserInfo(props.currentUser.user)}>EDIT PROFILE</button>
                  {/* EDITINFOBUTTON SHOULD USE THAT INFO TO UPDATE DOM WHEN SUBMIT SAVE IT  */}
                  <button className="profile-buttons" onClick={deleteAccount}>DELETE PROFILE</button>
                </div>
              : null
            : null} 
          </div>
        </div>

    </div>
    }
    </>
  ) 
}

function msp(state){
  return {
    connected: state.connected,
    currentUser: state.currentUser,
    username: state.username,
    bio: state.bio,
    img_url: state.img_url,
    editUser: state.editUser
  }
}

const mdp = {
  resetValues,
  logOut,
  editUserInfo,
  updateUserInfo,
  editUserFormChange,
  revertChange
}

export default connect(msp, mdp)(Profile);