import React, { useEffect, useState } from "react";
import TopSellingTable from "../../../components/admin/main-dashboard/top-selling-product.tsx";
import LowStockList from "../../../components/admin/main-dashboard/low-quantity-stocks.tsx";
import SalesPurchaseChart from "../../../components/admin/main-dashboard/sales-purchase-charts.tsx";
import InventoryMainSummary from "../../../components/admin/main-dashboard/inventory-summary.tsx";
import ProductSummary from "../../../components/admin/main-dashboard/product-summary.tsx";
import "../../../styles/admin/admin-main-dashboard.css";

function AdminMainDashboard() {
  // 🔹 States for storing low stock items and other relevant data
  const [lowStockItems, setLowStockItems] = useState([]); // Low stock items
  const [suppliers, setSuppliers] = useState([]); // Suppliers (currently empty)
  const [currentProducts, setCurrentProducts] = useState([]); // Current products from localStorage
  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility

  // Fetch products from localStorage and filter low stock items on component mount
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]"); // Get products from localStorage
    const lowStock = storedProducts.filter((item) => item.quantity < 15); // Filter low stock items
    setLowStockItems(lowStock); // Set low stock items state
    setCurrentProducts(storedProducts); // Set current products state
  }, []);

  // Calculate the total quantity of products in hand
  const totalQuantityInHand = currentProducts.reduce(
    (total, product) => total + product.quantity,
    0
  );

  // Sample data for top-selling products
  const topSellingProducts = [
    { name: "Red Dragon Mouse", sold: 40, remaining: 10, price: "$100" },
    { name: "RAPOO Keyboard", sold: 30, remaining: 12, price: "$150" },
  ];

  // Sample data for sales and purchase charts (static data)
  const salesPurchaseData = [
    { month: "Jan", purchase: 55000, sales: 49000 },
    { month: "Feb", purchase: 58000, sales: 52000 },
    { month: "Mar", purchase: 47000, sales: 54000 },
    { month: "Apr", purchase: 42000, sales: 44000 },
    { month: "May", purchase: 35000, sales: 47000 },
  ];

  // Inventory summary, showing total quantity in hand
  const inventorySummary = {
    quantityInHand: totalQuantityInHand, // Total stock quantity
  };

  // Product summary (static data for now, but can be expanded to include more details)
  const productSummary = { suppliers: suppliers.length, categories: 6 }; // Number of suppliers and categories

  return (
    <div className="admin-main-dashboard-wrapper">
      <div className="admin-main-dashboard">
        {/* Top Selling Products Table */}
        <TopSellingTable products={topSellingProducts} />

        {/* Low Stock Items List */}
        <LowStockList items={lowStockItems} />

        {/* Sales and Purchase Chart */}
        <SalesPurchaseChart data={salesPurchaseData} />

        {/* Inventory Summary */}
        <InventoryMainSummary
          quantityInHand={inventorySummary.quantityInHand}
        />

        {/* Product Summary (Suppliers and Categories) */}
        <ProductSummary
          suppliers={productSummary.suppliers}
          categories={productSummary.categories}
        />
      </div>
    </div>
  );
}

export default AdminMainDashboard;
