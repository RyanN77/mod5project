import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Gamelist(props) {

const [arrayOfGames, setArrayOfGames] = useState([])
const [filteredArrayOfGames, setFilteredArrayOfGames] = useState([])

useEffect(() => {
    const abortController = new AbortController();

    async function APIfetch(){
        const resp = await fetch("http://localhost:3000/games", {
            signal: abortController.signal 
        }).catch() 
        resp.json().then(data => {
                setArrayOfGames(data)
                setFilteredArrayOfGames(data)
            }
        )
    }
    APIfetch();
}, [])

const followGame = (e) => {
    fetch("http://localhost:3000/follows", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            user_id: props.currentUser.user.id,
            game_id: e.target.id
        })
    }).then(resp => resp.json()).then(successfullyadded => {
        console.log("followed a game")
        window.location.reload()
    })
}

const unfollowGame = (gameID, userID) => {
    let selectedGame = arrayOfGames.filter(gameInstance => { return gameInstance.id === gameID })
    let selectedGameId = selectedGame[0].follows.filter(follows => { return follows.user_id === userID})
    console.log(selectedGameId[0].id)
    fetch(`http://localhost:3000/follows/${selectedGameId[0].id}`, {
        method: "DELETE",
    }).then(successfullydeleted => {
        console.log("deleted a game")
        window.location.reload()
    })
}

const filterGames = (e) => {
    setFilteredArrayOfGames(arrayOfGames.filter(game => {return game.name.includes(e.target.value)}))
}

const divStyle1 = {
    backgroundColor: 'green',
    border: '2px solid blue'
};
const divStyle2 = {
    backgroundColor: 'red'
};

// const changeBackgroundColor = () => {
//     if (filteredArrayOfGames.length === 0){
//         return divStyle2
//     } else
//     return divStyle1
// }

console.log(arrayOfGames)
console.log(filteredArrayOfGames)
return (
    <div>
        <h2 className="searchbar">Search Games: <input className="search" style={filteredArrayOfGames.length === 0 ? divStyle2 : divStyle1} onChange={(e) => filterGames(e)}></input></h2>
        {filteredArrayOfGames.map(game => {
        return (
            <div className="gamelist-info-container">
                <img className="gamelist-img" src={game.cover_url}></img>
                <div className="gamelist-info">
                <h1><Link className="gamelist-titles" to={`/games/${game.id}`}>{game.name}</Link></h1>
                <p className="gamelist-summary">{game.summary}</p>
                    <div className="follows-container">
                        <h4 className="follows">People Following: {game.follows.length}</h4>
                            {props.connected ? 
                                <div>
                                {game.follows.length === 0 ? 
                                    <button className="follow-buttons" id={game.id} onClick={(e) => followGame(e)}>Follow</button> 
                                    : 
                                        <>
                                            {game.follows.includes(game.follows.find(obj => obj.user_id === props.currentUser.user.id ))  
                                            // follow.user_id === props.currentUser.user.id 
                                            ? 
                                            <button className="follow-buttons" id={game.id} onClick={() => unfollowGame(game.id, props.currentUser.user.id)}>Unfollow</button> 
                                            :
                                            <button className="follow-buttons" id={game.id} onClick={(e) => followGame(e)}>Follow</button> }
                                        </>
                                }   
                            </div>
                            :
                            null
                            }
                        </div>
                    </div>
                </div>
        )
    })}</div>
    )
    
}

function msp(state){
    return {
      connected: state.connected,
      currentUser: state.currentUser
    }
  }
  
  export default connect(msp)(Gamelist);