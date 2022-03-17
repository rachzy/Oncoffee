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
      const splitSubCategories = category.categorySubcategories.split(",");

      finalReturn = () => {
        const mapSplitSubCategories = splitSubCategories.map((subcategory) => {
          const sliceSubcategoryName = subcategory
            .replace("[", "")
            .replace("]", "");
          return (
            <li key={category.categoryId + sliceSubcategoryName}>
              <a href={category.categoryId}>{sliceSubcategoryName}</a>
            </li>
          );
        });
        return mapSplitSubCategories;
      };
    } else {
      finalReturn = () => {
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
    <ul key={elementKey}>
      <a href="/">{children}</a>
      {loadCategoriesOrSubcategories()}
    </ul>
  );
};

export default DatabaseLiLine;
