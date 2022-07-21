import React, { useState } from 'react';
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

    const [message, setmessage] = useState("");
    const [title, setTitle] = useState("");

    const posted = (req, res) => {
        console.log(req.file)
        Axios.post('http://localhost:5000/api/post/',
            {
                message: message,
                title: title,
                userId: getUserId,
                pseudo: pseudoData,
                // picture: req.file.image,
            }, getToken,
            {
            }).then((res) => {
                window.location = "/Home";
            });

    };

    return (
        <section className="container_post_create">

            <h1>Votre titre :</h1>
            <textarea className='title_input '
                maxLength={54}
                placeholder="Ecrivez votre contenu..."
                type="text"
                onChange={(e) => {
                    setTitle(e.target.value);
                }} />

            <h1>Votre contenu :</h1>
            <textarea className='contenu_input'
                maxLength={250}
                placeholder="Ecrivez votre contenu..."
                type="text"
                onChange={(e) => {
                    setmessage(e.target.value);
                }} />

            <button onClick={posted}>Envoyer !</button>
        </section>
    );
};

export default Make_post;