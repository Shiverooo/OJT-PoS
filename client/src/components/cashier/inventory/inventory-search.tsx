import React from 'react';
import searchIcon from "../../../assets/images/search-icon.svg";

interface SearchBarProps {
  nameSearch: string;
  barcodeSearch: string;
  onNameSearchChange: (value: string) => void;
  onBarcodeSearchChange: (value: string) => void;
}

const InventorySearchBar: React.FC<SearchBarProps> = ({
  nameSearch,
  barcodeSearch,
  onNameSearchChange,
  onBarcodeSearchChange,
}) => {
  return (
    <div className="search-bar-container">
      <div className="search-box">
        <img src={searchIcon} alt="Search Icon" className="search-icon" />
        <input
          type="text"
          placeholder="Search By Name"
          className="search-input"
          value={nameSearch}
          onChange={(e) => onNameSearchChange(e.target.value)}
        />
      </div>
      <div className="search-box">
        <img src={searchIcon} alt="Search Icon" className="search-icon" />
        <input
          type="text"
          placeholder="Search By Barcode"
          className="search-input"
          value={barcodeSearch}
          onChange={(e) => onBarcodeSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default InventorySearchBar; 