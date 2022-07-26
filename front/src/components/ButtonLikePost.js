import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const getToken = {
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
};

const like = (event, props) => {
    console.log(props);
    // Ici on récupère l'userId dans le localstorage
    const userInfo = localStorage.getItem('userId')
    //Ici on parse ce que l'ont a récupéré dans le localstorage pour l'avoir au format JSON
    const userIdParse = JSON.parse(userInfo)
    //Ici on extrait l'ID du JSON
    const getUserId = userIdParse.userId
    const postId = event.target.closest('.message-container').id
    axios.post('http://localhost:5000/api/post/likes/' + postId, {
        userId: getUserId,
        like: 1,
    }, getToken,
    ).then(() => {
        window.location.reload();
    })

}

const buttonLikePost = (props) => {
    return (
        <main className='like_button'>
            <button>
                <FontAwesomeIcon onClick={(event) => { like(event, props) }} className='like_icone' icon={faThumbsUp} />
            </button>
            <p className='likeNumber'>{props.usersLikes.length}</p>
        </main>
    )

};

export default buttonLikePost;