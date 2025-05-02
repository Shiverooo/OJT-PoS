import React, { useEffect, useState } from "react";
import "../../../styles/cashier/inventory.css";
import searchIcon from "../../../assets/images/search-icon.svg";

// Define the type for inventory items
interface InventoryItem {
  barcode: string;
  name: string;
  category: string;
  supplier: string;
  price: string;
  dateAdded: string;
  stocks: number;
  status: "IN-STOCK" | "LOW" | "OUT-OF-STOCK"; // Only these three statuses are allowed
}

function Inventory() {
  // Set the page title when component mounts
  useEffect(() => {
    document.title = "Infinitum PoS | Inventory";
  }, []);

  // State for inventory items
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);

  // State to handle search by name and barcode
  const [nameSearch, setNameSearch] = useState("");
  const [barcodeSearch, setBarcodeSearch] = useState("");

  // Filter data based on search criteria
  const filteredData = inventoryItems.filter((item) => {
    const matchesName = nameSearch
      ? item.name.toLowerCase().includes(nameSearch.toLowerCase())
      : true;
    const matchesBarcode = barcodeSearch
      ? item.barcode.includes(barcodeSearch)
      : true;
    return matchesName && matchesBarcode;
  });

  // Inside the useEffect where products are loaded
  const getProductStatus = (quantity: number) => {
    if (quantity === 0) return "OUT-OF-STOCK";
    if (quantity < 5) return "LOW";
    return "IN-STOCK";
  };

  useEffect(() => {
    const loadProducts = () => {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        const products = JSON.parse(storedProducts);
        // Transform the products to match the inventory item structure
        const transformedProducts = products.map((product: any) => ({
          barcode: product.barcode,
          name: product.name,
          category: product.category,
          supplier: product.supplier,
          price: `₱${parseFloat(product.price).toLocaleString()}`,
          dateAdded: new Date(product.dateAdded).toLocaleDateString(),
          stocks: product.quantity,
          status: getProductStatus(product.quantity)
        }));
        setInventoryItems(transformedProducts);
      }
    };

    loadProducts();

    // Add event listener for storage changes
    window.addEventListener('storage', loadProducts);

    // Cleanup
    return () => {
      window.removeEventListener('storage', loadProducts);
    };
  }, []);

  return (
    <div className="inventory-container">
      {/* Search Bar for name and barcode */}
      <div className="search-bar-container">
        <div className="search-box">
          <img src={searchIcon} alt="Search Icon" className="search-icon" />
          <input
            type="text"
            placeholder="Search By Name"
            className="search-input"
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
          />
        </div>
        <div className="search-box">
          <img src={searchIcon} alt="Search Icon" className="search-icon" />
          <input
            type="text"
            placeholder="Search By Barcode"
            className="search-input"
            value={barcodeSearch}
            onChange={(e) => setBarcodeSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table Header */}
      <div className="table-header">
        <div className="header-item">BARCODE</div>
        <div className="header-item">NAME</div>
        <div className="header-item">CATEGORY</div>
        <div className="header-item">SUPPLIER</div>
        <div className="header-item">PRICE</div>
        <div className="header-item">DATE ADDED</div>
        <div className="header-item">STOCKS</div>
        <div className="header-item">STATUS</div>
      </div>

      {/* Table Body with filtered items or No Items message */}
      <div className="table-body">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div className="table-row" key={index}>
              <div className="row-item">{item.barcode}</div>
              <div className="row-item">{item.name}</div>
              <div className="row-item">{item.category}</div>
              <div className="row-item">{item.supplier}</div>
              <div className="row-item">{item.price}</div>
              <div className="row-item">{item.dateAdded}</div>
              <div className="row-item">{item.stocks}</div>
              <div className={`row-item status-${item.status.toLowerCase()}`}>
                {item.status}
              </div>
            </div>
          ))
        ) : (
          <div className="no-items-message">
            <p>No product items available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Inventory;
