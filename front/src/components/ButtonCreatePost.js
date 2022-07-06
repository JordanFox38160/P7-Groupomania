import React from 'react';
import { NavLink } from 'react-router-dom'

const buttonCreatePost = () => {
    return (
        <div className="button_container">
            <NavLink to="/CreatePage" className="navlink">
                <button>Créer un post</button>
            </NavLink>
        </div>
    );
};

export default buttonCreatePost;