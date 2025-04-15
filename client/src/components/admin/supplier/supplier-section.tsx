import React from "react";
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
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSuppliers = filteredSuppliers.slice(startIndex, startIndex + itemsPerPage);

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
              <th>Date Added</th>
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
