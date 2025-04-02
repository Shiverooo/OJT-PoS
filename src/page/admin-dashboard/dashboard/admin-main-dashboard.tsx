import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "../../../styles/admin/admin-main-dashboard.css";
import mouseImage from "../../../assets/images/mouse.png";
import keyboardImage from "../../../assets/images/keyboard.png";

function AdminMainDashboard() {
  const topSellingProducts = [
    { name: "Red Dragon Mouse", sold: 40, remaining: 10, price: "$100" },
    { name: "RAPOO Keyboard", sold: 30, remaining: 12, price: "$150" },
  ];

  const lowStockItems = [
    { name: "Red Dragon Mouse", remaining: 10, image: mouseImage },
    { name: "RAPOO Keyboard Mech.", remaining: 12, image: keyboardImage },
  ];

  const salesPurchaseData = [
    { month: "Jan", purchase: 55000, sales: 45000 },
    { month: "Feb", purchase: 60000, sales: 50000 },
    { month: "Mar", purchase: 48000, sales: 52000 },
    { month: "Apr", purchase: 42000, sales: 45000 },
    { month: "May", purchase: 38000, sales: 48000 },
    { month: "Jun", purchase: 30000, sales: 50000 },
    { month: "Jul", purchase: 57000, sales: 46000 },
    { month: "Aug", purchase: 43000, sales: 44000 },
  ];

  const inventorySummary = {
    quantityInHand: 868,
    toBeReceived: 200,
  };

  const productSummary = {
    suppliers: 31,
    categories: 21,
  };

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
                  <p className="remaining">
                    Remaining Quantity: {item.remaining}
                  </p>
                </div>
              </div>
              <span className="low-tag">Low</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sales & Purchase Chart */}
      <div className="sales-purchase">
        <div className="main-header">
          <h2>Sales & Purchase</h2>
          <button className="filter-btn">Weekly</button>
        </div>
        <BarChart width={600} height={300} data={salesPurchaseData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="purchase" fill="#6495ED" name="Purchase" />
          <Bar dataKey="sales" fill="#32CD32" name="Sales" />
        </BarChart>
      </div>

      <div className="summary-container">
        {/* Inventory Summary */}
        <div className="summary-card">
          <h3>Inventory Summary</h3>
          <div className="summary-content">
            <div className="summary-box">
              <i className="icon-orange">📦</i>
              <p>{inventorySummary.quantityInHand}</p>
              <span>Quantity in Hand</span>
            </div>
            <div className="summary-box">
              <i className="icon-purple">📥</i>
              <p>{inventorySummary.toBeReceived}</p>
              <span>To be received</span>
            </div>
          </div>
        </div>

        {/* Product Summary */}
        <div className="summary-card">
          <h3>Product Summary</h3>
          <div className="summary-content">
            <div className="summary-box">
              <i className="icon-blue">👤</i>
              <p>{productSummary.suppliers}</p>
              <span>Number of Suppliers</span>
            </div>
            <div className="summary-box">
              <i className="icon-pink">📄</i>
              <p>{productSummary.categories}</p>
              <span>Number of Categories</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMainDashboard;
