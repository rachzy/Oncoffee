import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Axios from "axios";

import Comment from "./Comments/Comment";

import { GlobalServerContext } from "../../../App";

const Comments = ({ productComments }) => {
  const { serverUrl, displayError } = useContext(GlobalServerContext);
  const navigate = useNavigate();

  const [comments, setComments] = useState(productComments);
  const [amountOfComments, setAmountOfComments] = useState(5);
  const [otherProducts, setOtherProducts] = useState([]);
  const [lastRenderedProduct, setLastRenderedProduct] = useState(0);

  useEffect(() => {
    const fetchOtherProducts = async () => {
      try {
        const { data } = await Axios.get(
          `${serverUrl}/products/getmany/otherproducts`
        );

        if (data.isError) {
          return displayError(data.errorCode, data.errno);
        }

        setOtherProducts(data);
      } catch (err) {
        displayError(err.message, err.code);
      }
    };
    fetchOtherProducts();
  }, [displayError, serverUrl]);

  const handleShowMoreBtnClick = () => {
    setAmountOfComments((currentState) => currentState + 10);
  };

  const renderComments = () => {
    return comments.map((comment) => {
      if (!comment) return null;

      let canRender = false;
      for (let i = 0; i < amountOfComments; i++) {
        if (comment === comments[i]) canRender = true;
      }

      if (!canRender) return null;

      return (
        <Comment
          key={comment.id}
          title={comment.title}
          description={comment.description}
          rate={comment.rateGiven}
          level={comment.level}
          pfp={comment.pfp}
        />
      );
    });
  };

  const handleOptionClick = (e) => {
    let { value } = e.target;
    value = parseInt(value);

    const filterCommentsByStar = productComments.filter(
      (comment) => Math.floor(comment.rateGiven) === value
    );

    setComments(filterCommentsByStar);
    setAmountOfComments(5);
  };

  const renderOtherProducts = () => {
    return otherProducts.map((product, pos) => {
      if (pos > lastRenderedProduct) return null;
      return (
        <main key={product.productId} className="mobile_pcard">
          <div className="card_mimg">
            <img
              src={require(`../../../imgs/${product.productImage}`)}
              alt={product.productTitle}
            />
          </div>

          <h2>R$ {product.productPrice.finalPrice.toFixed(2)}</h2>
          <button
            onClick={() => {
              navigate(`/product/${product.productId}`);
              window.scrollTo(0, 0);
            }}
          >
            Comprar
          </button>
        </main>
      );
    });
  };

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const { scrollTop, scrollHeight } = document.documentElement;

      if (scrollTop <= scrollHeight - 800) return;
      setLastRenderedProduct((currentValue) => currentValue + 10);
    });
  }, []);

  return (
    <main className="comentarios">
      <main className="stars_mobile">
        <h2>Comentarios</h2>
        <div className="SelectBox">
          <select onChange={handleOptionClick}>
            <option value={5} onClick={handleOptionClick}>
              5 Estrelas
            </option>
            <option value={4} onClick={handleOptionClick}>
              4 Estrelas
            </option>
            <option value={3} onClick={handleOptionClick}>
              3 Estrelas
            </option>
            <option value={2} onClick={handleOptionClick}>
              2 Estrelas
            </option>
            <option value={1} onClick={handleOptionClick}>
              1 Estrelas
            </option>
          </select>
          <div className="chevron">
            <i className="fas fa-sort-down"></i>
          </div>
        </div>
      </main>

      <main className="comments_overlflow">
        {renderComments()}

        <button onClick={handleShowMoreBtnClick}>Mostrar Mais</button>
      </main>

      <main className="products_overflow">
        {renderOtherProducts()}
        <div className="loading">
          <div className="loading_box"></div>
        </div>
      </main>
    </main>
  );
};

export default Comments;
