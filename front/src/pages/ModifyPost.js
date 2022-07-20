import React from 'react';
import Axios from 'axios'
import Navigation from '../components/Navigation';
import ModifyContainer from '../components/ModifyContainer';
import FooterContainer from '../components/Footer';

const ModifyPost = () => {
    return (
        <div>
            <Navigation />
            <ModifyContainer />
            <FooterContainer />
        </div>
    );
};

export default ModifyPost;