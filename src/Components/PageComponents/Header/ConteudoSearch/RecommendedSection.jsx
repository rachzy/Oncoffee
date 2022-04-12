import React from "react";
import RecommendedCard from "./RecommendedSection/RecommendedCard";

import ComboCafesGourmet from "../../../../imgs/Combo_CafesGourmet.png";

const RecommendedSection = () => {
  return (
    <main className="recomendados">
      <div className="sugtext">
        <h2>Nossas Sugestões</h2>
      </div>
      <div className="recomendslider">
        <div className="recslider_box">
          <RecommendedCard
            name="Combos"
            category="Combos"
            imgSrc={ComboCafesGourmet}
            imgAlt="combo-cafes-gourmet"
          />
        </div>
      </div>
    </main>
  );
};

export default RecommendedSection;
