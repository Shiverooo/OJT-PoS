// src/pages/admin/product-management/ProductManagement.tsx
import React, { useState } from "react";
import ProductSection from "../../../components/admin/product-management/product-section.tsx"; // Import the ProductSection component
import "../../../styles/admin/product-management.css"; // Import CSS styles for this page
import searchIcon from "../../../assets/images/search-icon.svg"; // Import the search icon image

// Dummy product data (extend to test pagination)
const productData = [
  {
    barcode: "8 1234 2145 9",
    name: "Red Dragon Mouse",
    price: "₱1,000.00",
    quantity: 12,
    date: "11/12/22",
  },
  {
    barcode: "6 1234 5268 1",
    name: "RAPOO Keyboard",
    price: "₱1,500.00",
    quantity: 0,
    date: "21/12/22",
  },
  {
    barcode: "6 1234 5268 2",
    name: "N-VISION 23.8 Inch",
    price: "₱5,000.00",
    quantity: 8,
    date: "5/12/22",
  },
  {
    barcode: "6 1234 5268 3",
    name: "IN PLAY Speaker Small",
    price: "₱500.00",
    quantity: 0,
    date: "8/12/22",
  },
  {
    barcode: "6 1234 5268 4",
    name: "AULA Mouse and Keyboard",
    price: "₱293.00",
    quantity: 10,
    date: "9/1/23",
  },
  // Add additional dummy product data
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

  // Function to handle changes in the search input
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value); 
    setCurrentPage(1); 
  };

  // Function to determine the status class based on the product quantity
  const getStatusClass = (quantity) => {
    if (quantity === 0) {
      return "status-out-of-stock"; // Out of stock
    } else if (quantity < 5) {
      return "status-low-stock"; // Low stock
    } else {
      return "status-in-stock"; // In stock
    }
  };

  // Add Product button Modal state
  const [showModal, setShowModal] = useState(false);

  // Filter products based on the search query (name or barcode)
  const filteredProducts = productData.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.barcode.includes(searchQuery)
  );

  // Calculate pagination details
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Functions to navigate between pages
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1); 
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1); 
  };

  // Count the number of products that are out of stock
  const outOfStockCount = productData.filter(
    (prod) => prod.status === "Out of stock"
  ).length;

  return (
    <div className="management-container">
      <div className="header-management">
        {/* Search bar section */}
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

      {/* Inventory summary section */}
      <div className="prod-inventory-summary">
        <h3>Overall Inventory</h3>
        <div className="inventory-grid">
          <div className="inventory-box">
            <p className="label">Categories</p>
            <p className="value">6</p> 
          </div>
          <div className="inventory-box">
            <p className="label">Total Products</p>
            <p className="value">{productData.length}</p> 
          </div>
          <div className="inventory-box">
            <p className="label">Top Selling</p>
            <p className="value">5</p> 
          </div>
          <div className="inventory-box">
            <p className="label">Out of Stock Items</p>
            <p className="value">{outOfStockCount}</p> 
          </div>
        </div>
      </div>

      {/* Pass the filtered products and other necessary props to ProductSection */}
      <ProductSection
        searchQuery={searchQuery} 
        handleInputChange={handleInputChange} 
        currentProducts={currentProducts} 
        getStatusClass={getStatusClass} 
        handlePrevPage={handlePrevPage} 
        handleNextPage={handleNextPage} 
        currentPage={currentPage} 
        totalPages={totalPages} 
        setShowModal={setShowModal}
        showModal={showModal} 
        outOfStockCount={outOfStockCount} 
      />
    </div>
  );
}

export default ProductManagement;
