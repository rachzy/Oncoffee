import React from "react";

import ProductCard from "./Categories/ProductCard";

const Categories = ({ categoriesShow }) => {
  function renderCategories() {
    if (!categoriesShow || categoriesShow.length === 0) return;

    const mapCategories = categoriesShow.map((category) => {
      if (!category) return null;

      if (categoriesShow.length > 6) {
        for (let i = 0; i < 6; i++) {
          if (category !== categoriesShow[i]) return null;

          return (
            <ProductCard
              key={category.categoryId}
              categoryId={category.categoryId}
              categoryName={category.categoryName}
              categoryImgSrc={category.categoryImg}
              categoryImgAlt="category"
            />
          );
        }
        return null;
      }
      return (
        <ProductCard
          key={category.categoryId}
          categoryId={category.categoryId}
          categoryName={category.categoryName}
          categoryImgSrc={category.categoryImg}
          categoryImgAlt="category"
        />
      );
    });
    return mapCategories;
  }
  return (
    <main className="categorias2">
      <input type="text" className="input-cate" id="input-cate" />
      {renderCategories()}
    </main>
  );
};

export default Categories;
