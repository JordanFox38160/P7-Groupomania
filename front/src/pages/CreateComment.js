import React from 'react';
import Navigation from '../components/Navigation';
import Container_create_Comment from '../components/CreateComment';
import FooterContainer from '../components/Footer';

const CreateComment = () => {
    return (
        <div>
            <Navigation />
            <Container_create_Comment />
            <FooterContainer />
        </div>
    );
};

export default CreateComment;