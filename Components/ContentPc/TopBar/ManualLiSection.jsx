import React from 'react';

const ManualLilSection = ({className, title, classId, children, imgSrc, imgAlt}) => {
    return (
        <li className={className}>
            <a href="/">{title}</a>
            <div id={classId} className="consult_box">
                <div className="consult_boxul">
                    {children}
                    <ul>
                        <img src={imgSrc} alt={imgAlt}/>
                    </ul>
                </div>
            </div>
        </li>
    );
}
 
export default ManualLilSection;