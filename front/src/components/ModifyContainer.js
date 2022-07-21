import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import { useParams } from 'react-router-dom';

const getToken = {
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
};


const ModifyContainer = () => {

    const [message, setmessage] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        Axios.get('http://localhost:5000/api/post/' + postId)
            .then(response => {
                const data = response.data;
                setTitle(() => data.title)
                setmessage(() => data.message)
                console.log(response)
            })
    }, [])


    const params = useParams();
    const postId = params.postId;

    // Ici on récupère l'userId dans le localstorage
    const userInfo = localStorage.getItem('userId')
    const pseudoData = localStorage.getItem('pseudoData')
    //Ici on parse ce que l'ont a récupéré dans le localstorage pour l'avoir au format JSON
    const userIdParse = JSON.parse(userInfo)

    //Ici on extrait l'ID du JSON
    const getUserId = userIdParse.userId
    const posted = (req, res) => {
        console.log(title.length)
        console.log(message.length)
        Axios.put('http://localhost:5000/api/post/' + postId,
            {
                message: message,
                title: title,
                userId: getUserId,
                pseudo: pseudoData,
            }, getToken,
            {
            }).then((res) => {
                window.location = "/Home";
            });

    };

    return (
        <section className="container_post_create">
            <h1>Votre titre :</h1>
            <input className='title_input '
                maxLength={150}
                placeholder="Ecrivez votre contenu..."
                type="text"
                defaultValue={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                }} />

            <h1>Votre contenu :</h1>
            <textarea className='contenu_input'
                maxLength={250}
                placeholder="Ecrivez votre contenu..."
                type="text"
                defaultValue={message}
                onChange={(e) => {
                    setmessage(e.target.value);
                }} />

            <button onClick={posted}>Envoyer !</button>
        </section>
    );
};

export default ModifyContainer;