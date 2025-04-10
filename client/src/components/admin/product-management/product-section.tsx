import React from "react";
import AddProductModal from "../../../components/admin/product-management/AddProductModal.tsx";

const ProductSection = ({
  searchQuery,
  handleInputChange,
  currentProducts,
  getStatusClass,
  handlePrevPage,
  handleNextPage,
  currentPage,
  totalPages,
  setShowModal,
  showModal,
  outOfStockCount,
}) => {
  return (
    <div className="products-section">
      <div className="products-header">
        <h3>Products</h3>
        <div>
          <button className="btn-add" onClick={() => setShowModal(true)}>
            Add Product
          </button>
          <button className="btn-filters">Filters</button>
        </div>
      </div>

      <AddProductModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* Table showing the list of products */}
      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Barcode</th>
              <th>Products</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Date Added</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Display the filtered and paginated products */}
            {currentProducts.map((prod, index) => (
              <tr key={index}>
                <td>{prod.barcode}</td>
                <td>{prod.name}</td>
                <td>{prod.price}</td>
                <td>{prod.quantity}</td>
                <td>{prod.date}</td>
                <td>
                  <span className={`status ${getStatusClass(prod.quantity)}`}>
                    {prod.quantity === 0
                      ? "Out of stock"
                      : prod.quantity < 5
                      ? "Low stock"
                      : "In stock"}
                  </span>
                </td>
              </tr>
            ))}
            {/* If no products are found, display a message */}
            {currentProducts.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductSection;
