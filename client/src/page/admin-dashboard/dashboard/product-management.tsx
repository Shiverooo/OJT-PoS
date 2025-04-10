import React, { useState } from "react";
import ProductSection from "../../../components/admin/product-management/product-section.tsx";
import "../../../styles/admin/product-management.css";
import searchIcon from "../../../assets/images/search-icon.svg";

const initialProductData = [];

function ProductManagement() {
  const [productList, setProductList] = useState(initialProductData);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const productsPerPage = 8;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const formatPrice = (price: string) => {
    const priceNumber = parseFloat(price.replace(/[^\d.-]/g, ""));
    return isNaN(priceNumber)
      ? price
      : new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(priceNumber);
  };

  const getStatusClass = (quantity: number) => {
    if (quantity === 0) return "status-out-of-stock";
    if (quantity < 5) return "status-low-stock";
    return "status-in-stock";
  };

  const handleAddProduct = (newProduct) => {
    const updatedProducts = [...productList, newProduct];
    setProductList(updatedProducts);
    const newTotalPages = Math.ceil(updatedProducts.length / productsPerPage);
    setCurrentPage(newTotalPages);
  };

  const filteredProducts = productList.filter(
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

  const outOfStockCount = productList.filter(
    (prod) => prod.quantity === 0
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

      <div className="prod-inventory-summary">
        <h3>Overall Inventory</h3>
        <div className="inventory-grid">
          <div className="inventory-box">
            <p className="label">Categories</p>
            <p className="value">6</p>
          </div>
          <div className="inventory-box">
            <p className="label">Total Products</p>
            <p className="value">{productList.length}</p>
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

      <ProductSection
        searchQuery={searchQuery}
        handleInputChange={handleInputChange}
        currentProducts={currentProducts.map((product) => ({
          ...product,
          price: formatPrice(product.price),
        }))}
        getStatusClass={getStatusClass}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        currentPage={currentPage}
        totalPages={totalPages}
        setShowModal={setShowModal}
        showModal={showModal}
        outOfStockCount={outOfStockCount}
        handleAddProduct={handleAddProduct}
      />
    </div>
  );
}

export default ProductManagement;
