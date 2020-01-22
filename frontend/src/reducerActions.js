export function addLike(){
    return {type: "ADD"}
  }

export function formChange(e){
    return {type: "formchange", payload: {newText: e.target.value, name: e.target.name}}
  }

export function editUserFormChange(e){
  return {type: "userformchange", payload: {newText: e.target.value, name: e.target.name}}
}

export function resetValues(){
    return {type: "resetvalue" }
  }

export function successfulLogin(user){
    // console.log(user)
    return {type: "success", payload: {userObj: user}}
  }

export function setUser(user){
    // console.log(user)
    return {type: "success", payload: {userObj: user}}
  }   

export function logOut(){
    return {type: "logout"}
  } 

export function editUserInfo(info){
  return {type: "edit", payload: {userInfo: info}}
  // return {type: "edit", payload: {userInfo: info}}
  }

export function updateUserInfo(info){
    return {type: "update", payload: {userInfo: info}}
  }

export function revertChange(info){
    return {type: "revert", payload: {userInfo: info}}
  }