import React, { useState } from "react";
import "../../../styles/admin/supplier.css";
import SupplierSearch from "../../../components/admin/supplier/supplier-search.tsx";
import SupplierSection from "../../../components/admin/supplier/supplier-section.tsx";

const Supplier: React.FC = () => {
  // State hooks to manage suppliers, pagination, modal visibility, and search query
  const [suppliers, setSuppliers] = useState<any[]>([]); // List of suppliers
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page for pagination
  const [showModal, setShowModal] = useState<boolean>(false); // Control modal visibility
  const [searchQuery, setSearchQuery] = useState<string>(""); // Search query for filtering suppliers

  // Navigate to the previous page in pagination
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1); 
  };

  // Navigate to the next page in pagination
  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1); 
  };

  // Add a new supplier to the supplier list
  const handleAddSupplier = (newSupplier: any) => {
    setSuppliers((prevSuppliers) => [newSupplier, ...prevSuppliers]); // Add the new supplier at the beginning of the list
    setCurrentPage(1); 
  };

  // Filter suppliers based on the search query (name, location, contact person, contact number, email)
  const filteredSuppliers = suppliers.filter((supplier) => {
    const query = searchQuery.toLowerCase(); // Convert search query to lowercase for case-insensitive comparison
    return (
      supplier.name.toLowerCase().includes(query) ||
      supplier.location.toLowerCase().includes(query) ||
      supplier.contactPerson.toLowerCase().includes(query) ||
      supplier.contactNumber.toLowerCase().includes(query) ||
      supplier.email.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      {/* Supplier Search Component for filtering suppliers */}
      <SupplierSearch
        searchQuery={searchQuery} // Current search query
        setSearchQuery={setSearchQuery} // Function to update search query
        setCurrentPage={setCurrentPage} // Reset to page 1 when search query changes
        setShowModal={setShowModal} // Control modal visibility for adding suppliers
      />

      {/* Supplier Section Component displaying the suppliers list with pagination */}
      <SupplierSection
        suppliers={suppliers} // All suppliers
        currentPage={currentPage} // Current page number
        setCurrentPage={setCurrentPage} // Function to update the current page
        filteredSuppliers={filteredSuppliers} // Filtered suppliers based on search query
        handlePrevPage={handlePrevPage} // Function to handle the "Previous Page" button click
        handleNextPage={handleNextPage} // Function to handle the "Next Page" button click
        handleAddSupplier={handleAddSupplier} // Function to add a new supplier
        showModal={showModal} // Modal visibility state
        setShowModal={setShowModal} // Function to control modal visibility
      />
    </div>
  );
};

export default Supplier;
