import React, { useState } from 'react';
import profil_image from '../assets/img/images/profil_image/01.jpg'
import axios from 'axios';
import { NavLink } from 'react-router-dom'

const Profil_page = () => {
    axios.get(`http://localhost:5000/api/user`)
        .then(res => {
            const data = res.data
            const username = data[1]['pseudo']
            console.log(username)
        })
    return (

        <div>
            <div className="container_profil">
                <div className="container_profil_content">
                    <div className="container_profil_image">
                        <img src={profil_image} alt="" />
                    </div>
                    <div className="profil_text">
                        <div className="bio">
                            <h2>Bio :</h2>
                            <NavLink to="/bio" className="navlink">
                                <button className='edit_button'>Ajouter une bio</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default Profil_page;