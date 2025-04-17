import React, { useState, useEffect } from "react";
import "../../../styles/admin/product-management.css";
import ProductSection from "../../../components/admin/product-management/product-section.tsx";
import SearchBar from "../../../components/admin/product-management/search-bar.tsx";
import InventorySummary from "../../../components/admin/product-management/InventorySummary.tsx";

const initialProductData: Product[] = [];

type Product = {
  name: string;
  barcode: string;
  price: string;
  quantity: number;
};

function ProductManagement() {
  const [productList, setProductList] = useState<Product[]>(initialProductData);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [productsPerPage, setProductsPerPage] = useState<number>(() => {
    return window.innerWidth <= 1366 ? 6 : 8;
  });

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

  const getStatusClass = (quantity: number): string => {
    if (quantity === 0) return "status-out-of-stock";
    if (quantity < 5) return "status-low-stock";
    return "status-in-stock";
  };

  const handleAddProduct = (newProduct: Product) => {
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
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const outOfStockCount = productList.filter((prod) => prod.quantity === 0).length;

  return (
    <div className="management-container">
      <SearchBar
        searchQuery={searchQuery}
        handleInputChange={handleInputChange}
        setShowModal={setShowModal}
      />

      <InventorySummary
        totalProducts={productList.length}
        outOfStockCount={outOfStockCount}
      />

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
