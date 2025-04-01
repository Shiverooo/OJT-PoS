import React from "react";
import "../../../styles/admin/admin-main-dashboard.css"; // Keeping the CSS file

function AdminMainDashboard() {
  const topSellingProducts = [
    { name: "Red Dragon Mouse", sold: 40, remaining: 10, price: "$100" },
    { name: "RAPOO Keyboard", sold: 30, remaining: 12, price: "$150" },
  ];

  const lowStockItems = [
    { name: "Red Dragon Mouse", remaining: 10, image: "mouse.png" },
    { name: "RAPOO Keyboard Mech.", remaining: 12, image: "keyboard.png" },
  ];

  return (
    <div className="admin-main-dashboard">
      {/* Top Selling Products */}
      <div className="top-selling">
        <div className="main-header">
          <h2>Top Selling Product</h2>
          <a href="#">See All</a>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Sold Quantity</th>
              <th>Remaining Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {topSellingProducts.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.sold}</td>
                <td>{product.remaining}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Low Quantity Stock */}
      <div className="low-stock">
        <div className="main-header">
          <h2>Low Quantity Stock</h2>
          <a href="#">See All</a>
        </div>
        <div>
          {lowStockItems.map((item, index) => (
            <div key={index} className="low-stock-item">
              <div className="low-stock-info">
                <img src={item.image} alt={item.name} />
                <div>
                  <p className="main-product-name">{item.name}</p>
                  <p className="remaining">Remaining Quantity: {item.remaining}</p>
                </div>
              </div>
              <span className="low-tag">Low</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminMainDashboard;
