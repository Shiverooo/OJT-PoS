// Product Summary Component

import React from "react";
import suppliersIcon from "../../../assets/images/suppliers.svg";
import categoriesIcon from "../../../assets/images/categories.svg";

// Product Summary component definition
function ProductSummary({ suppliers, categories }) {
  return (
    <div className="product-summary summary-card">
      {/* Product Summary Title */}
      <h3>Product Summary</h3>

      <div className="summary-content">
        {/* Number of Suppliers */}
        <div className="summary-box">
          <img
            src={suppliersIcon}
            alt="Suppliers Icon"
            className="summary-icon"
          />
          <p>{suppliers}</p>
          <span>Number of Suppliers</span>
        </div>

        {/* Number of Categories */}
        <div className="summary-box">
          <img
            src={categoriesIcon}
            alt="Categories Icon"
            className="summary-icon"
          />
          <p>{categories}</p>
          <span>Number of Categories</span>
        </div>
      </div>
    </div>
  );
}

export default ProductSummary;
