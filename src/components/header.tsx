import React, { useState } from "react";
import menuIcon from "../assets/images/menu-icon.svg";
import barcodeIcon from "../assets/images/barcode-icon.svg";
import searchIcon from "../assets/images/search-icon.svg";
import Sidebar from "../components/Sidebar.tsx";
import "../styles/cashier/header.css";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [query, setQuery] = useState("");
  const today = new Date().toLocaleDateString("en-US");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    console.log("Searching for:", event.target.value); // Debugging
  };

  return (
    <header className="header">
      <div className="header-left">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <img
          src={menuIcon}
          alt="Menu"
          className="icon"
          id="menu-icon"
          onClick={toggleSidebar}
        />
        <span className="title">Products</span>

        <div className="header-icons">
          <img
            src={barcodeIcon}
            alt="Barcode"
            className="icon"
            id="barcode-icon"
          />

          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search"
              value={query}
              onChange={handleSearch}
            />
            <img src={searchIcon} alt="Search" className="search-icon" />
          </div>
        </div>
      </div>

      {/* Right Section - White Background */}
      <div className="header-right">
        <span className="receipt-text">Receipt</span>
        <span className="date-text">DATE: {today}</span>
      </div>
    </header>
  );
}

export default Header;
