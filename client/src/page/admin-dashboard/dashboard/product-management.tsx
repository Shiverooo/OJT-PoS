import React, { useState, useEffect } from "react";
import "../../../styles/admin/product-management.css";
import ProductSection from "../../../components/admin/product-management/product-section.tsx";
import SearchBar from "../../../components/admin/product-management/search-bar.tsx";
import InventorySummary from "../../../components/admin/product-management/InventorySummary.tsx";

// Initial empty product list
const initialProductData: Product[] = [];

type Product = {
  name: string;
  barcode: string;
  price: string;
  quantity: number;
};

function ProductManagement() {
  // 🔹 State hooks for managing product list, search query, and pagination
  const [productList, setProductList] = useState<Product[]>(initialProductData); // Stores all products
  const [searchQuery, setSearchQuery] = useState<string>(""); // Stores search query
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page in pagination
  const [showModal, setShowModal] = useState<boolean>(false); // Controls modal visibility
  const [productsPerPage, setProductsPerPage] = useState<number>(() => {
    return window.innerWidth <= 1366 ? 6 : 8; // Set default number of products per page based on window width
  });

  // Adjust the number of products per page on window resize
  useEffect(() => {
    const updateProductsPerPage = () => {
      if (window.innerWidth <= 1366) {
        setProductsPerPage(6);
      } else {
        setProductsPerPage(8);
      }
    };

    window.addEventListener("resize", updateProductsPerPage); 
    return () => window.removeEventListener("resize", updateProductsPerPage); 
  }, []);

  // Handle search query input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update the search query state
    setCurrentPage(1); // Reset to first page whenever search query changes
  };

  // Format product price to PHP currency format
  const formatPrice = (price: string) => {
    const priceNumber = parseFloat(price.replace(/[^\d.-]/g, "")); // Remove non-numeric characters
    return isNaN(priceNumber)
      ? price
      : new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(priceNumber); // Format price as PHP currency
  };

  // Get the product stock status class based on quantity
  const getStatusClass = (quantity: number): string => {
    if (quantity === 0) return "status-out-of-stock"; // Out of stock
    if (quantity < 5) return "status-low-stock"; // Low stock
    return "status-in-stock"; // In stock
  };

  // Add a new product to the product list
  const handleAddProduct = (newProduct: Product) => {
    const updatedProducts = [...productList, newProduct]; // Add new product to the list
    setProductList(updatedProducts); // Update product list
    const newTotalPages = Math.ceil(updatedProducts.length / productsPerPage); // Recalculate total pages
    setCurrentPage(newTotalPages); // Update current page
  };

  // Filter products based on search query (by name or barcode)
  const filteredProducts = productList.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.barcode.includes(searchQuery)
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage); 
  const indexOfLastProduct = currentPage * productsPerPage; 
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; 
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct); 

  // Pagination controls (next and previous)
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1); 
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1); 
  };

  // Count the number of out-of-stock products
  const outOfStockCount = productList.filter((prod) => prod.quantity === 0).length;

  return (
    <div className="management-container">
      {/* Search Bar Component */}
      <SearchBar
        searchQuery={searchQuery}
        handleInputChange={handleInputChange}
        setShowModal={setShowModal} // Pass modal visibility control
      />

      {/* Inventory Summary */}
      <InventorySummary
        totalProducts={productList.length} // Total number of products
        outOfStockCount={outOfStockCount} // Number of out-of-stock products
      />

      {/* Product Section (displays filtered and paginated products) */}
      <ProductSection
        searchQuery={searchQuery}
        handleInputChange={handleInputChange}
        currentProducts={currentProducts.map((product) => ({
          ...product,
          price: formatPrice(product.price), // Format price for each product
        }))}
        getStatusClass={getStatusClass} // Get stock status for each product
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        currentPage={currentPage}
        totalPages={totalPages}
        setShowModal={setShowModal} // Modal visibility control
        showModal={showModal}
        outOfStockCount={outOfStockCount}
        handleAddProduct={handleAddProduct} // Handle adding new products
      />
    </div>
  );
}

export default ProductManagement;
