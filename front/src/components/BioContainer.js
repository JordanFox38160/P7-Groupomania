import React, { useState } from 'react';
import Axios from 'axios';

const Bio_container = () => {
    const [bio, setBio] = useState("");

    // Ici on récupère l'userId dans le localstorage
    const userInfo = localStorage.getItem('userId')
    const pseudoData = localStorage.getItem('pseudoData')
    //Ici on parse ce que l'ont a récupéré dans le localstorage pour l'avoir au format JSON
    const userIdParse = JSON.parse(userInfo)
    //Ici on extrait l'ID du JSON
    const getUserId = userIdParse.userId

    const fetchBio = () => {
        Axios.put('http://localhost:5000/api/user/' + getUserId, {
            bio: bio
        })
            .then((res) => {
                window.location = "/Profil/" + getUserId;
            })
            .catch((err) => {
                console.log(err)
            })

    };

    return (
        <div className='bio_container'>
            <h1>Votre bio :</h1>
            <textarea className='bio_input'
                maxLength={57}
                placeholder="Ecrivez un titre..."
                type="text"
                onChange={(e) => {
                    setBio(e.target.value);
                }} />

            <button onClick={fetchBio}>Envoyer !</button>
        </div>
    );
};

export default Bio_container;