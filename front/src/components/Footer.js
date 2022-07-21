import React from 'react';
import { NavLink } from 'react-router-dom'
import image from '../assets/img/icon-left-font-monochrome-white.svg'

const footer = () => {
    const disconnected = () => {
        const deleteToken = localStorage.removeItem('token');
        const deleteData = localStorage.removeItem('pseudoData');
    }
    return (
        <footer className="footer_container">
            <section className="logo_footer">
                <img src={image} alt="" />
            </section>
            <ul className='ul_footer'>
                <NavLink to="/Home" className="navlink">
                    <li>Accueil</li>
                </NavLink>
                <NavLink to="/Portal" className="navlink">
                    <li>Portail</li>
                </NavLink>
                <NavLink to="/Portal" onClick={disconnected} className="navlink">
                    <li>Deconnexion</li>
                </NavLink>
            </ul>
        </footer >
    );
};

export default footer;