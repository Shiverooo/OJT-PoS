import React, { useState } from "react";
import "../../../styles/admin/supplier.css";
import searchIcon from "../../../assets/images/search-icon.svg";

function Supplier() {
  const [suppliers, setSuppliers] = useState([]); // Example: fetch or define supplier data here
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(suppliers.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Get paginated suppliers
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSuppliers = suppliers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="supplier-page">
        <div className="search-supplier">
          <div className="search-bar-supplier">
            <img src={searchIcon} alt="Search Icon" className="search-icon" />
            <input
              type="text"
              placeholder="Search supplier name"
              className="supplier-search-input"
            />
          </div>
        </div>
      </div>

      <div className="supplier-section">
        <div className="supplier-header">
          <h3>Supplier</h3>
          <div>
            <button className="btn-add-supplier">Add Supplier</button>
            <button className="btn-filters-supplier">Filters</button>
          </div>
        </div>

        <div className="supplier-table-wrapper">
          <table className="supplier-table">
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>Products</th>
                <th>Contact Number</th>
                <th>Email Address</th>
                <th>Date Added</th>
              </tr>
            </thead>
            <tbody>
              {currentSuppliers.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center"}}>
                    No suppliers found.
                  </td>
                </tr>
              ) : (
                currentSuppliers.map((supplier, index) => (
                  <tr key={index}>
                    <td>{supplier.name}</td>
                    <td>{supplier.products}</td>
                    <td>{supplier.contact}</td>
                    <td>{supplier.email}</td>
                    <td>{supplier.dateAdded}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="supplier-pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {totalPages === 0 ? 1 : currentPage} of {totalPages === 0 ? 1 : totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={totalPages <= 1 || currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Supplier;
