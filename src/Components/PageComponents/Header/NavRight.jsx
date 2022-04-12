import React from 'react';

const NavRight = ({children}) => {
    return (
        <div className="nav_right">
            <div className="center_nav_right">
                {children}
            </div>
        </div>
    );
}
 
export default NavRight;