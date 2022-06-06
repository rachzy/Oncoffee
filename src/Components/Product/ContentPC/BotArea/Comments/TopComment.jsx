import React from 'react';

const TopComment = ({rate}) => {
    return (
        <div className="top_coment">
            <h2>Avaliações</h2>
            <h3>
              <i className="fas fa-star"></i>
              {rate} de 5
            </h3>
        </div>
    );
}
 
export default TopComment;