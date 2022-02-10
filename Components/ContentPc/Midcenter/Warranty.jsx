import React from 'react';

const Warranty = ({imgSrc, imgAlt, title, children}) => {
    return (
        <div className="garantia_box">
            <div className="garantia_img">
                <img src={imgSrc} alt={imgAlt} />
            </div>
            <div className="garantia_text">
                <h2>{title}</h2>
                <p>{children}</p>
            </div>
        </div>
    );
}

export default Warranty;