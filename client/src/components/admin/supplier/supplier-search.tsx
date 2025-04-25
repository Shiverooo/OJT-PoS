// Supplier Search Component

import React from "react";
import "../../../styles/admin/supplier.css";
import searchIcon from "../../../assets/images/search-icon.svg";

// Define props for SupplierSearch component
interface SupplierSearchProps {
  searchQuery: string; 
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>; // Function to update search query
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // Function to reset to page 1 on search change
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>; // Function to show modal for adding a new supplier
}

const SupplierSearch: React.FC<SupplierSearchProps> = ({
  searchQuery,
  setSearchQuery,
  setCurrentPage,
  setShowModal,
}) => {
  return (
    <div className="supplier-page">
      {/* Search bar section */}
      <div className="search-supplier">
        <div className="search-bar-supplier">
          {/* Search icon */}
          <img src={searchIcon} alt="Search Icon" className="search-icon" />
          {/* Search input */}
          <input
            type="text"
            placeholder="Search supplier"
            className="supplier-search-input"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value); // Update search query state
              setCurrentPage(1); // Reset to page 1 whenever the search query changes
            }}
          />
        </div>
      </div>

      {/* Actions: Add Supplier and Filters buttons */}
      <div className="supplier-search-actions">
        <button
          className="btn-add-supplier"
          onClick={() => setShowModal(true)} // Open Add Supplier modal
        >
          Add Supplier
        </button>
        <button className="btn-filters-supplier">Filters</button>
      </div>
    </div>
  );
};

export default SupplierSearch;
