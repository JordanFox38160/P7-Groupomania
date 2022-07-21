import React from 'react';
import Navigation from '../components/Navigation'
import PostContainer from '../components/PostContainer'
import ButtonCreatePost from '../components/ButtonCreatePost'
import FooterContainer from '../components/Footer'

const Home = () => {
    return (
        <main className='accueil'>
            <Navigation />
            <ButtonCreatePost />
            <PostContainer />
            <FooterContainer />
        </main>
    );
};

export default Home;