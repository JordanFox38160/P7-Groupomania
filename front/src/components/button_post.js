import React from 'react';
import { NavLink } from 'react-router-dom'

const ButtonCreatePost = () => {
    return (
        <div className="button_post">
            <button>Commenter</button>
            <button>Modifier</button>
            <button>Supprimer</button>
        </div>
    );
};

export default ButtonCreatePost;