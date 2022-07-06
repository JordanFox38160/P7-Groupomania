import React from 'react';
import { NavLink } from 'react-router-dom'
import image from '../assets/img/icon-left-font-monochrome-white.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser, faMessage, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios';


const Navigation = () => {
    // Ici on récupère l'userId dans le localstorage
    const userInfo = localStorage.getItem('userId')

    //Ici on parse ce que l'ont a récupéré dans le localstorage pour l'avoir au format JSON
    const userIdParse = JSON.parse(userInfo)
    console.log(userIdParse)

    //Ici on extrait l'ID du JSON
    const getUserId = userIdParse.userId

    const getPseudo = userIdParse.pseudo
    console.log(getPseudo)

    Axios.get('http://localhost:5000/api/user/' + getUserId)
        .then(res => {
            const data = res.data
            const pseudoData = data.pseudo
            console.log(pseudoData)
        })
    return (
        <div className="navigation">
            <NavLink to="/Home" className="navlink">
                <div className="logo">
                    <img src={image} alt="" />
                </div>
            </NavLink>
            <div className="menu_icone">
                <NavLink to="/Home" className="navlink">
                    <FontAwesomeIcon className='menu_icone' icon={faHouse} />
                </NavLink>
                <NavLink to="/Profil/:id" className="navlink">
                    <div className="username">
                        <FontAwesomeIcon className='menu_icone' icon={faUser} />
                        <h1>{getPseudo}</h1>
                    </div>
                </NavLink>
                <NavLink to="/Portal" className="navlink">
                    <FontAwesomeIcon className='menu_icone' icon={faPowerOff} />
                </NavLink>
            </div>
        </div>
    );
};

export default Navigation;