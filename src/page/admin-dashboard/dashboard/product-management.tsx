import React, { useState } from 'react';
import '../../../styles/admin/product-management.css'; 
import searchIcon from "../../../assets/images/search-icon.svg"; 

// Functional component for Product Management
function ProductManagement() {
  const [searchQuery, setSearchQuery] = useState(''); 

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="management-container">
      <div className="header-management">
        <div className="search-prod-management">
          <div className="search-bar-management">
            <img 
              src={searchIcon} 
              alt="Search Icon" 
              className="search-icon" 
            />
            <input
              type="text"
              placeholder="Search product, supplier, order"
              className="prod-search-input"
              value={searchQuery} 
              onChange={handleInputChange} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductManagement;
