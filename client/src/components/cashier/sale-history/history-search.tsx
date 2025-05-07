import React from 'react';
import SearchIcon from "../../../assets/images/search-icon.svg";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const HistorySearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="search-date-container">
      <div className="search-bar">
        <img src={SearchIcon} alt="Search Icon" className="search-icon" />
        <input
          type="text"
          placeholder="Search by date or order number"
          className="search-input"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default HistorySearchBar; 