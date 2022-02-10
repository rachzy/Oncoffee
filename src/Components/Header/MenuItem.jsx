import React from 'react';

const MenuItem = ({children, id, icon, alt}) => {
    return (
        <div className="shopkartmo3">
            <input type="button" id="kartbttmo" />
            <label htmlFor="kartbttmo" id="userbtt">
                <img src={icon} alt={alt} />
            </label>

            {children}
        </div>
    );
}

export default MenuItem;