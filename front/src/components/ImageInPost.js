import React from 'react';
import Axios from 'axios'


const LoadImageInComponent = (props) => {
    return (
        <div className='img_div'>
            <img src={props.picture} alt="" />
        </div>

    );
};


export default LoadImageInComponent;