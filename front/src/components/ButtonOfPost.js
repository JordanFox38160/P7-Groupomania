import React from 'react';
import { NavLink } from 'react-router-dom'
import Axios from 'axios'

const modifyPost = (event) => {
    const postId = event.target.closest('.message-container').id
    Axios.get('http://localhost:5000/api/post/' + postId)
        .then(response => {
            const data = response.data
            const userId = data.userId


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


const deleteFonction = (event) => {
    const postId = event.target.closest('.message-container').id
    Axios.get('http://localhost:5000/api/post/' + postId)
        .then(response => {
            const data = response.data
            const userId = data.userId


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
        <section className="button_post">
            <NavLink to={'/CreateComment/' + props.postId} className="navlink">
                <button id='comment_button'>Commenter</button>
            </NavLink>
            <button onClick={modifyPost} id='modif_button'>Modifier</button>
            <button onClick={deleteFonction} id='delete'>Supprimer</button>
        </section>
    );
};


export default ButtonCreatePost;