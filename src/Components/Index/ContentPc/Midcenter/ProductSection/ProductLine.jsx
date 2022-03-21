import React from 'react';

const ProductLine = ({category, children}) => {
    return (
        <main className="produto_line" id={category}>
            {children}
        </main>
    );
}
 
export default ProductLine;