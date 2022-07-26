import React, { useState } from 'react';
import Axios from 'axios';
let i = 0;
const getToken = {
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
};

const MakePost = () => {
    // Ici on récupère l'userId dans le localstorage
    const userInfo = localStorage.getItem('userId')
    const pseudoData = localStorage.getItem('pseudoData')
    //Ici on parse ce que l'ont a récupéré dans le localstorage pour l'avoir au format JSON
    const userIdParse = JSON.parse(userInfo)

    //Ici on extrait l'ID du JSON
    const getUserId = userIdParse.userId

    const [message, setmessage] = useState("");
    const [title, setTitle] = useState("");
    const [file, setFile] = useState();
    const [postPicture, setPostPicture] = useState()

    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    const handlePost = () => {
        if (message || postPicture) {
            const postData = new FormData();
            postData.append('message', message);
            postData.append('title', title);
            postData.append('userId', getUserId);
            postData.append('pseudo', pseudoData);
            postData.append('file', file);

            Axios.post('http://localhost:5000/api/post/', postData, getToken)
                .then((res) => {
                    window.location = "/Home";
                });
        } else {
            alert("Veuillez entrer un message")
        }
    }
    console.log(file)
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
            <input type="file" id="file-upload" name="file" accept='.jpg, .jpeg, .png' onChange={(e) => handlePicture(e)} />
            <img src={postPicture} alt="" />
            <button onClick={handlePost}>Envoyer !</button>
        </section>
    );
};

export default MakePost;