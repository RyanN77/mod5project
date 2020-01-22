import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { formChange, resetValues } from '../reducerActions'
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";

function GameInstance(props){
const key = ""
const [selectedGame, setSelectedGame] = useState({})
const [gameReviews, setGameReviews] = useState([])
const [reviewObject, setReviewObject] = useState({userhash:[]})
const [videos, setVideos] = useState([])
const [currentVideo, setCurrentVideo] = useState("")
const [flag, flagSet] = useState(false)

useEffect(() => {
    async function APIfetch(){
        const resp = await fetch(`http://localhost:3000/games/${props.match.params.id}`);
        resp.json().then(data => {setSelectedGame(data)})
    }
    APIfetch();
}, [])

useEffect(() => {
    loadVideos();
}, [selectedGame])

useEffect(() => {
    console.log(props.match)
    async function Reviewfetch(){
        const resp = fetch(`http://localhost:3000/filter_reviews/${props.match.params.id}`).then(resp => resp.json())
        .then(data => {
            console.log(data)
            setReviewObject(data)
        })
    }
    Reviewfetch()
}, [gameReviews])

useEffect(() => {
    flagSet(true);
}, [reviewObject])

const postReview = () => {
    fetch(`http://localhost:3000/reviews/`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                game_id: props.match.params.id,
                user_id: props.currentUser.user.id,
                content: props.review,
                rating: parseInt(props.rating),
            })
        }).then(resp => resp.json() )
    .then(data => {
        setGameReviews(data)
    }).catch(errors => {
        console.log(errors)
        //display error to the user
    })
}

const createLike = (e, info) => {
    console.log("clicking the button")
   
    if(info.likes.find(like => like.user_id === props.currentUser.user.id)){
        let obj = info.likes.find(like => like.user_id === props.currentUser.user.id)
        // console.log(obj)
        deletevote(obj.id).then(() => { 
            if (e === "up"){
                upvote(info.review_id)
            } else if (e === "down"){
                downvote(info.review_id)
            }
         })
    } else {
        if (e === "up"){
            upvote(info.review_id)
        } else if (e === "down"){
            downvote(info.review_id)
        }
    }


}

const deletevote = (id) => {
    return fetch(`http://localhost:3000/likes/${id}`, {
        method: "DELETE"
        }).then(likecreate => {
        console.log("successfully deleted")
    })
}

const upvote = (reviewID) => {
    fetch(`http://localhost:3000/likes/`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        },
        body: JSON.stringify({
            user_id: props.currentUser.user.id,
            review_id: reviewID,
            upvote: true,
            downvote: false
            })
        }).then(res => res.json()).then(likecreate => {
        console.log("successfully created upvote")
    })
}

const downvote = (reviewID) => {
    fetch(`http://localhost:3000/likes/`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        },
        body: JSON.stringify({
            user_id: props.currentUser.user.id,
            review_id: reviewID,
            upvote: false,
            downvote: true
            })
        }).then(res => res.json()).then(likecreate => {
         console.log("successfully created downvote")
    })
}

const loadVideos = () => {
    fetch("https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/game_videos", {
        method: 'POST',
        headers: {
          'Content-Type': "application/application-json",
          'user-key': key // insert key here
        },
        body: `fields name, video_id; where game=${selectedGame.game_reference};`
}).then(resp => resp.json()).then(somedata => {
    setVideos(somedata)
  })
}

// const ratingAverageColors = (rating) => {
//     switch(rating) {
//         case (rating <= 100):
//             backgroundColor: darkgreen
//     }
// }

console.log(selectedGame)
console.log(videos)
    return (
        <>
            <h1>{selectedGame.name}</h1>
            <p className="game-summary">{selectedGame.summary}</p>
            {
                  props.connected === true ?
                  videos &&
                  <iframe width="1120" height="630" src={`https://www.youtube.com/embed/${currentVideo}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  : 
                  <h1>You must be logged in to view videos.</h1>
                }
                <br />
                <div className="videos-container">
                  {
                    videos.length > 0 &&
                    <>
                      {
                        videos.map(video => (
                          <span onClick={() => {
                            setCurrentVideo(video.video_id)
                          }}><img className="videos" src={`https://img.youtube.com/vi/${video.video_id}/default.jpg`} /></span>
                        ))
                      }
                    </>
                  }
                </div>
            {reviewObject.total_reviews === 0 || reviewObject.userhash.length === 0 ? 
            <h4 className="reviews">Reviews: 0 Average Rating: 0</h4>
            :
            <>
            <h4 className="reviews">Reviews: {reviewObject.total_reviews} Average Rating:<span >{reviewObject.total_rating}</span></h4>
            {flag ? reviewObject.userhash.map(info => {
                console.log(info)
                return <div className="reviews-container">
                <h2 className="reviews-info">Created by:<Link className="reviews-user" to={`/profile/${info.user_id}`}>{info.username}</Link></h2>
                <h4 className="reviews-info">Rating: {info.rating}/100</h4>
                <p className="reviews-info">{info.content}</p>
                {props.connected === true ?
                    <div className="reviews-vote">
                        <button className="reviews-button" id="upvote" onClick={() => createLike('up', info)}><FaRegThumbsUp/></button>
                        <h5>{info.likes.filter(like => like.upvote === true).length}</h5>
                        <button className="reviews-button" id="downvote" onClick={() => createLike('down', info)}><FaRegThumbsDown/></button>
                        <h5>{info.likes.filter(like => like.upvote === false).length}</h5>
                    </div>
                    : 
                    null}
                </div>
            }) : null }
            </>
            }
            {props.connected === true ? 
            <>
                <h2 >Write a Review for {selectedGame.name}!</h2>
                    <form onSubmit={postReview}>
                        <h2>Rating: </h2>
                        <input name="rating" onChange={(e) => props.formChange(e)}></input>
                        <h2>Review:</h2>
                        <textarea name="review" onChange={(e) => props.formChange(e)}></textarea>
                        <input type="submit"></input>
                    </form>
            </>
            : null }
        </>
    )
}

function msp(state){
    return {
      connected: state.connected,
      currentUser: state.currentUser,
      rating: state.rating,
      review: state.review,
    }
  }

  const mdp = {
    formChange,
    resetValues
  }

export default connect(msp, mdp)(GameInstance);
