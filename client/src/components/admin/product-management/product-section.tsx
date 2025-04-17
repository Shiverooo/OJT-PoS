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
  // Format date from YYYY-MM-DD to MM-DD-YYYY
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${mm}-${dd}-${yyyy}`;
  };

  return (
    <div className="products-section">
      <div className="products-header">
        <h3>Products</h3>
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
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <tr key={product.barcode}>
                  <td>{product.barcode}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{formatDate(product.date)}</td>
                  <td>
                    <span
                      className={`status ${getStatusClass(product.quantity)}`}
                    >
                      {product.quantity === 0
                        ? "Out of stock"
                        : product.quantity < 5
                        ? "Low stock"
                        : "In stock"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
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
