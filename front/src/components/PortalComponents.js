import React, { useState } from 'react';
import image from '../assets/img/icon-left-font-monochrome-white.svg'
import { NavLink } from 'react-router-dom'


const storage = () => {
    const myObject = {
        pseudo: " ",
        userId: 0,
    }

    window.localStorage.setItem("userId", JSON.stringify(myObject));
    let newObject = window.localStorage.getItem("userId");
    console.log(JSON.parse(newObject));
}



const PortalComponents = () => {
    storage()
    return (
        <div className="main">
            <div className="container">
                <img src={image} className="logo_portal" alt="" />
                <div className='title'>
                    <h1>Bienvenue sur le portail de Groupomania.</h1>
                    <h2>Veuillez vous inscrire ou vous connecter</h2>
                </div>
                <div className="button_portal">
                    <NavLink to="/connection"
                        className="navlink">
                        <li>Connexion</li>
                    </NavLink>
                    <NavLink to="/inscription"
                        className="navlink">
                        <li>Inscription</li>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};


export default PortalComponents;