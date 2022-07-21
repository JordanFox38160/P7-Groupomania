import React from 'react';
import Navigation from '../components/Navigation.js'
import CommentContainer from '../components/CommentContainer.js';
import FooterContainer from '../components/Footer';

const Comment = () => {
    return (
        <div>
            <Navigation />
            <CommentContainer />
            <FooterContainer />
        </div>
    );
};

export default Comment;