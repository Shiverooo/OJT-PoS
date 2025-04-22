import React, { useEffect, useState } from "react";
import TopSellingTable from "../../../components/admin/main-dashboard/top-selling-product.tsx";
import LowStockList from "../../../components/admin/main-dashboard/low-quantity-stocks.tsx";
import SalesPurchaseChart from "../../../components/admin/main-dashboard/sales-purchase-charts.tsx";
import InventoryMainSummary from "../../../components/admin/main-dashboard/inventory-summary.tsx";
import ProductSummary from "../../../components/admin/main-dashboard/product-summary.tsx";
import "../../../styles/admin/admin-main-dashboard.css";

function AdminMainDashboard() {
  // 🔹 States for low stock items from localStorage
  const [lowStockItems, setLowStockItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]); // Store products
  const [showModal, setShowModal] = useState(false); // For the add product modal

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    const lowStock = storedProducts.filter((item) => item.quantity < 15);
    setLowStockItems(lowStock);
    setCurrentProducts(storedProducts); // Set the products from localStorage
  }, []);

  // Calculate total quantity in hand
  const totalQuantityInHand = currentProducts.reduce(
    (total, product) => total + product.quantity,
    0
  );

  // Sample static data
  const topSellingProducts = [
    { name: "Red Dragon Mouse", sold: 40, remaining: 10, price: "$100" },
    { name: "RAPOO Keyboard", sold: 30, remaining: 12, price: "$150" },
  ];

  const salesPurchaseData = [
    { month: "Jan", purchase: 1000, sales: 2000 },
    { month: "Feb", purchase: 2000, sales: 3000 },
    { month: "Mar", purchase: 3000, sales: 1000 },
    { month: "Apr", purchase: 4000, sales: 5000 },
    { month: "May", purchase: 5000, sales: 4000 },
  ];

  const inventorySummary = {
    quantityInHand: totalQuantityInHand,
    toBeReceived: 200,
  }; // Pass calculated total

  const productSummary = { suppliers: suppliers.length, categories: 6 };

  return (
    <div className="admin-main-dashboard-wrapper">
      <div className="admin-main-dashboard">
        <TopSellingTable products={topSellingProducts} />
        <LowStockList items={lowStockItems} />
        <SalesPurchaseChart data={salesPurchaseData} />
        <InventoryMainSummary
          quantityInHand={inventorySummary.quantityInHand}
        />
        <ProductSummary
          suppliers={productSummary.suppliers}
          categories={productSummary.categories}
        />
      </div>
    </div>
  );
}

export default AdminMainDashboard;
