import React from "react";
import boxIcon from "../../../assets/images/box-box.svg";

function InventoryMainSummary({ quantityInHand}) {
  return (
    <div className="inventory-summary summary-card">
      <h3>Inventory Summary</h3>

      <div className="summary-content">
        <div className="summary-box">
          <img src={boxIcon} alt="Box Icon" className="summary-icon" />
          <p>{quantityInHand}</p>
          <span>Quantity in Hand</span>
        </div>
      </div>
    </div>
  );
}

export default InventoryMainSummary;
