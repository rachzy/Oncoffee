import React from 'react';

const SlideMobile = ({className, imgSrc, imgAlt}) => {
    return (
        <div className={className}>
            <img src={require(`../../../../imgs/${imgSrc}`)} alt={imgAlt} />
        </div>
    );
}

export default SlideMobile;