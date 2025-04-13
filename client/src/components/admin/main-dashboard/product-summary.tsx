import React from "react";
import suppliersIcon from "../../../assets/images/suppliers.svg";
import categoriesIcon from "../../../assets/images/categories.svg";

function ProductSummary({ suppliers, categories }) {
  return (
    <div className="product-summary summary-card">
      <h3>Product Summary</h3>
      <div className="summary-content">
        <div className="summary-box">
          <img
            src={suppliersIcon}
            alt="Suppliers Icon"
            className="summary-icon"
          />
          <p>{suppliers}</p>
          <span>Number of Suppliers</span>
        </div>
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
