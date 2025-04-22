import React from "react";
import { Link } from "react-router-dom";

interface LowStockItem {
  name: string;
  quantity: number;
  image?: string;
}

interface Props {
  items: LowStockItem[];
}

const LowStockList: React.FC<Props> = ({ items }) => {
  const lowStockItems = items.filter(
    (item) => item.quantity > 0 && item.quantity < 5
  );

  return (
    <div className="low-stock">
      <div className="main-header">
        <h2>Low Quantity Stock</h2>
        <Link to="/admin/product-management">See All</Link>
      </div>
      <div className="low-stock-items-container">
        <div className="low-stock-items-scroll">
          {lowStockItems.length > 0 ? (
            lowStockItems.map((item, index) => (
              <div key={index} className="low-stock-item">
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