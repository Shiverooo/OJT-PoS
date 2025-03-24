import React, { useEffect } from "react";
import "../../../styles/cashier/inventory.css";
import searchIcon from "../../../assets/images/search-icon.svg";

function Inventory() {
  useEffect(() => {
    document.title = "Infinitum PoS | Inventory";
  }, []);

  return (
    <div className="inventory-container">
      <div className="search-bar-container">
        <div className="search-box">
          <img src={searchIcon} alt="Search Icon" className="search-icon" />
          <input
            type="text"
            placeholder="Search By Name"
            className="search-input"
          />
        </div>
        <div className="search-box">
          <img src={searchIcon} alt="Search Icon" className="search-icon" />
          <input
            type="text"
            placeholder="Search By Barcode"
            className="search-input"
          />
        </div>
      </div>

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

      <div className="table-body">
        {[...Array(20)].map((_, index) => (
          <div className="table-row" key={index}>
            <div className="row-item">041 92847758 89</div>
            <div className="row-item">Red Dragon Mouse</div>
            <div className="row-item">Mouse and Keyboard</div>
            <div className="row-item">Red Dragon Philippines</div>
            <div className="row-item">$100</div>
            <div className="row-item">01/01/2025</div>
            <div className="row-item">5</div>
            <div className="row-item status-low">LOW</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventory;
