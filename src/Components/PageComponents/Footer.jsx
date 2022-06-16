import React from "react";

const Footer = () => {
  return (
    <main className="infos_text">
      <main className="redes_sociais">
        <div className="redes_text">
          <h2>Nossas Redes Sociais</h2>
        </div>
        <div className="redes_i">
          <a className="facebook" href="#">
            <i className="fab fa-facebook-square"></i>
          </a>
          <a className="instagram" href="#">
            <i className="fab fa-instagram"></i>
          </a>
          <a className="twitter" href="#">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </main>

      <main className="final_info">
        <ul>
          <li>
            <a href="#">Nossos Termos</a>
          </li>
          <li>
            <a href="#">Sobre Nós</a>
          </li>
          <li>
            <a href="#">Ajuda</a>
          </li>
          <li>
            <a href="#">Suporte</a>
          </li>
          <li>
            <a href="#">Contato</a>
          </li>
          <li>
            <a href="#">Vender No Site</a>
          </li>
        </ul>
      </main>
    </main>
  );
};

export default Footer;
