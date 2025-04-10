import React from 'react';
import searchIcon from "../../../assets/images/search-icon.svg";

function SearchBar({
  searchQuery,
  handleInputChange
}) {
  return (
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
  );
}

export default SearchBar;
