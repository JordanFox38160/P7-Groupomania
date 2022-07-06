import React from 'react';
import Navigation from '../components/Navigation'
import Post_page from '../components/Post_container'
import ButtonCreatePost from '../components/ButtonCreatePost'
import FooterContainer from '../components/Footer'

const Home = () => {
    return (
        <div className='accueil'>
            <Navigation />
            <ButtonCreatePost />
            <Post_page />
            <FooterContainer />
        </div>
    );
};

export default Home;