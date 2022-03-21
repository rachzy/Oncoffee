import React from 'react';

const Title = ({firstClass, secondClass, children}) => {
    return (
        <div className={firstClass}>
            <h1>{children}</h1>
            <div className={secondClass}></div>
        </div>
    );
}
 
export default Title;