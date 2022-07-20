import React from 'react';
import { NavLink } from 'react-router-dom'


const getPostIdComment = (event) => {
    const postIdComment = event.target.closest('.message-container').id
    console.log(postIdComment)
}

const buttonViewComment = (props) => {
    return (
        <div className="button_container">
            <NavLink to={'/CommentContainer/' + props.postIdComment} className="navlink">
                <button onClick={getPostIdComment}>Voir les commentaires</button>
            </NavLink>
        </div>
    );
};

export default buttonViewComment;