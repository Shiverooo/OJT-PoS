import React from "react";

interface InventorySummaryProps {
  outOfStockCount: number;
}

const InventorySummary: React.FC<InventorySummaryProps> = ({ totalProducts, outOfStockCount }) => {
  return (
    <div className="prod-inventory-summary">
      <h3>Overall Inventory</h3>
      <div className="inventory-grid">
        <div className="inventory-box">
          <p className="label">Categories</p>
          <p className="value">6</p>
        </div>
        <div className="inventory-box">
          <p className="label">Total Products</p>
          <p className="value">{totalProducts}</p>
        </div>
        <div className="inventory-box">
          <p className="label">Top Selling</p>
          <p className="value">5</p>
        </div>
        <div className="inventory-box">
        <p className="label">Out of Stock Items</p>
        <p className="value">{outOfStockCount}</p>
      </div>
      </div>
    </div>
  );
}

export default InventorySummary;
