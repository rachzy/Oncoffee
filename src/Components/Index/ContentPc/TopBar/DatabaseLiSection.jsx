import React from "react";

import DatabaseLiLine from "./DatabaseLiLine";

const DatabaseLiSection = ({
  className,
  category,
  liTitles,
  children,
  classId,
  imgSrc,
  imgAlt,
  categories,
  loadSubcategories,
}) => {
  let nextCategory = 0;

  function renderElementsIfCategoriesIsNotUndefined() {
    if (!categories) return;
    return (
      <li className={className}>
        <a href="/">{children}</a>

        <div id={classId} className="consult_box">
          <div className="consult_boxul">
            {liTitles.map((element) => {
              if (loadSubcategories) {
                switch (category) {
                  case "acessories":
                    const filterAccessoriesCategory = categories.filter(
                      (category) => category.categoryName === "Acessórios"
                    )[0];
                    return (
                      <DatabaseLiLine
                        key={element.categoryId}
                        elementKey={element.categoryId}
                        category={filterAccessoriesCategory}
                        loadSubcategories={loadSubcategories}
                      >
                        {element.categoryName}
                      </DatabaseLiLine>
                    );
                  case "derivatives":
                    const filterDerivativesCategory = categories.filter(
                      (category) => category.categoryName === "Derivados"
                    )[0];
                    return (
                      <DatabaseLiLine
                        key={element.categoryId}
                        elementKey={element.categoryId}
                        category={filterDerivativesCategory}
                        loadSubcategories={loadSubcategories}
                      >
                        {element.categoryName}
                      </DatabaseLiLine>
                    );
                  default:
                    break;
                }

                nextCategory++;
                if (nextCategory > 3) return null;
                return (
                  <DatabaseLiLine
                    key={element}
                    elementKey={element}
                    category={categories[nextCategory - 1]}
                    loadSubcategories={loadSubcategories}
                  >
                    {element}
                  </DatabaseLiLine>
                );
              }
              return (
                <DatabaseLiLine
                  key={element.categoryId}
                  elementKey={element.categoryId}
                  category={categories}
                  loadSubcategories={loadSubcategories}
                >
                  {element.categoryName}
                </DatabaseLiLine>
              );
            })}
            <ul>
              <img src={imgSrc} alt={imgAlt} />
            </ul>
          </div>
        </div>
      </li>
    );
  }
  return <>{renderElementsIfCategoriesIsNotUndefined()}</>;
};

export default DatabaseLiSection;
