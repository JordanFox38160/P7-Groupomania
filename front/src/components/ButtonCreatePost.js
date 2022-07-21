import React from 'react';
import { NavLink } from 'react-router-dom'

const buttonCreatePost = () => {
    return (
        <section className="button_container">
            <NavLink to="/CreatePage" className="navlink">
                <button>Créer un post</button>
            </NavLink>
        </section>
    );
};

export default buttonCreatePost;