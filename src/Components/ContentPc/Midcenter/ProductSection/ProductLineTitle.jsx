import React from 'react';

const ProductLineTitle = ({href, children}) => {
    return (
        <div className="midcont_text">
            <h2>{children}</h2>
            <a href={href}>Ver Mais</a>
        </div>
    );
}

export default ProductLineTitle;