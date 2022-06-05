import React from "react";

import "../css/Product.css";
import "../css/ProductResponsive.css";

const Product = () => {
  return (
    <section className="conteudo_pc">
      <div className="back">
        <button>
          <i className="fas fa-long-arrow-alt-left"></i> Voltar
        </button>
      </div>
      <main className="top_area">
        <main className="card_box">
          <div className="card_box_text">
            <ul>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
            </ul>
            <ul>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
              <h4>3&nbsp;Corações</h4>
            </ul>
          </div>
          <div className="card_img">
            <img src={require(`../imgs/Combo_CafesGourmet.png`)} alt="product-logo" />
            <div className="fav_hearth">
              <input type="checkbox" id="favhearth_check" />
              <label htmlFor="favhearth_check">
                <img
                  id="checkheart"
                  src={require(`../imgs/favhearth.png`)}
                  alt="fav-heart"
                />
                <img
                  id="heart"
                  src={require(`../imgs/newhearth.png`)}
                  alt="new-heart"
                />
              </label>
            </div>
          </div>
        </main>

        <main className="card_info">
          <div className="product_name">
            <h2>
              exemplo exemplo exemplo exemplo exemplo exemplo exemplo exemplo
              exemplo exemplo exemplo
            </h2>
          </div>
          <div className="product_avaliacao">
            <h2>
              <i className="fas fa-star"></i> 5,0 <i className="fas fa-angle-down"></i>
            </h2>
            <div className="avaliacao_box">
              <ul className="stars">
                <h2>5 Estrelas</h2>
                <h2>4 Estrelas</h2>
                <h2>3 Estrelas</h2>
                <h2>2 Estrelas</h2>
                <h2>1 Estrelas</h2>
              </ul>
              <ul className="inner_line">
                <div className="line">
                  <span></span>
                </div>
                <div className="line">
                  <span></span>
                </div>
                <div className="line">
                  <span></span>
                </div>
                <div className="line">
                  <span></span>
                </div>
                <div className="line">
                  <span></span>
                </div>
              </ul>
              <ul className="porcentagem">
                <h2>100%</h2>
                <h2>100%</h2>
                <h2>100%</h2>
                <h2>100%</h2>
                <h2>100%</h2>
              </ul>
            </div>
            <h3>9999 Avaliações</h3>
            <h3>9999 Pedidos</h3>
          </div>

          <div className="product_price">
            <h3>R$999,99</h3>
            <h2>R$999,99</h2>
            <h4>-50% OFF</h4>
            <h5>Dividido em até 99x de R$999,99 sem juros</h5>
          </div>

          <div className="product_quant">
            <h2>Quantidade:</h2>

            <div className="quantity">
              <button className="minus-btn" type="button" name="button">
                <img
                  src="https://designmodo.com/demo/shopping-cart/minus.svg"
                  alt=""
                />
              </button>
              <input type="text" name="name" value="1" />

              <button className="plus-btn" type="button" name="button">
                <img
                  src="https://designmodo.com/demo/shopping-cart/plus.svg"
                  alt=""
                />
              </button>
            </div>

            <h3>9999 Itens disponíveis</h3>
          </div>

          <div className="product_frete">
            <h2>Calcule o frete atravéz do CEP</h2>
            <div className="input_frete">
              <input type="text" className="frete" placeholder="00000-000" />
              <input type="button" className="calcular" value="Calcular" />
            </div>
            <a href="#">Não sei o meu CEP</a>
            <h2>Valor do Frete: R$999,99</h2>
          </div>

          <div className="product_comprar">
            <input type="button" value="Comprar" />
            <input type="button" value="Adicionar ao Carrinho" />
          </div>
        </main>
      </main>

      <main className="mid_area">
        <main className="more_products">
          <div className="more_card">
            <div className="more_img">
              <img src={require(`../imgs/cafegourmet.png`)} alt="cafe-gourmet" />
            </div>
            <div className="more_price">
              <h2>R$999</h2>
            </div>
            <button>Ver Mais</button>
          </div>
          <div className="more_card">
            <div className="more_img">
              <img src={require(`../imgs/cafegourmet.png`)} alt="" />
            </div>
            <div className="more_price">
              <h2>R$999</h2>
            </div>
            <button>Ver Mais</button>
          </div>
          <div className="more_card">
            <div className="more_img">
              <img src={require(`../imgs/cafegourmet.png`)} alt="" />
            </div>
            <div className="more_price">
              <h2>R$999</h2>
            </div>
            <button>Ver Mais</button>
          </div>
        </main>
        <main className="mid_grid">
          <main className="product_desc">
            <div className="desc">
              <h2>Descrição</h2>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
              qui itaque? Ratione consequatur, quidem error eum aspernatur nulla
              nemo excepturi earum inventore esse nesciunt laudantium! Deleniti
              facere fuga ab fugit. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Veritatis velit deleniti, minima atque ducimus
              impedit unde veniam dolorem at sit eligendi earum repellendus
              consectetur accusantium quod nemo laudantium cum magnam.Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Adipisci, qui
              itaque? Ratione consequatur, quidem error eum aspernatur nulla
              nemo excepturi earum inventore esse nesciunt laudantium! Deleniti
              facere fuga ab fugit. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Veritatis velit deleniti, minima atque ducimus
              impedit unde veniam dolorem at sit eligendi earum repellendus
              consectetur accusantium quod nemo laudantium cum magnam.Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Adipisci, qui
              itaque? Ratione consequatur, quidem error eum aspernatur nulla
              nemo excepturi earum inventore esse nesciunt laudantium! Deleniti
              facere fuga ab fugit. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Veritatis velit deleniti, minima atque ducimus
              impedit unde veniam dolorem at sit eligendi earum repellendus
              consectetur accusantium quod nemo laudantium cum
              magnam.adipisicing elit. Veritatis velit deleniti, minima atque
              ducimus impedit unde veniam dolorem at sit eligend
            </p>
          </main>
          <main className="more_details">
            <div className="mored_box">
              <h2>Grão</h2>
              <h3>exemplo exemploexemplo exemploexemplo exemplo</h3>
            </div>
            <div className="mored_box">
              <h2>Aroma</h2>
              <h3>exemplo exemploexemplo exemploexemplo exemplo</h3>
            </div>
            <div className="mored_box">
              <h2>Torra</h2>
              <h3>exemplo exemploexemplo exemploexemplo exemplo</h3>
            </div>
            <div className="mored_box">
              <h2>Data da Torra</h2>
              <h3>exemplo exemploexemplo exemploexemplo exemplo</h3>
            </div>
            <div className="mored_box">
              <h2>Acidez</h2>
              <h3>exemplo exemploexemplo exemploexemplo exemplo</h3>
            </div>
            <div className="mored_box">
              <h2>Corpo</h2>
              <h3>exemplo exemploexemplo exemploexemplo exemplo</h3>
            </div>
            <div className="mored_box">
              <h2>Variedade</h2>
              <h3>exemplo exemploexemplo exemploexemplo exemplo</h3>
            </div>
            <div className="mored_box">
              <h2>Processo</h2>
              <h3>exemplo exemploexemplo exemploexemplo exemplo</h3>
            </div>
            <div className="mored_box">
              <h2>Local de Origem</h2>
              <h3>exemplo exemploexemplo exemploexemplo exemplo</h3>
            </div>
            <div className="mored_box">
              <h2>Nota</h2>
              <h3>exemplo exemploexemplo exemploexemplo exemplo</h3>
            </div>
            <div className="mored_box">
              <h2>Peso</h2>
              <h3>exemplo exemploexemplo exemploexemplo exemplo</h3>
            </div>
          </main>

          <main className="more_imgs">
            <img src={require(`../imgs/cafegourmet.png`)} alt="cafe-gourmet" />
            <img src={require(`../imgs/cafegourmet.png`)} alt="cafe-gourmet" />
            <img src={require(`../imgs/cafegourmet.png`)} alt="cafe-gourmet" />
          </main>
        </main>
      </main>

      <main className="bott_area">
        <main className="comentarios">
          <div className="top_coment">
            <h2>Avaliações</h2>
            <h3>
              <i className="fas fa-star"></i>
              5,0 de 5
            </h3>
          </div>
          <div className="stars_area">
            <button className="star_box">5 Estrelas</button>
            <button className="star_box">4 Estrelas</button>
            <button className="star_box">3 Estrelas</button>
            <button className="star_box">2 Estrelas</button>
            <button className="star_box">1 Estrelas</button>
            <button className="star_box">0 Estrelas</button>
          </div>

          <main className="coment_overflow">
            <div className="coment_box">
              <div className="coment_perfil">
                <div className="perfil_box">
                  <div className="perfil_img">
                    <img src={require(`../imgs/1629903043818.jpg`)} alt="" />
                  </div>
                  <div className="lvl">
                    <h2>5</h2>
                    <h3>Nível</h3>
                  </div>
                </div>
              </div>
              <div className="coment_text">
                <h2>Perfil Name</h2>
                <div className="coment_nota">
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>

                  <i className="fa fa-star-half" aria-hidden="true"></i>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                  tempora dolor mollitia aliquam aliquid alias enim non harum
                  placeat id minus optio dicta repellendus neque earum odit
                  blanditiis, eligendi reprehenderit!
                </p>
              </div>
            </div>
            <div className="coment_box">
              <div className="coment_perfil">
                <div className="perfil_box">
                  <div className="perfil_img">
                    <img src={require(`../imgs/1629903043818.jpg`)} alt="" />
                  </div>
                  <div className="lvl">
                    <h2>5</h2>
                    <h3>Nível</h3>
                  </div>
                </div>
              </div>
              <div className="coment_text">
                <h2>Perfil Name</h2>
                <div className="coment_nota">
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>

                  <i className="fa fa-star-half" aria-hidden="true"></i>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                  tempora dolor mollitia aliquam aliquid alias enim non harum
                  placeat id minus optio dicta repellendus neque earum odit
                  blanditiis, eligendi reprehenderit!
                </p>
              </div>
            </div>
            <div className="coment_box">
              <div className="coment_perfil">
                <div className="perfil_box">
                  <div className="perfil_img">
                    <img src={require(`../imgs/1629903043818.jpg`)}alt="" />
                  </div>
                  <div className="lvl">
                    <h2>5</h2>
                    <h3>Nível</h3>
                  </div>
                </div>
              </div>
              <div className="coment_text">
                <h2>Perfil Name</h2>
                <div className="coment_nota">
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>

                  <i className="fa fa-star-half" aria-hidden="true"></i>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                  tempora dolor mollitia aliquam aliquid alias enim non harum
                  placeat id minus optio dicta repellendus neque earum odit
                  blanditiis, eligendi reprehenderit!
                </p>
              </div>
            </div>
            <div className="coment_box">
              <div className="coment_perfil">
                <div className="perfil_box">
                  <div className="perfil_img">
                    <img src={require(`../imgs/1629903043818.jpg`)} alt="" />
                  </div>
                  <div className="lvl">
                    <h2>5</h2>
                    <h3>Nível</h3>
                  </div>
                </div>
              </div>
              <div className="coment_text">
                <h2>Perfil Name</h2>
                <div className="coment_nota">
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>

                  <i className="fa fa-star-half" aria-hidden="true"></i>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                  tempora dolor mollitia aliquam aliquid alias enim non harum
                  placeat id minus optio dicta repellendus neque earum odit
                  blanditiis, eligendi reprehenderit!
                </p>
              </div>
            </div>
            <div className="coment_box">
              <div className="coment_perfil">
                <div className="perfil_box">
                  <div className="perfil_img">
                    <img src={require(`../imgs/1629903043818.jpg`)} alt="" />
                  </div>
                  <div className="lvl">
                    <h2>5</h2>
                    <h3>Nível</h3>
                  </div>
                </div>
              </div>
              <div className="coment_text">
                <h2>Perfil Name</h2>
                <div className="coment_nota">
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>

                  <i className="fa fa-star-half" aria-hidden="true"></i>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                  tempora dolor mollitia aliquam aliquid alias enim non harum
                  placeat id minus optio dicta repellendus neque earum odit
                  blanditiis, eligendi reprehenderit!
                </p>
              </div>
            </div>
            <div className="coment_box">
              <div className="coment_perfil">
                <div className="perfil_box">
                  <div className="perfil_img">
                    <img src={require(`../imgs/1629903043818.jpg`)} alt="" />
                  </div>
                  <div className="lvl">
                    <h2>5</h2>
                    <h3>Nível</h3>
                  </div>
                </div>
              </div>
              <div className="coment_text">
                <h2>Perfil Name</h2>
                <div className="coment_nota">
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>

                  <i className="fa fa-star-half" aria-hidden="true"></i>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                  tempora dolor mollitia aliquam aliquid alias enim non harum
                  placeat id minus optio dicta repellendus neque earum odit
                  blanditiis, eligendi reprehenderit!
                </p>
              </div>
            </div>

            <section className="back-next">
              <button>
                <i className="fas fa-chevron-left"></i>
              </button>
              <h2>1</h2>
              <button>
                <i className="fas fa-chevron-right"></i>
              </button>
            </section>
          </main>
        </main>
      </main>

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
    </section>
  );
};

export default Product;
