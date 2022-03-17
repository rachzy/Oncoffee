import React from 'react';

const MainPcSlide = ({ className, imgSrc, imgAlt }) => {
    return (
        <div className={className}>
            <img src={require(`../../../../imgs/${imgSrc}`)} alt={imgAlt} />
        </div>
    );
}

export default MainPcSlide;