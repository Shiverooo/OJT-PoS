import React, { useState } from "react";
import "../../../styles/admin/sales-report.css";
import SalesPurchaseChart from "../../../components/admin/main-dashboard/sales-purchase-charts.tsx";
import BestSellingCategory from "../../../components/admin/sale-reports/best-selling-category.tsx";
import BestSellingProduct from "../../../components/admin/sale-reports/best-selling-product.tsx";

// Sample data for sales and purchases over months
const salesPurchaseData = [
  { month: "Jan", purchase: 1000, sales: 2000 },
  { month: "Feb", purchase: 2000, sales: 3000 },
  { month: "Mar", purchase: 3000, sales: 1000 },
  { month: "Apr", purchase: 4000, sales: 5000 },
  { month: "May", purchase: 5000, sales: 4000 },
];

// Sample data for best-selling products
const productData = [
  {
    product: "Keyboard",
    id: "P-1022",
    category: "Peripherals",
    quantity: 34,
    turnover: 26000,
    increase: "3.2%",
  },
  {
    product: "Monitor",
    id: "P-1009",
    category: "Display",
    quantity: 19,
    turnover: 22000,
    increase: "2%",
  },
  {
    product: "RAM",
    id: "P-1044",
    category: "Memory",
    quantity: 27,
    turnover: 22000,
    increase: "1.5%",
  },
];

function SalesReport() {
  // 🔹 State to track the current page for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9; // Number of products to display per page

  // Calculate total number of pages based on product data and page size
  const totalPages = Math.ceil(productData.length / pageSize);

  // Navigate to the previous page
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1)); // Ensure we don't go below page 1
  };

  // Navigate to the next page
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages)); 
  };

  // Slice the product data based on the current page for pagination
  const paginatedData = productData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="sales-report-wrapper">
      <div className="sales-report-container">
        {/* Sales and Purchase Chart */}
        <div className="sales-chart-container">
          <SalesPurchaseChart data={salesPurchaseData} height={315} />{" "}
          {/* Chart displaying sales/purchase data */}
        </div>

        {/* Best Selling Category Section */}
        <BestSellingCategory />
      </div>

      {/* Best Selling Product Table with Pagination */}
      <BestSellingProduct
        paginatedData={paginatedData} 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPrevPage={handlePrevPage} 
        onNextPage={handleNextPage} 
      />
    </div>
  );
}

export default SalesReport;
