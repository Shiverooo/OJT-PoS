// Best Selling Product Section Component

import React from "react";

// Define the structure for a product
interface Product {
  product: string;
  id: string;
  category: string;
  quantity: number;
  turnover: number;
  increase: string;
}

// Define props for the BestSellingProduct component
interface BestSellingProductProps {
  paginatedData: Product[]; // Paginated product data
  currentPage: number; // Current page number
  totalPages: number; // Total number of pages
  onPrevPage: () => void; // Function to go to previous page
  onNextPage: () => void; // Function to go to next page
}

const BestSellingProduct: React.FC<BestSellingProductProps> = ({
  paginatedData,
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}) => {
  return (
    <div className="best-selling-product">
      <div className="best-product">
        <h2>Best Selling Product</h2>

        {/* Product table displaying paginated product data */}
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
            {/* Map over paginatedData and display product information */}
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

        {/* Pagination controls */}
        <div className="sale-pagination">
          {/* Button for navigating to the previous page */}
          <button onClick={onPrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {totalPages === 0 ? 1 : currentPage} of {totalPages || 1}
          </span>
          {/* Button for navigating to the next page */}
          <button onClick={onNextPage} disabled={currentPage >= totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestSellingProduct;
