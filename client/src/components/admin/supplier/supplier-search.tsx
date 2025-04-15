import React from "react";
import "../../../styles/admin/supplier.css";
import searchIcon from "../../../assets/images/search-icon.svg";

interface SupplierSearchProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SupplierSearch: React.FC<SupplierSearchProps> = ({
  searchQuery,
  setSearchQuery,
  setCurrentPage,
  setShowModal,
}) => {
  return (
    <div className="supplier-page">
      <div className="search-supplier">
        <div className="search-bar-supplier">
          <img src={searchIcon} alt="Search Icon" className="search-icon" />
          <input
            type="text"
            placeholder="Search supplier"
            className="supplier-search-input"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
      <div className="supplier-search-actions">
        <button className="btn-add-supplier" onClick={() => setShowModal(true)}>
          Add Supplier
        </button>
        <button className="btn-filters-supplier">Filters</button>
      </div>
    </div>
  );
};

export default SupplierSearch;
