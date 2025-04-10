import React from "react";
import TopSellingTable from "../../../components/admin/main-dashboard/top-selling-product.tsx";
import LowStockList from "../../../components/admin/main-dashboard/low-quantity-stocks.tsx";
import SalesPurchaseChart from "../../../components/admin/main-dashboard/sales-purchase-charts.tsx";
import InventorySummary from "../../../components/admin/main-dashboard/inventory-summary.tsx";
import ProductSummary from "../../../components/admin/main-dashboard/product-summary.tsx";
import mouseImage from "../../../assets/images/mouse.png";
import keyboardImage from "../../../assets/images/keyboard.png";

import "../../../styles/admin/admin-main-dashboard.css";

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

  // Inventory summary
  const inventorySummary = { quantityInHand: 868, toBeReceived: 200 };

  // Product summary
  const productSummary = { suppliers: 31, categories: 6 };

  return (
    <div className="admin-main-dashboard-wrapper">
      <div className="admin-main-dashboard">
        <TopSellingTable products={topSellingProducts} />
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
