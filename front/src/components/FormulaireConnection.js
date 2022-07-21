import React, { useState } from 'react';
import Axios from 'axios';
import image from '../assets/img/images/logo_png.png';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';

const FormulaireConnexion = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = (e) => {
        e.preventDefault();
        const errorsEmail = document.getElementsByClassName('errorsEmail')
        const errorsPassword = document.getElementsByClassName('errorsPassword')
        Axios.post('http://localhost:5000/api/user/connexion',
            {
                email: email,
                password: password,
            }, {

        })
            .then((response) => {

                //Set du token dans le storage
                const token = response.data.token
                localStorage.setItem('token', token)

                //Set de l'id de l'user dans le storage
                const userId = {
                    userId: response.data.userId,
                }
                localStorage.setItem('userId', JSON.stringify(userId))
                if (response.data.error) {
                    errorsEmail.innerText = response.data.error.email;
                    errorsPassword.innerText = response.data.error.password;
                } else {
                    window.location = "/Home";
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <main className="main">
            <img src={image} className="logo_png" alt="" />
            <section className="container_form">
                <div className="user">
                    <h2>Email :</h2>
                    <input className="champ-texte"
                        type="text"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                </div>
                <div className="errorsEmail"></div>
                <div className="user">
                    <h2>Mot de passe :</h2>
                    <input className="champ-texte"
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                </div>
                <div className="errorsPassword"></div>
                <div className="button_container">
                    <button onClick={login} className="bouton_connexion">Connexion !</button>
                    <NavLink to="/Portal" className="navlink">
                        <div className="button_return">
                            <button className="bouton_connexion"> <FontAwesomeIcon className='menu_icon' icon={faCircleArrowLeft} />Retour</button>
                        </div>
                    </NavLink>
                </div>
            </section>
        </main>
    );
};

export default FormulaireConnexion;