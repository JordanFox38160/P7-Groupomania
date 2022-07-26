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
    //Ici on extrait l'ID du JSON
    const getUserId = userIdParse.userId

    const getPseudo = userIdParse.pseudo

    Axios.get('http://localhost:5000/api/user/' + getUserId)
        .then(res => {
            const data = res.data
            const pseudoData = data.pseudo
            localStorage.setItem('pseudoData', (pseudoData))

            const pseudo = document.querySelector('.pseudo')
            pseudo.innerText = pseudoData
        })

    const disconnected = () => {
        const deleteToken = localStorage.removeItem('token');
        const deleteData = localStorage.removeItem('pseudoData');
    }

    return (
        <header className="navigation">
            <NavLink to="/Home" className="navlink">
                <div className="logo">
                    <img className='logo_image' src={image} alt="" />
                </div>
            </NavLink>
            <nav className="menu_icone">
                <NavLink to="/Home" className="navlink">
                    <FontAwesomeIcon className='menu_icone' icon={faHouse} />
                </NavLink>
                <NavLink to={'/Profil/' + getUserId} className="navlink">
                    <div className="username">
                        <FontAwesomeIcon className='menu_icone' icon={faUser} />
                        <h1 className='pseudo'>{getPseudo}</h1>
                    </div>
                </NavLink>
                <NavLink to="/Portal" className="navlink">
                    <FontAwesomeIcon className='menu_icone' onClick={disconnected} icon={faPowerOff} />
                </NavLink>
            </nav>
        </header>
    );
};

export default Navigation;