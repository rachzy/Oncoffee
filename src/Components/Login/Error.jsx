import React from 'react';

const Error = ({id, style, text}) => {
    return (
        <p id={`error-${id}`} style={style} className="error">{text}</p>
    );
}
 
export default Error;