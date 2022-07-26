import React from 'react';

const LoadImageInComponent = (props) => {
    return (
        <div className='img_div'>
            <img src={props.picture} alt="" />
        </div>

    );
};


export default LoadImageInComponent;