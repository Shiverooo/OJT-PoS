import React, { useState } from "react";
import "../../../styles/admin/sales-report.css";
import SalesPurchaseChart from "../../../components/admin/main-dashboard/sales-purchase-charts.tsx";

const salesPurchaseData = [
  { month: "Jan", purchase: 1000, sales: 2000 },
  { month: "Feb", purchase: 2000, sales: 3000 },
  { month: "Mar", purchase: 3000, sales: 1000 },
  { month: "Apr", purchase: 4000, sales: 5000 },
  { month: "May", purchase: 5000, sales: 4000 },
];

// Dummy product data for pagination
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
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const totalPages = Math.ceil(productData.length / pageSize);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const paginatedData = productData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="sales-report-wrapper">
      <div className="sales-report-container">
        <div className="sales-chart-container">
          <SalesPurchaseChart data={salesPurchaseData} />
        </div>

        <div className="best-selling-category">
          <div className="best-category">
            <h2>Best Selling Category</h2>
            <table>
              <colgroup>
                <col style={{ width: "20%" }} />
                <col style={{ width: "30%" }} />
                <col style={{ width: "30%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Turn Over</th>
                  <th>Increased By</th>
                </tr>
              </thead>
              <tbody>{/* Add category rows here */}</tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="best-selling-product">
        <div className="best-product">
          <h2>Best Selling Product</h2>
          <table className="best-product-table">
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>Product</th>
                <th>Product ID</th>
                <th>Category</th>
                <th>Remaining Quantity</th>
                <th>Turn Over</th>
                <th>Increase By</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.product}</td>
                  <td>{item.id}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>₱{item.turnover.toLocaleString()}</td>
                  <td className="increase">{item.increase}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="sale-pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {totalPages === 0 ? 1 : currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesReport;
