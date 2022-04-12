import React from 'react';

import '../../../css/extra.css';

const Error = ({id, text}) => {
    return (
        <p id={`error-${id}`} style={{textAlign: "center"}}><span className="error-msg">{text}</span></p>
    );
}
 
export default Error;