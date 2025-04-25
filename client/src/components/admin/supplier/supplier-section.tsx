// Supplier Section Component

import React, { useState, useEffect } from "react";
import "../../../styles/admin/supplier.css";
import AddSupplierModal from "../../../components/admin/supplier/addsuppliermodal.tsx";

// Define the structure of the SupplierSection props
interface SupplierSectionProps {
  suppliers: Array<any>; // List of all suppliers
  currentPage: number; // Current page number for pagination
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // Function to update the current page
  filteredSuppliers: Array<any>; // List of filtered suppliers based on the search or filters
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handleAddSupplier: (newSupplier: any) => void; // Function to handle adding a new supplier
  showModal: boolean; // Boolean to determine if the "Add Supplier" modal is visible
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>; // Function to toggle the modal visibility
}

const SupplierSection: React.FC<SupplierSectionProps> = ({
  suppliers,
  currentPage,
  setCurrentPage,
  filteredSuppliers,
  handlePrevPage,
  handleNextPage,
  handleAddSupplier,
  showModal,
  setShowModal,
}) => {
  // State to manage the number of suppliers per page based on screen width
  const [productsPerPage, setProductsPerPage] = useState<number>(10);

  // Update productsPerPage based on screen size (responsive design)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1366) {
        setProductsPerPage(9); // Smaller screen, fewer products per page
      } else {
        setProductsPerPage(10); // Default products per page
      }
    };

    handleResize();

    // Listen for window resize events and update productsPerPage accordingly
    window.addEventListener("resize", handleResize);

    // Clean up event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredSuppliers.length / productsPerPage);

  // Determine the starting index for the current page based on the page size
  const startIndex = (currentPage - 1) * productsPerPage;

  // Slice the filtered suppliers to get the current page of suppliers
  const currentSuppliers = filteredSuppliers.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Format the date string (assumes it's in 'YYYY-MM-DD' format)
  const formatDate = (dateString: string) => {
    const parts = dateString.split("-");
    if (parts.length === 3) {
      return `${parts[0]}-${parts[1]}-${parts[2]}`;
    }
    return dateString;
  };

  return (
    <div className="supplier-section">
      {/* Supplier section header */}
      <div className="supplier-header">
        <h3>Supplier</h3>
      </div>

      {/* Supplier table wrapper */}
      <div className="supplier-table-wrapper">
        <table className="supplier-table">
          <thead>
            <tr>
              {/* Table headers */}
              <th>Supplier Name</th>
              <th>Location</th>
              <th>Contact Person</th>
              <th>Contact Number</th>
              <th>Email</th>
              <th>Date&Time Added</th>
            </tr>
          </thead>
          <tbody>
            {/* If no suppliers are found, show a message */}
            {currentSuppliers.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No suppliers found.
                </td>
              </tr>
            ) : (
              // Otherwise, map through the current suppliers and display them in table rows
              currentSuppliers.map((supplier, index) => (
                <tr key={index}>
                  <td>{supplier.name}</td>
                  <td>{supplier.location}</td>
                  <td>{supplier.contactPerson}</td>
                  <td>{supplier.contactNumber}</td>
                  <td>{supplier.email}</td>
                  <td>{formatDate(supplier.dateAdded)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="supplier-pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {totalPages === 0 ? 1 : currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={handleNextPage}
          disabled={totalPages <= 1 || currentPage >= totalPages}
        >
          Next
        </button>
      </div>

      {/* Add Supplier Modal */}
      <AddSupplierModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAddSupplier={handleAddSupplier}
      />
    </div>
  );
};

export default SupplierSection;
