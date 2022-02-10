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
  const splitLiTitles = liTitles.split(",");
  let nextCategory = 0;

  function renderElementsIfCategoriesIsNotUndefined() {
    if (!categories) return;
    return (
      <li className={className}>
        <a href="/">{children}</a>
        <div id={classId} className="consult_box">
          <div className="consult_boxul">
            {splitLiTitles.map((element) => {
              if(loadSubcategories) {
                if(category === "acessories") {
                  for(let i = 0; i <= categories.length - 1; i++) {
                    if(categories[i].categoryName === "Acessórios") {
                      return (
                        <DatabaseLiLine
                          key={element}
                          elementKey={element}
                          category={categories[i]}
                          loadSubcategories={loadSubcategories}
                        >
                          {element}
                        </DatabaseLiLine>
                      );
                    }
                  }
                  return;
                }

                if(category === "derivatives") {
                  for(let i = 0; i <= categories.length - 1; i++) {
                    if(categories[i].categoryName === "Derivados") {
                      return (
                        <DatabaseLiLine
                          key={element}
                          elementKey={element}
                          category={categories[i]}
                          loadSubcategories={loadSubcategories}
                        >
                          {element}
                        </DatabaseLiLine>
                      );
                    }
                  }
                  return;
                }

                nextCategory++;
                if(nextCategory > 3) return;
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
                  key={element}
                  elementKey={element}
                  category={categories}
                  loadSubcategories={loadSubcategories}
                >
                  {element}
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
