import React from "react";

const DatabaseLiLine = ({
  elementKey,
  children,
  category,
  loadSubcategories,
}) => {
  function loadCategoriesOrSubcategories() {
    let finalReturn;
    if (loadSubcategories && category && category.length !== 0) {
      const { categorySubcategories } = category;

      finalReturn = () => {
        const mapCategorySubcategories = categorySubcategories.map(
          (subcategory) => {
            return (
              <li key={subcategory["_id"]}>
                <a href={category.categoryId}>{subcategory.name}</a>
              </li>
            );
          }
        );
        return mapCategorySubcategories;
      };
    } else {
      finalReturn = () => {
        if (!category) return;
        const categoryMap = category.map((c) => {
          return (
            <li key={c.categoryId}>
              <a href={c.categoryId}>{c.categoryName}</a>
            </li>
          );
        });
        return categoryMap;
      };
    }
    return finalReturn();
  }
  return (
    <ul key={`${elementKey}`}>
      <a href="/">{children}</a>
      {loadCategoriesOrSubcategories()}
    </ul>
  );
};

export default DatabaseLiLine;
