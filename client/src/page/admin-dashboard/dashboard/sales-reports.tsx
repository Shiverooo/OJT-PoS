import React, { useState } from "react";
import "../../../styles/admin/sales-report.css";
import SalesPurchaseChart from "../../../components/admin/main-dashboard/sales-purchase-charts.tsx";
import BestSellingCategory from "../../../components/admin/sale-reports/best-selling-category.tsx";
import BestSellingProduct from "../../../components/admin/sale-reports/best-selling-product.tsx";

// Sample data for sales and purchases over months (12 months, realistic values)
const salesPurchaseData = [
  { month: "Jan", purchase: 55000, sales: 49000 },
  { month: "Feb", purchase: 58000, sales: 52000 },
  { month: "Mar", purchase: 47000, sales: 54000 },
  { month: "Apr", purchase: 42000, sales: 44000 },
  { month: "May", purchase: 35000, sales: 47000 },
];

// Sample data for best-selling products
const productData = [];

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
          <SalesPurchaseChart data={salesPurchaseData} height={315} />
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
