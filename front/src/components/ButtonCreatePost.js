import React from 'react';
import { NavLink } from 'react-router-dom'
import Axios from 'axios';


const buttonCreatePost = (props) => {
    const getAdmin = localStorage.getItem('admin')
    console.log(getAdmin)
    const getStorageId = localStorage.getItem('userId')
    const getStorageIdParse = JSON.parse(getStorageId)
    const userIdStorage = getStorageIdParse.userId

    let content = null
    if (getAdmin == true || getAdmin == false)
        content = <section className="button_container">
            <NavLink to="/CreatePage" className="navlink">
                <button>Créer un post</button>
            </NavLink>
        </section>
    return (
        content
    )

};

export default buttonCreatePost;