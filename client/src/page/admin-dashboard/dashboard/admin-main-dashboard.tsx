import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../../../styles/admin/admin-main-dashboard.css";
import mouseImage from "../../../assets/images/mouse.png";
import keyboardImage from "../../../assets/images/keyboard.png";
import boxIcon from "../../../assets/images/box-box.svg";
import locationIcon from "../../../assets/images/location.svg";
import suppliersIcon from "../../../assets/images/suppliers.svg";
import categoriesIcon from "../../../assets/images/categories.svg";
import calendarIcon from "../../../assets/images/calendar.svg";

function AdminMainDashboard() {
  // Sample data for top-selling products
  const topSellingProducts = [
    { name: "Red Dragon Mouse", sold: 40, remaining: 10, price: "$100" },
    { name: "RAPOO Keyboard", sold: 30, remaining: 12, price: "$150" },
  ];

  // Sample data for low stock items (with images)
  const lowStockItems = [
    { name: "Red Dragon Mouse", remaining: 10, image: mouseImage },
    { name: "RAPOO Keyboard Mech.", remaining: 12, image: keyboardImage },
  ];

  // Sample data for sales and purchase (monthly data)
  const salesPurchaseData = [
    { month: "Jan", purchase: 1000, sales: 2000 },
    { month: "Feb", purchase: 2000, sales: 3000 },
    { month: "Mar", purchase: 3000, sales: 1000 },
    { month: "Apr", purchase: 4000, sales: 5000 },
    { month: "May", purchase: 5000, sales: 4000 },
  ];

  // Inventory summary (quantity in hand and to be received)
  const inventorySummary = { quantityInHand: 868, toBeReceived: 200 };

  // Product summary (number of suppliers and categories)
  const productSummary = { suppliers: 31, categories: 6 };

  return (
    <div className="admin-main-dashboard-wrapper">
      <div className="admin-main-dashboard">
        {/* Top Selling & Low Stock */}
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
              {/* Mapping through top-selling products and rendering them in rows */}
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

        {/* Low Stock Products Section */}
        <div className="low-stock">
          <div className="main-header">
            <h2>Low Quantity Stock</h2>
            <a href="#">See All</a>
          </div>
          <div>
            {/* Mapping through low stock items and displaying product name, remaining quantity, and image */}
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
            {/* Filter button for weekly sales/purchase data */}
            <button className="filter-btn">
              <img
                src={calendarIcon}
                alt="Calendar Icon"
                className="calendar-icon"
              />
              Weekly
            </button>
          </div>
          {/* Responsive container for the BarChart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesPurchaseData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* Bars for purchase and sales data */}
              <Bar dataKey="purchase" fill="#6495ED" name="Purchase" />
              <Bar dataKey="sales" fill="#32CD32" name="Sales" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory Summary Section */}
        <div className="inventory-summary summary-card">
          <h3>Inventory Summary</h3>
          <div className="summary-content">
            {/* Summary boxes for quantity in hand and to be received */}
            <div className="summary-box">
              <img src={boxIcon} alt="Box Icon" className="summary-icon" />
              <p>{inventorySummary.quantityInHand}</p>
              <span>Quantity in Hand</span>
            </div>
            <div className="summary-box">
              <img
                src={locationIcon}
                alt="Location Icon"
                className="summary-icon"
              />
              <p>{inventorySummary.toBeReceived}</p>
              <span>To be received</span>
            </div>
          </div>
        </div>

        {/* Product Summary Section */}
        <div className="product-summary summary-card">
          <h3>Product Summary</h3>
          <div className="summary-content">
            {/* Summary boxes for the number of suppliers and categories */}
            <div className="summary-box">
              <img
                src={suppliersIcon}
                alt="Suppliers Icon"
                className="summary-icon"
              />
              <p>{productSummary.suppliers}</p>
              <span>Number of Suppliers</span>
            </div>
            <div className="summary-box">
              <img
                src={categoriesIcon}
                alt="Categories Icon"
                className="summary-icon"
              />
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
