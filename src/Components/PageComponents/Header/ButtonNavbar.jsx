import React from 'react';

const ButtonNavbar = ({onClick, className, children}) => {
    return (
        <a className={className} onClick={onClick} >{children}</a>
    );
}
 
export default ButtonNavbar;