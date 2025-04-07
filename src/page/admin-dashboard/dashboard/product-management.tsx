import React, { useState } from "react";
import "../../../styles/admin/product-management.css";
import searchIcon from "../../../assets/images/search-icon.svg";

// Dummy product data (extend to test pagination)
const productData = [
  {
    barcode: "8 1234 2145 9",
    name: "Red Dragon Mouse",
    price: "₱1,000.00",
    quantity: 12,
    date: "11/12/22",
    status: "In-stock",
  },
  {
    barcode: "6 1234 5268 1",
    name: "RAPOO Keyboard",
    price: "₱1,500.00",
    quantity: 10,
    date: "21/12/22",
    status: "Out of stock",
  },
  {
    barcode: "6 1234 5268 2",
    name: "N-VISION 23.8 Inch",
    price: "₱5,000.00",
    quantity: 8,
    date: "5/12/22",
    status: "In-stock",
  },
  {
    barcode: "6 1234 5268 3",
    name: "IN PLAY Speaker Small",
    price: "₱500.00",
    quantity: 10,
    date: "8/12/22",
    status: "Out of stock",
  },
  {
    barcode: "6 1234 5268 4",
    name: "AULA Mouse and Keyboard",
    price: "₱293.00",
    quantity: 10,
    date: "9/1/23",
    status: "In-stock",
  },
  ...Array.from({ length: 25 }, (_, i) => ({
    barcode: `6 1234 5268 ${i}`,
    name: `Sample Product ${i + 1}`,
    price: `₱${(1000 + i * 2).toFixed(2)}`,
    quantity: Math.floor(Math.random() * 20),
    date: "1/1/23",
    status: i % 2 === 0 ? "In-stock" : "Out of stock",
  })),
];

function ProductManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "in-stock":
        return "status-in-stock";
      case "out of stock":
        return "status-out-of-stock";
      case "low stock":
        return "status-low-stock";
      default:
        return "";
    }
  };

  const filteredProducts = productData.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.barcode.includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // Overall Inventory Details
  const totalCategories = 6; // Assuming there are 6 categories
  const totalProducts = productData.length;
  const outOfStockCount = productData.filter(
    (prod) => prod.status === "Out of stock"
  ).length;

  return (
    <div className="management-container">
      <div className="header-management">
        <div className="search-prod-management">
          <div className="search-bar-management">
            <img src={searchIcon} alt="Search Icon" className="search-icon" />
            <input
              type="text"
              placeholder="Search barcode and products"
              className="prod-search-input"
              value={searchQuery}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div class="prod-inventory-summary">
        <h3>Overall Inventory</h3>
        <div class="inventory-grid">
          <div class="inventory-box">
            <p class="label">Categories</p>
            <p class="value">6</p>
          </div>
          <div class="inventory-box">
            <p class="label">Total Products</p>
            <p className="value">{totalProducts}</p>
          </div>
          <div class="inventory-box">
            <p class="label">Top Selling</p>
            <p class="value">5</p>
          </div>
          <div class="inventory-box">
            <p class="label">Out of Stock Items</p>
            <p className="value">{outOfStockCount}</p>
          </div>
        </div>
      </div>

      <div className="products-section">
        <div className="products-header">
          <h3>Products</h3>
          <div>
            <button className="btn-add">Add Product</button>
            <button className="btn-filters">Filters</button>
          </div>
        </div>

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
                    <span className={`status ${getStatusClass(prod.status)}`}>
                      {prod.status}
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
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductManagement;
