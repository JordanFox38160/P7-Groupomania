import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import { useParams } from 'react-router-dom';

const getToken = {
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
};


const ModifyContainer = () => {

    const [message, setmessage] = useState("");
    const [title, setTitle] = useState("");
    const [file, setFile] = useState();
    const [postPicture, setPostPicture] = useState()

    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    useEffect(() => {
        Axios.get('http://localhost:5000/api/post/' + postId)
            .then(response => {
                const data = response.data;
                setTitle(() => data.title)
                setmessage(() => data.message)
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
    const handlePost = () => {
        if (message || postPicture) {
            const postData = new FormData();
            postData.append('message', message);
            postData.append('title', title);
            postData.append('userId', getUserId);
            postData.append('pseudo', pseudoData);
            postData.append('file', file);

            Axios.put('http://localhost:5000/api/post/' + postId, postData, getToken)
                .then((res) => {
                    window.location = "/Home";
                });
        } else {
            alert("Veuillez entrer un message")
        }
    }

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
            <input type="file" id="file-upload" name="file" accept='.jpg, .jpeg, .png' onChange={(e) => handlePicture(e)} />
            <img className='picture-upload' src={postPicture} alt="" />
            <button onClick={handlePost}>Envoyer !</button>
        </section>
    );
};

export default ModifyContainer;