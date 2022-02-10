import React from 'react';

import '../css/extra.css';

const SkipToContentButton = () => {
    let anchorRedirect = document.querySelector("#redirect-to-midcenter");

    const triggerAnchor = () => {
        if(!anchorRedirect) {
            anchorRedirect = document.querySelector("#redirect-to-midcenter")
        }
        anchorRedirect.click();
    }
    return (
        <>
            <a id="redirect-to-midcenter" href="#midcenter" hidden></a>
            <button onClick={triggerAnchor} className="skip-to-content-button">Skip to Content</button>
        </>
    );
}

export default SkipToContentButton;