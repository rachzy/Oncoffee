import React from 'react';

const SocialMedias = () => {
    return (
        <main className="redes_sociais">
            <div className="redes_text">
                <h2>Nossas Redes Sociais</h2>
            </div>
            <div className="redes_i">
                <a className="facebook" href="/"><i className="fab fa-facebook-square"></i></a>
                <a className="instagram" href="/"><i className="fab fa-instagram"></i></a>
                <a className="twitter" href="/"><i className="fab fa-twitter"></i></a>
            </div>
        </main>
    );
}

export default SocialMedias;