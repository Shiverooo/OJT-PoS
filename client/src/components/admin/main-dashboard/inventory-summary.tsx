// Import React library and image assets
import React from "react";
import boxIcon from "../../../assets/images/box-box.svg";
import locationIcon from "../../../assets/images/location.svg";

function InventorySummary({ quantityInHand, toBeReceived }) {
  return (
    <div className="inventory-summary summary-card">
      <h3>Inventory Summary</h3>

      <div className="summary-content">
        <div className="summary-box">
          <img src={boxIcon} alt="Box Icon" className="summary-icon" />
          <p>{quantityInHand}</p>
          <span>Quantity in Hand</span>
        </div>

        <div className="summary-box">
          <img
            src={locationIcon}
            alt="Location Icon"
            className="summary-icon"
          />
          <p>{toBeReceived}</p>
          <span>To be received</span>
        </div>
      </div>
    </div>
  );
}

export default InventorySummary;
