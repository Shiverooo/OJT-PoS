import React, { useEffect, useState } from "react";
import TopSellingTable from "../../../components/admin/main-dashboard/top-selling-product.tsx";
import LowStockList from "../../../components/admin/main-dashboard/low-quantity-stocks.tsx";
import SalesPurchaseChart from "../../../components/admin/main-dashboard/sales-purchase-charts.tsx";
import InventorySummary from "../../../components/admin/main-dashboard/inventory-summary.tsx";
import ProductSummary from "../../../components/admin/main-dashboard/product-summary.tsx";
import "../../../styles/admin/admin-main-dashboard.css";

function AdminMainDashboard() {
  // 🔹 States for low stock items from localStorage
  const [lowStockItems, setLowStockItems] = useState([]);

  // 🔹 Load low stock items from localStorage on mount
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    const lowStock = storedProducts.filter((item) => item.quantity < 15);
    setLowStockItems(lowStock);
  }, []);

  // Sample static data (optional to keep or remove)
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

  const inventorySummary = { quantityInHand: 868, toBeReceived: 200 };
  const productSummary = { suppliers: 31, categories: 6 };

  return (
    <div className="admin-main-dashboard-wrapper">
      <div className="admin-main-dashboard">
        <TopSellingTable products={topSellingProducts} />

        {/* 🔸 This now reflects live localStorage low-stock items */}
        <LowStockList items={lowStockItems} />

        <SalesPurchaseChart data={salesPurchaseData} />
        <InventorySummary
          quantityInHand={inventorySummary.quantityInHand}
          toBeReceived={inventorySummary.toBeReceived}
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
