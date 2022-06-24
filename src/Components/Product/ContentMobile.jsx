import React from "react";

import "../../css/ProductResponsive.css";
import CardBoxBrand from "./ContentMobile/CardBoxBrand";
import CardBoxImage from "./ContentMobile/CardBoxImage";
import Back from "./RComponents/Back";

const ContentMobile = ({product}) => {
  return (
    <section className="conteudo_mobile">
      <Back />

      <main className="top_mobile">
        <main className="card_box2">
          <CardBoxBrand />
          <CardBoxImage productImg={product.productImage} />
        </main>
      </main>

      <main className="product_info">
        <div className="titulo">
          <h2>
            exemplo exemplo exemplo exemplo exemplo exemplo exemplo exemplo
            exemplo exemplo exemplo
          </h2>
        </div>

        <div className="preco_area">
          <div className="preco">
            <div className="descontopreco">
              <h3>R$999,99</h3>
              <h2>R$999,99</h2>
            </div>
            <h4>99%OFF</h4>
          </div>

          <div className="quant_mobile">
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
        </div>

        <div className="calc_frete">
          <h2>Calcule o Frete</h2>
          <div className="frete_inputs">
            <input type="text" placeholder="00000-000" />
            <button>Calcular</button>
          </div>
          <h3>Valor: R$999,99</h3>
        </div>

        <main className="mobile_desc">
          <div className="mobile_desc_box">
            <h2>Grão</h2>
            <h3>exemplo exemploexemplo exemploexemplo exemplo</h3>
          </div>
          <div className="mobile_desc_box">
            <h2>Aroma</h2>
            <h3>exemplo exemploexemplo exemploexemplo exemplo</h3>
          </div>
          <div className="mobile_desc_box">
            <h2>Torra</h2>
            <h3>exemplo exemploexemplo exemploexemplo exemplo</h3>
          </div>
          <div className="mobile_desc_box">
            <h2>Data da Torra</h2>
            <h3>exemplo exemploexemplo exemploexemplo exemplo</h3>
          </div>
          <div className="mobile_desc_box">
            <h2>Acidez</h2>
            <h3>exemplo exemploexemplo exemploexemplo exemplo</h3>
          </div>
          <div className="mobile_desc_box">
            <h2>Corpo</h2>
            <h3>exemplo exemploexemplo exemploexemplo exemplo</h3>
          </div>
          <div className="mobile_desc_box">
            <h2>Variedade</h2>
            <h3>exemplo exemploexemplo exemploexemplo exemplo</h3>
          </div>
          <div className="mobile_desc_box">
            <h2>Processo</h2>
            <h3>exemplo exemploexemplo exemploexemplo exemplo</h3>
          </div>
          <div className="mobile_desc_box">
            <h2>Local de Origem</h2>
            <h3>exemplo exemploexemplo exemploexemplo exemplo</h3>
          </div>
          <div className="mobile_desc_box">
            <h2>Nota</h2>
            <h3>exemplo exemploexemplo exemploexemplo exemplo</h3>
          </div>
          <div className="mobile_desc_box">
            <h2>Peso</h2>
            <h3>exemplo exemploexemplo exemploexemplo exemplo</h3>
          </div>

          {/*  Mostrar a descriçao escrita */}
          <button className="mobile_desc_button">Mais Informações</button>

          <div className="complete_desc">
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
          </div>

          <button className="mostrar_menos">Mostrar Menos</button>
        </main>

        <main className="comentarios">
          <main className="stars_mobile">
            <h2>Comentarios</h2>
            <div className="SelectBox">
              <select>
                <option>5 Estrelas</option>
                <option>4 Estrelas</option>
                <option>3 Estrelas</option>
                <option>2 Estrelas</option>
                <option>1 Estrelas</option>
              </select>
              <div className="chevron">
                <i className="fas fa-sort-down"></i>
              </div>
            </div>
          </main>

          <main className="comments_overlflow">
            <div className="best_comment">
              <div className="comment_left">
                <img src={require(`../../imgs/1629904844934.jpg`)} alt="" />
                <h3>5</h3>
                <h4>Nivel</h4>
              </div>
              <div className="comment_right">
                <div className="mobile_stars_area">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <h2>Exemplo Exemplo</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
                  repellendus possimus! Deleniti necessitatibus mollitia itaque
                  quae esse quaerat perspiciatis architecto. Suscipit quidem
                  eveniet asperiores provident doloribus dolorem nisi quibusdam
                  ratione?
                </p>
              </div>
            </div>

            <button>Mostrar Mais</button>

            {/* Caso esse botao for apertado, mostrar mais 5 comentarios e o botão de mostrar menos e passar pro lado */}
            <section className="back-next_mobile">
              <button>
                <i className="fas fa-chevron-left"></i>
              </button>
              <h2>1</h2>
              <button>
                <i className="fas fa-chevron-right"></i>
              </button>
            </section>

            <button>Mostrar Menos</button>
          </main>

          <main className="products_overflow">
            <main className="mobile_pcard">
              <div className="card_mimg">
                <img
                  src={require(`../../imgs/cafegourmet.png`)}
                  alt="cafe-gourmet"
                />
              </div>

              <h2>R$999,99</h2>
              <button>Comprar</button>
            </main>
            <main className="mobile_pcard">
              <div className="card_mimg">
                <img
                  src={require(`../../imgs/cafegourmet.png`)}
                  alt="cafe-gourmet"
                />
              </div>

              <h2>R$999,99</h2>
              <button>Comprar</button>
            </main>
            <main className="mobile_pcard">
              <div className="card_mimg">
                <img
                  src={require(`../../imgs/cafegourmet.png`)}
                  alt="cafe-gourmet"
                />
              </div>

              <h2>R$999,99</h2>
              <button>Comprar</button>
            </main>
            <main className="mobile_pcard">
              <div className="card_mimg">
                <img
                  src={require(`../../imgs/cafegourmet.png`)}
                  alt="cafe-gourmet"
                />
              </div>

              <h2>R$999,99</h2>
              <button>Comprar</button>
            </main>
            <main className="mobile_pcard">
              <div className="card_mimg">
                <img
                  src={require(`../../imgs/cafegourmet.png`)}
                  alt="cafe-gourmet"
                />
              </div>

              <h2>R$999,99</h2>
              <button>Comprar</button>
            </main>
            <main className="mobile_pcard">
              <div className="card_mimg">
                <img
                  src={require(`../../imgs/cafegourmet.png`)}
                  alt="cafe-gourmet"
                />
              </div>

              <h2>R$999,99</h2>
              <button>Comprar</button>
            </main>
            <main className="mobile_pcard">
              <div className="card_mimg">
                <img
                  src={require(`../../imgs/cafegourmet.png`)}
                  alt="cafe-gourmet"
                />
              </div>

              <h2>R$999,99</h2>
              <button>Comprar</button>
            </main>
            <main className="mobile_pcard">
              <div className="card_mimg">
                <img
                  src={require(`../../imgs/cafegourmet.png`)}
                  alt="cafe-gourmet"
                />
              </div>

              <h2>R$999,99</h2>
              <button>Comprar</button>
            </main>
            <main className="mobile_pcard">
              <div className="card_mimg">
                <img
                  src={require(`../../imgs/cafegourmet.png`)}
                  alt="cafe-gourmet"
                />
              </div>

              <h2>R$999,99</h2>
              <button>Comprar</button>
            </main>
            <main className="mobile_pcard">
              <div className="card_mimg">
                <img
                  src={require(`../../imgs/cafegourmet.png`)}
                  alt="cafe-gourmet"
                />
              </div>

              <h2>R$999,99</h2>
              <button>Comprar</button>
            </main>
            <main className="mobile_pcard">
              <div className="card_mimg">
                <img
                  src={require(`../../imgs/cafegourmet.png`)}
                  alt="cafe-gourmet"
                />
              </div>

              <h2>R$999,99</h2>
              <button>Comprar</button>
            </main>
            <main className="mobile_pcard">
              <div className="card_mimg">
                <img
                  src={require(`../../imgs/cafegourmet.png`)}
                  alt="cafe-gourmet"
                />
              </div>

              <h2>R$999,99</h2>
              <button>Comprar</button>
            </main>

            <div className="loading">
              <div className="loading_box"></div>
            </div>
          </main>
        </main>
      </main>
    </section>
  );
};

export default ContentMobile;
