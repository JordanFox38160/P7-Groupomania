import React, { useState } from 'react';
import Axios from 'axios';
import { NavLink } from 'react-router-dom'
import image from '../assets/img/images/logo_png.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";


const FormulaireInscription = () => {

    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const register = (e) => {
        e.preventDefault();
        const errorsPseudo = document.getElementsByClassName('errorsPseudo')
        const errorsEmail = document.getElementsByClassName('errorsEmail')
        const errorsPassword = document.getElementsByClassName('errorsPassword')
        Axios.post('http://localhost:5000/api/user/inscription', {
            pseudo: pseudo,
            email: email,
            password: password,
        }).then((response) => {
            console.log(response)
            if (response.data.errors) {
                errorsEmail.innerText = response.data.errors.email;
                errorsPseudo.innerText = response.data.errors.pseudo;
                errorsPassword.innerText = response.data.errors.password;
            } else {
                window.location = "/connection";
            }
        })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <main className='main'>
            <img src={image} className="logo_png" alt="" />
            <section className="container_form">
                <div className="user">
                    <h2>Nom d'utilisateur :</h2>
                    <input
                        className="champ-texte"
                        type="text"
                        onChange={(e) => {
                            setPseudo(e.target.value);
                        }} />
                </div>
                <div className="errorsPseudo"></div>
                <div className="user">
                    <h2>Email :</h2>
                    <input
                        className="champ-texte"
                        type="text"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                </div>
                <div className="errorsEmail"></div>
                <div className="user">
                    <h2>Mot de passe :</h2>
                    <input
                        className="champ-texte"
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                </div>
                <div className="errorsPassword"></div>
                <div className="button_container">
                    <button onClick={register} className="bouton_connexion">Connexion !</button>
                    <NavLink to="/Portal" className="navlink">
                        <div className="button_return">
                            <button className="bouton_connexion"> <FontAwesomeIcon className='menu_icon' icon={faCircleArrowLeft} />Retour</button>
                        </div>
                    </NavLink>
                </div>
            </section>
        </main>
    );
}

export default FormulaireInscription;