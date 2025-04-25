// Inventory Main Summary Component

import React from "react";
import boxIcon from "../../../assets/images/box-box.svg";

// Inventory Summary component definition
function InventoryMainSummary({ quantityInHand }) {
  return (
    <div className="inventory-summary summary-card">
      {/* Inventory Summary Title */}
      <h3>Inventory Summary</h3>

      <div className="summary-content">
        <div className="summary-box">
          {/* Box Icon and Quantity in Hand */}
          <img src={boxIcon} alt="Box Icon" className="summary-icon" />
          <p>{quantityInHand}</p>
          <span>Quantity in Hand</span>
        </div>
      </div>
    </div>
  );
}

export default InventoryMainSummary;
