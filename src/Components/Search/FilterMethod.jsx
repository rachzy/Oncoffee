import React from "react";

const FilterMethod = ({ title, description, children }) => {
  return (
    <section className="metodo">
      <h2>{title}</h2>
      <h4>{description}</h4>
      <div className="checkbox_area">{children}</div>
    </section>
  );
};

export default FilterMethod;
