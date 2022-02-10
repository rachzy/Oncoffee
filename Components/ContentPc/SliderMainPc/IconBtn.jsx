import React from 'react';

const IconBtn = ({name, className, onClick, onLoad}) => {
    return (
        <i className={className} onClick={onClick} onLoad={onLoad}></i>
    );
}
 
export default IconBtn;