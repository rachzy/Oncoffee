import React, { useState } from "react";
import Comment from "./Comments/Comment";

const Comments = ({ productComments }) => {
  const [comments, setComments] = useState(productComments);
  const [amountOfComments, setAmountOfComments] = useState(5);

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

    const filterCommentsByStar = productComments.map((comment) => {
      if (Math.floor(comment.rateGiven) !== value) return null;
      return comment;
    });
    setComments(filterCommentsByStar);
    setAmountOfComments(5);
  };
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
        <main className="mobile_pcard">
          <div className="card_mimg">
            <img
              src={require(`../../../imgs/cafegourmet.png`)}
              alt="cafe-gourmet"
            />
          </div>

          <h2>R$999,99</h2>
          <button>Comprar</button>
        </main>
        <main className="mobile_pcard">
          <div className="card_mimg">
            <img
              src={require(`../../../imgs/cafegourmet.png`)}
              alt="cafe-gourmet"
            />
          </div>

          <h2>R$999,99</h2>
          <button>Comprar</button>
        </main>
        <main className="mobile_pcard">
          <div className="card_mimg">
            <img
              src={require(`../../../imgs/cafegourmet.png`)}
              alt="cafe-gourmet"
            />
          </div>

          <h2>R$999,99</h2>
          <button>Comprar</button>
        </main>
        <main className="mobile_pcard">
          <div className="card_mimg">
            <img
              src={require(`../../../imgs/cafegourmet.png`)}
              alt="cafe-gourmet"
            />
          </div>

          <h2>R$999,99</h2>
          <button>Comprar</button>
        </main>
        <main className="mobile_pcard">
          <div className="card_mimg">
            <img
              src={require(`../../../imgs/cafegourmet.png`)}
              alt="cafe-gourmet"
            />
          </div>

          <h2>R$999,99</h2>
          <button>Comprar</button>
        </main>
        <main className="mobile_pcard">
          <div className="card_mimg">
            <img
              src={require(`../../../imgs/cafegourmet.png`)}
              alt="cafe-gourmet"
            />
          </div>

          <h2>R$999,99</h2>
          <button>Comprar</button>
        </main>
        <main className="mobile_pcard">
          <div className="card_mimg">
            <img
              src={require(`../../../imgs/cafegourmet.png`)}
              alt="cafe-gourmet"
            />
          </div>

          <h2>R$999,99</h2>
          <button>Comprar</button>
        </main>
        <main className="mobile_pcard">
          <div className="card_mimg">
            <img
              src={require(`../../../imgs/cafegourmet.png`)}
              alt="cafe-gourmet"
            />
          </div>

          <h2>R$999,99</h2>
          <button>Comprar</button>
        </main>
        <main className="mobile_pcard">
          <div className="card_mimg">
            <img
              src={require(`../../../imgs/cafegourmet.png`)}
              alt="cafe-gourmet"
            />
          </div>

          <h2>R$999,99</h2>
          <button>Comprar</button>
        </main>
        <main className="mobile_pcard">
          <div className="card_mimg">
            <img
              src={require(`../../../imgs/cafegourmet.png`)}
              alt="cafe-gourmet"
            />
          </div>

          <h2>R$999,99</h2>
          <button>Comprar</button>
        </main>
        <main className="mobile_pcard">
          <div className="card_mimg">
            <img
              src={require(`../../../imgs/cafegourmet.png`)}
              alt="cafe-gourmet"
            />
          </div>

          <h2>R$999,99</h2>
          <button>Comprar</button>
        </main>
        <main className="mobile_pcard">
          <div className="card_mimg">
            <img
              src={require(`../../../imgs/cafegourmet.png`)}
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
  );
};

export default Comments;
