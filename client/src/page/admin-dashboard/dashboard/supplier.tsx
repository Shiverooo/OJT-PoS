import React, { useState } from "react";
import "../../../styles/admin/supplier.css";
import SupplierSearch from "../../../components/admin/supplier/supplier-search.tsx";
import SupplierSection from "../../../components/admin/supplier/supplier-section.tsx";

const Supplier: React.FC = () => {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleAddSupplier = (newSupplier: any) => {
    setSuppliers((prevSuppliers) => [newSupplier, ...prevSuppliers]);
    setCurrentPage(1);
  };

  const filteredSuppliers = suppliers.filter((supplier) => {
    const query = searchQuery.toLowerCase();
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
      <SupplierSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setCurrentPage={setCurrentPage}
        setShowModal={setShowModal}
      />

      <SupplierSection
        suppliers={suppliers}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        filteredSuppliers={filteredSuppliers}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        handleAddSupplier={handleAddSupplier}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default Supplier;
