const defaultState = {
    isLoggedIn: false,
    users: [],
    hideNavBar: true,
    likes: 0
}

function reducer(prevState = defaultState, action){
    switch(action.type){
        case "togglenavbar":
            return {...prevState, hideNavBar: !prevState.hideNavBar}
        case "ADD":
            return {...prevState, likes: prevState.likes + 1}
        case "DELETE":
            return {...prevState, likes: prevState.likes - 10}
            
        case "formchange":
            console.log(action.payload.name, action.payload.newText)
            return {...prevState, [action.payload.name]: action.payload.newText}
        case "addUSERS":
            console.log(prevState.users.length)
            return {...prevState, users: [...prevState.users, prevState.username]}
        default:
            return prevState
    }
} 

// const defaultState = {
//     likes: 2000,
//     text: "",
//     darkMode: false,
//     thangs: [],
//     beef: "steak"
//   }

// export function addLike(){
//     return {type: "LIKE"}
//   }
  
//   export function removeLike(){
//     return {type: "DISLIKE"}
//   }
  
//   export function changeText(e){
//     return {
//       type: "CHANGE_TEXT",
//       payload: {newText: e.target.value, name: e.target.name}
//     }
//   }

//   function reducer(prevState = defaultState, action){
//     switch(action.type){
//       case "LIKE":
//         return {...prevState, likes: prevState.likes + 1}
//       case "DISLIKE":
//         return {...prevState, likes: prevState.likes - 1}
//       case "DARK_MODE":
//         return {...prevState, darkMode: !prevState.darkMode}
//       case "CHANGE_TEXT":
//         return {...prevState, [action.payload.name]: action.payload.newText}
//       case "ADD_THANG":
//         return {...prevState, thangs: [...prevState.thangs, prevState.text], text: ""}
//       default: 
//         return prevState
//     }
//   }
  
  
  export default reducer