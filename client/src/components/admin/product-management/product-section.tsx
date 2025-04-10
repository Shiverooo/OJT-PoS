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
  handleAddProduct,
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

      <AddProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAddProduct={handleAddProduct}
      />

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

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {totalPages === 0 ? 1 : currentPage} of{" "}
          {totalPages === 0 ? 1 : totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={totalPages <= 1 || currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductSection;
