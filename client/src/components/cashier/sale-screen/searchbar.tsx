// Search Container Component

import React, { useContext } from "react";
import searchIcon from "../../../assets/images/search-icon.svg";
import { SearchContext } from "../../cashier/sale-screen/search-context.tsx";

// Component definition
const SearchContainer: React.FC = () => {
  const { query, setQuery } = useContext(SearchContext);

  // Handle input change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // Render search input with icon
  return (
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
  );
};

export default SearchContainer;
