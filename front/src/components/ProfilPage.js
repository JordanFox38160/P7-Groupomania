import React from 'react';
import profil_image from '../assets/img/images/profil_image/01.jpg'
import axios from 'axios';
import { NavLink, } from 'react-router-dom'

const Profil_page = () => {
    // Ici on récupère l'userId dans le localstorage
    const userInfo = localStorage.getItem('userId')

    //Ici on parse ce que l'ont a récupéré dans le localstorage pour l'avoir au format JSON
    const userIdParse = JSON.parse(userInfo)
    //Ici on extrait l'ID du JSON
    const getUserId = userIdParse.userId

    const getPseudo = userIdParse.pseudo

    //Récupération des information
    axios.get(`http://localhost:5000/api/user/` + getUserId)
        .then(res => {
            const data = res.data
            const pseudoData = data.pseudo

            const pseudo = document.querySelector('.pseudo_profil')
            pseudo.innerText = pseudoData
        })

    const deleteUser = () => {
        //Suppresion du compte
        axios.delete(`http://localhost:5000/api/user/` + getUserId)
            .then(
                alert('Compte supprimé'),
                window.location = "/Portal"
            )
    }
    return (
        <div className='profil_main'>
            <div className="container_profil">
                <div className="container_profil_content">
                    <div className="profil_user">
                        <h1 className="pseudo_profil"></h1>
                        <img className='container_profil_image' src={profil_image} alt="" />
                        <button onClick={deleteUser}>Supprimer le compte</button>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default Profil_page;