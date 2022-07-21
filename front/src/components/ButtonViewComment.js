import React from 'react';
import { NavLink } from 'react-router-dom'

const buttonViewComment = (props) => {
    return (
        <section className="button_container">
            <NavLink to={'/CommentContainer/' + props.postIdComment} className="navlink">
                <button>Voir les commentaires</button>
            </NavLink>
        </section>
    );
};

export default buttonViewComment;