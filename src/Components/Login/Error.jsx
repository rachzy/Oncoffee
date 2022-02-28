import React from 'react';

const Error = ({id, text}) => {
    return (
        <p id={`error-${id}`} className="error">{text}</p>
    );
}
 
export default Error;