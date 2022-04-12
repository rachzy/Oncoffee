import React from 'react';

const Title = ({children}) => {
    return (
        <div className="nav_left">
                <div className="center_nav_left">
                    <h1>{children}</h1>
                    <div className="hunderline3"></div>
                </div>
            </div>
    );
}
 
export default Title;