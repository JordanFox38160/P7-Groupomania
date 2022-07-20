import React from 'react';
import Navigation from '../components/Navigation'
import PostContainer from '../components/PostContainer'
import ButtonCreatePost from '../components/ButtonCreatePost'
import FooterContainer from '../components/Footer'

const Home = () => {
    return (
        <div className='accueil'>
            <Navigation />
            <ButtonCreatePost />
            <PostContainer />
            <FooterContainer />
        </div>
    );
};

export default Home;