import React from 'react';
import Navigation from '../components/Navigation';
import BioContainer from '../components/BioContainer'
import FooterContainer from '../components/Footer'

const Profil = () => {
    return (
        <div className='bio_page'>
            <Navigation />
            <BioContainer />
            <FooterContainer />
        </div>
    );
};

export default Profil;