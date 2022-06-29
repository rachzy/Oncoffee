import React, { useRef } from "react";

import "../../css/ProductResponsive.css";
import CardBoxBrand from "./ContentMobile/CardBoxBrand";
import CardBoxImage from "./ContentMobile/CardBoxImage";
import ProductTitle from "./ContentMobile/ProductTitle";
import ProductPrice from "./ContentMobile/ProductPrice";
import Back from "./RComponents/Back";
import ProductFreight from "./ContentMobile/ProductFreight";
import DescBox from "./ContentMobile/DescBox";

const ContentMobile = ({
  product,
  amount,
  setAmount,
  favoriteProducts,
  handleFavoriteProductsChange,
}) => {
  const [completeDesc, showMoreBtn, showLessBtn] = [
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleHeartClick = () => {
    handleFavoriteProductsChange(product);
  };

  const renderDetails = () => {
    return product.productDetails.map((detail) => {
      return (
        <DescBox
          key={detail.id}
          title={detail.title}
          description={detail.description}
        />
      );
    });
  };

  const handleShowMoreButtonClick = () => {
      completeDesc.current.style.display = "flex";
      showMoreBtn.current.style.display = "none";
      showLessBtn.current.style.display = "flex";
  };

  const handleShowLessButtonClick = () => {
    completeDesc.current.style.display = "none";
    showMoreBtn.current.style.display = "flex";
    showLessBtn.current.style.display = "none";
  };

  return (
    <section className="conteudo_mobile">
      <Back />

      <main className="top_mobile">
        <main className="card_box2">
          <CardBoxBrand productBrand={product.productBrand} />
          <CardBoxImage
            productId={product.productId}
            productImg={product.productImage}
            favoriteProducts={favoriteProducts}
            handleHeartClick={handleHeartClick}
          />
        </main>
      </main>

      <main className="product_info">
        <ProductTitle title={product.productTitle} />
        <ProductPrice
          amount={amount}
          setAmount={setAmount}
          productPrice={product.productPrice}
          productRemainingAmount={product.productRemainingAmount}
        />

        <ProductFreight freightCost={product.productPrice.freight} />

        <main className="mobile_desc">
          {renderDetails()}

          {/*  Mostrar a descriçao escrita */}
          <button
            ref={showMoreBtn}
            onClick={handleShowMoreButtonClick}
            className="mobile_desc_button"
          >
            Mais Informações
          </button>

          <div
            ref={completeDesc}
            style={{ display: "none" }}
            className="complete_desc"
          >
            <p>
              {product.productDescription}
            </p>
          </div>

          <button
            ref={showLessBtn}
            onClick={handleShowLessButtonClick}
            style={{ display: "none" }}
            className="mostrar_menos"
          >
            Mostrar Menos
          </button>
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
