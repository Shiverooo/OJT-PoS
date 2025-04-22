import React, { useState, useEffect } from "react";
import "../../../styles/admin/supplier.css";
import AddSupplierModal from "../../../components/admin/supplier/addsuppliermodal.tsx";

interface SupplierSectionProps {
  suppliers: Array<any>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  filteredSuppliers: Array<any>;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handleAddSupplier: (newSupplier: any) => void;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
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
  // State for productsPerPage based on screen width
  const [productsPerPage, setProductsPerPage] = useState<number>(10);

  // Update productsPerPage based on screen width using a media query
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1366) {
        setProductsPerPage(9);
      } else {
        setProductsPerPage(10);
      }
    };

    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const totalPages = Math.ceil(filteredSuppliers.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentSuppliers = filteredSuppliers.slice(startIndex, startIndex + productsPerPage);

  const formatDate = (dateString: string) => {
    const parts = dateString.split("-");
    if (parts.length === 3) {
      return `${parts[0]}-${parts[1]}-${parts[2]}`; 
    }
    return dateString;
  };

  return (
    <div className="supplier-section">
      <div className="supplier-header">
        <h3>Supplier</h3>
      </div>

      <div className="supplier-table-wrapper">
        <table className="supplier-table">
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Location</th>
              <th>Contact Person</th>
              <th>Contact Number</th>
              <th>Email</th>
              <th>Date&Time Added</th>
            </tr>
          </thead>
          <tbody>
            {currentSuppliers.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No suppliers found.
                </td>
              </tr>
            ) : (
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

      <div className="supplier-pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {totalPages === 0 ? 1 : currentPage} of{" "}
          {totalPages === 0 ? 1 : totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={totalPages <= 1 || currentPage >= totalPages}
        >
          Next
        </button>
      </div>

      <AddSupplierModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAddSupplier={handleAddSupplier}
      />
    </div>
  );
};

export default SupplierSection;
