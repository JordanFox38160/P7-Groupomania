import React, { useState, } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

const getToken = {
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
};

const Make_post = () => {
    // Ici on récupère l'userId dans le localstorage
    const userInfo = localStorage.getItem('userId')
    const pseudoData = localStorage.getItem('pseudoData')
    //Ici on parse ce que l'ont a récupéré dans le localstorage pour l'avoir au format JSON
    const userIdParse = JSON.parse(userInfo)
    //Ici on extrait l'ID du JSON
    const getUserId = userIdParse.userId

    const params = useParams();

    const postId = params.postId

    const [message, setmessage] = useState("");

    const posted = (req, res) => {
        Axios.patch('http://localhost:5000/api/post/comment-post/' + postId,
            {
                text: message,
                commenterId: getUserId,
                commenterPseudo: pseudoData,
            }, getToken,
            {
            }).then((res) => {
                window.location = "/Home";
            });

    };

    return (
        <section className="container_post_create">
            <h1>Votre réponse :</h1>
            <textarea className='contenu_input'
                maxLength={250}
                placeholder="Ecrivez votre contenu..."
                type="text"
                onChange={(e) => {
                    setmessage(e.target.value);
                }} />
            <button id='send_button' onClick={posted}>Envoyer !</button>
        </section>
    );
};

export default Make_post;