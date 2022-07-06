import React from 'react';
import { NavLink } from 'react-router-dom'
import image from '../assets/img/icon-left-font-monochrome-white.svg'

const footer = () => {
    return (
        <div className="footer_container">
            <div className="logo_footer">
                <img src={image} alt="" />
            </div>
            <ul className='ul_footer'>
                <li>Accueil</li>
                <li>Portail</li>
                <li>Deconnexion</li>
            </ul>
        </div>
    );
};

export default footer;