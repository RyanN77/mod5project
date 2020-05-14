import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { formChange, resetValues } from '../reducerActions'
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";

function GameInstance(props){
const key = "212cf785360204cbbb042d1357e8ae5f"
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
        window.location.reload()
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
         window.location.reload()
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

console.log(props.currentUser.user)
console.log(selectedGame)
console.log(videos)

    return (
        <>
            <h1 className="gameinstance-titles">{selectedGame.name}</h1>
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
            <h5 className="reviews">Reviews: 0 Average Rating: 0</h5>
            :
            <>
            <h4 className="reviews">Reviews: {reviewObject.total_reviews} Average Rating:<span style={
                reviewObject.total_rating > 90 ? {color: "darkgreen"} :
                reviewObject.total_rating > 80 ? {color: "green"} : 
                reviewObject.total_rating > 70 ? {color: "lightgreen"} : 
                reviewObject.total_rating > 60 ? {color: "yellowgreen"} : 
                reviewObject.total_rating > 50 ? {color: "yellow"} : 
                reviewObject.total_rating > 40 ? {color: "goldenrod"} : 
                reviewObject.total_rating > 30 ? {color: "orange"} : 
                reviewObject.total_rating > 20 ? {color: "darkorange"} : 
                reviewObject.total_rating > 10 ? {color: "yellowred"} : {color: "red"} 
                }>{reviewObject.total_rating}</span></h4>
            {flag ? reviewObject.userhash.map(info => {
                return <div className="reviews-container">
                    {console.log(reviewObject)}
                <h2 className="reviews-info">Created by:<Link className="reviews-user" to={`/profile/${info.user_id}`}><img className="review-img" style={{height: "25px", width: "25px"}}src={info.img_url} onError={(e) => {return e.target.onerror != 'https://www.evolvefish.com/assets/images/Decals/EF-VDC-00035(Black).jpg' ? e.target.src="https://www.evolvefish.com/assets/images/Decals/EF-VDC-00035(Black).jpg": e.target.src }}></img>{info.username}</Link></h2>
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
            <div className="reviews-form-container">
                <h2>Write a Review for<span className="gameinstance-titles">{selectedGame.name}</span>!</h2>
                    <form onSubmit={postReview}>
                        <div className="review-rating-container">
                            <h3>Rating: 
                            <input className="review-rating-box" name="rating" onChange={(e) => props.formChange(e)}></input>/100</h3>
                        </div>
                        <div className="review-content-container">
                            <h3>Review: </h3>
                            <div>
                            <textarea className="review-content-box" name="review" onChange={(e) => props.formChange(e)}></textarea>
                            <br></br>
                            <input className="review-content-submit" type="submit"></input>
                            </div>
                        </div>
                        
                    </form>
            </div>
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
