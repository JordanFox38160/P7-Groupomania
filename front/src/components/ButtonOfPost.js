import React from 'react';
import { NavLink } from 'react-router-dom'
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

const getPostId = (event) => {
    const postId = event.target.closest('.message-container').id
    console.log(postId)
}

const modifyPost = (event) => {
    const postId = event.target.closest('.message-container').id
    Axios.get('http://localhost:5000/api/post/' + postId)
        .then(response => {
            const data = response.data
            const userId = data.userId
            console.log(userId)

            const getStorageId = localStorage.getItem('userId')
            const getStorageIdParse = JSON.parse(getStorageId)
            const userIdStorage = getStorageIdParse.userId

            Axios.get('http://localhost:5000/api/user/' + userIdStorage)
                .then(response => {
                    const data = response.data
                    const isAdmin = data.admin

                    if (userId == userIdStorage || isAdmin == true) {
                        window.location = '/ModifyPost/' + postId
                    } else {
                        alert('Vous ne pouvez pas modifier ce post')
                    }
                })
        })
}


const delete_fonction = (event) => {
    const postId = event.target.closest('.message-container').id
    Axios.get('http://localhost:5000/api/post/' + postId)
        .then(response => {
            const data = response.data
            const userId = data.userId
            console.log(userId)

            const getStorageId = localStorage.getItem('userId')
            const getStorageIdParse = JSON.parse(getStorageId)
            const userIdStorage = getStorageIdParse.userId

            Axios.get('http://localhost:5000/api/user/' + userIdStorage)
                .then(response => {
                    const data = response.data
                    const isAdmin = data.admin

                    if (userId == userIdStorage || isAdmin == true) {
                        Axios.delete('http://localhost:5000/api/post/' + postId,
                            { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
                            .then(
                                alert('Post supprimer !'),
                                window.location = "/Home"
                            )
                            .catch(err)
                        console.log(err)

                    } else {
                        alert('Vous ne pouvez pas supprimer ce post')
                    }
                })
        })

}


const ButtonCreatePost = (props) => {
    return (
        <div className="button_post">
            <NavLink to={'/CreateComment/' + props.postId} className="navlink">
                <button onClick={getPostId} id='comment_button'>Commenter</button>
            </NavLink>
            <button onClick={modifyPost} id='modif_button'>Modifier</button>
            <button onClick={delete_fonction} id='delete'>Supprimer</button>
        </div>
    );
};


export default ButtonCreatePost;