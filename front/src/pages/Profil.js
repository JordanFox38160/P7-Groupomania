import React from 'react';
import Navigation from '../components/Navigation';
import Profil_page from '../components/Profil_page';
import FooterContainer from '../components/Footer'

const Profil = () => {
    return (
        <div className='accueil'>
            <Navigation />
            <Profil_page />
            <FooterContainer />
        </div>
    );
};

export default Profil;