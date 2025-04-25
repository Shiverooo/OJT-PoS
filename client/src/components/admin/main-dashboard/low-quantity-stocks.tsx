// Low Stock List Component

import React from "react";
import { Link } from "react-router-dom";

// Define types for low stock items
interface LowStockItem {
  name: string;
  quantity: number;
  image?: string;
}

interface Props {
  items: LowStockItem[];
}

// Low Stock List component definition
const LowStockList: React.FC<Props> = ({ items }) => {
  // Filter items with low stock (quantity between 1 and 4)
  const lowStockItems = items.filter(
    (item) => item.quantity > 0 && item.quantity < 5
  );

  return (
    <div className="low-stock">
      {/* Header with title and "See All" link */}
      <div className="main-header">
        <h2>Low Quantity Stock</h2>
        <Link to="/admin/product-management">See All</Link>
      </div>
      <div className="low-stock-items-container">
        <div className="low-stock-items-scroll">
          {/* Display low stock items or no items message */}
          {lowStockItems.length > 0 ? (
            lowStockItems.map((item, index) => (
              <div key={index} className="low-stock-item">
                {/* Low stock item info */}
                <div className="low-stock-info">
                  <img
                    src={item.image || "https://via.placeholder.com/60"}
                    alt={item.name}
                  />
                  <div>
                    <p className="main-product-name">{item.name}</p>
                    <p className="remaining">
                      Remaining Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="low-tag">Low</span>
              </div>
            ))
          ) : (
            <p className="no-items">No low stock items available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LowStockList;
