import React from "react";

import MoreBox from "./MoreDetails/MoreBox";

const MoreDetails = ({ productDetails }) => {
  return (
    <main className="more_details">
      {productDetails.map((detail) => {
        return (
          <MoreBox
            key={detail.id}
            title={detail.title}
            description={detail.description}
          />
        );
      })}
    </main>
  );
};

export default MoreDetails;
