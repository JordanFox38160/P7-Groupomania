import React, { useState } from 'react';
import Axios from 'axios';

const Bio_container = () => {
    const [bio, setBio] = useState("");

    const fetchBio = () => {
        Axios.put('http://localhost:5000/user/me', {
            bio: bio
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