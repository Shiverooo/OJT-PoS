import React, { useEffect, useState } from "react";
import "../../../styles/cashier/inventory.css";
import searchIcon from "../../../assets/images/search-icon.svg";

function Inventory() {
  // Set the page title when component mounts
  useEffect(() => {
    document.title = "Infinitum PoS | Inventory";
  }, []);

  // Sample data for inventory items
  const sampleData = [
    {
      barcode: "0419284775889",
      name: "Red Dragon Mouse",
      category: "Mouse and Keyboard",
      supplier: "Red Dragon Philippines",
      price: "₱100",
      dateAdded: "03/21/2025",
      stocks: 5,
      status: "LOW",
    },
    {
      barcode: "1593578524680",
      name: "Acer Predator Laptop",
      category: "Laptops and Desktops",
      supplier: "Acer PH",
      price: "₱85,000",
      dateAdded: "03/22/2025",
      stocks: 10,
      status: "IN-STOCK",
    },
    {
      barcode: "2584561237890",
      name: "HP DeskJet 2722",
      category: "Printers and Ink",
      supplier: "HP Distributors",
      price: "₱4,500",
      dateAdded: "03/23/2025",
      stocks: 7,
      status: "OUT-OF-STOCK",
    },
    {
      barcode: "3698521470123",
      name: "Dell UltraSharp Monitor",
      category: "Monitors",
      supplier: "Dell PH",
      price: "₱18,000",
      dateAdded: "03/24/2025",
      stocks: 3,
      status: "LOW",
    },
    {
      barcode: "1472583690123",
      name: "Seagate External HDD 1TB",
      category: "Storage",
      supplier: "Seagate PH",
      price: "₱3,200",
      dateAdded: "03/25/2025",
      stocks: 12,
      status: "BACKORDERED",
    },
    {
      barcode: "7539518520147",
      name: "Logitech Gaming Headset",
      category: "Gaming Devices",
      supplier: "Logitech PH",
      price: "₱2,800",
      dateAdded: "03/22/2025",
      stocks: 4,
      status: "LOW",
    },
    {
      barcode: "9632587410456",
      name: "USB-C Hub Adapter",
      category: "Other Accessories",
      supplier: "Tech Supplier PH",
      price: "₱950",
      dateAdded: "03/23/2025",
      stocks: 20,
      status: "IN-STOCK",
    },
  ];

  // State to handle search by name and barcode
  const [nameSearch, setNameSearch] = useState("");
  const [barcodeSearch, setBarcodeSearch] = useState("");

  // Filter data based on search criteria
  const filteredData = sampleData.filter((item) => {
    const matchesName = nameSearch
      ? item.name.toLowerCase().includes(nameSearch.toLowerCase())
      : true;
    const matchesBarcode = barcodeSearch
      ? item.barcode.includes(barcodeSearch)
      : true;
    return matchesName && matchesBarcode;
  });

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

      {/* Table Body with filtered items */}
      <div className="table-body">
        {filteredData.map((item, index) => (
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
        ))}
      </div>
    </div>
  );
}

export default Inventory;
