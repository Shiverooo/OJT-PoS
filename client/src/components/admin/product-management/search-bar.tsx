// Product Management Search Bar Component

import React from "react";
import searchIcon from "../../../assets/images/search-icon.svg";

function SearchBar({ searchQuery, handleInputChange, setShowModal }) {
  return (
    <div className="header-management">
      <div className="search-prod-management">
        {/* Search bar for barcode and product search */}
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

      <div className="header-btn">
        <div>
          {/* Button to open the "Add Product" modal */}
          <button className="btn-add" onClick={() => setShowModal(true)}>
            Add Product
          </button>
          {/* Button for applying filters (no functionality attached here) */}
          <button className="btn-filters">Filters</button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
