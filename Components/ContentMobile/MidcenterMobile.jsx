import React from "react";
import OtherProductsSection from "./MidcenterMobile/OtherProductsSection";

import ProductSection from "./MidcenterMobile/ProductSection";
import FeaturedPromotions from "./MidcenterMobile/FeaturedPromotions";

import TopPromo from "./MidcenterMobile/TopPromo";

const MidcenterMobile = () => {
  return (
    <>
    <TopPromo />
      <ProductSection title="Com Desconto" category="discount" />

      <ProductSection title="Mais Vendidos" category="mostsolds" />

      <FeaturedPromotions />

      <OtherProductsSection />
    </>
  );
};

export default MidcenterMobile;
