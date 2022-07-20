import React from 'react';
import Navigation from '../components/Navigation';
import ProfilPage from '../components/ProfilPage';
import FooterContainer from '../components/Footer'

const Profil = () => {
    return (
        <div className='accueil'>
            <Navigation />
            <ProfilPage />
            <FooterContainer />
        </div>
    );
};

export default Profil;