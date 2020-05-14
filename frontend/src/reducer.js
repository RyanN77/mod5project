const defaultState = {
    connected: false,
    currentUser: [],
    addReview: false,
    editUser: false,

    username: "",
    password: "",
    bio: "",
    img_url: "",
    rating: "",
    review: "",
}

function reducer(prevState = defaultState, action){
    console.log('action', action)
    switch(action.type){
        case "userformchange":
            return {...prevState, currentUser: {...prevState.currentUser, user: {...prevState.currentUser.user, [action.payload.name]: action.payload.newText}}}
        case "formchange":
            return {...prevState, [action.payload.name]: action.payload.newText}
        case "resetvalue":
            return {...prevState, editUser: false, username: "", password: "", bio: "", img_url: "", rating: "", review: ""}
        case "success":
            return {...prevState, connected: true, currentUser: action.payload.userObj}
        case "logout":
            return {...prevState, connected: false, currentUser: []}
        case "edit":
            return {...prevState, editUser: true}
        case "update":
            return {...prevState, currentUser: {...prevState.currentUser, user: {...prevState.currentUser.user, username: action.payload.userInfo.username, bio: action.payload.userInfo.bio, img_url: action.payload.userInfo.img_url}}}
        case "revert":
            return {...prevState, currentUser: {...prevState.currentUser, user: {...prevState.currentUser.user, username: action.payload.userInfo.username, bio: action.payload.userInfo.bio, img_url: action.payload.userInfo.img_url}}}
        default:
            return prevState
    }
} 

export default reducer