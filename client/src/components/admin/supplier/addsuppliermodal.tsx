import React, { useState, useEffect } from "react";
import "../../../styles/admin/addsuppliermodal.css";

interface AddSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSupplier: (supplier: Supplier) => void;
}

interface Supplier {
  name: string;
  location: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  dateAdded: string;
}

const AddSupplierModal: React.FC<AddSupplierModalProps> = ({
  isOpen,
  onClose,
  onAddSupplier,
}) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dateAdded, setDateAdded] = useState("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        resetForm();
        onClose();
      }
    };

    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const resetForm = () => {
    setName("");
    setLocation("");
    setContactPerson("");
    setContactNumber("");
    setEmail("");
    setDateAdded("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !location || !contactPerson || !contactNumber || !email || !dateAdded) {
      return;
    }

    const newSupplier: Supplier = {
      name,
      location,
      contactPerson,
      contactNumber,
      email,
      dateAdded,
    };

    onAddSupplier(newSupplier);

    resetForm();
    onClose();
  };

  const today = new Date().toISOString().split("T")[0];

  if (!isOpen) return null;

  return (
    <div className="supplier-modal-overlay">
      <div className="supplier-modal-content">
        <button
          className="close-button"
          onClick={() => {
            resetForm();
            onClose();
          }}
        >
          ×
        </button>
        <h2>New Supplier</h2>

        <div className="between-line"></div>

        <form className="supplier-form" onSubmit={handleSubmit}>
          <div className="supplier-form-row">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter supplier name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="supplier-form-row">
            <label>Location:</label>
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="supplier-form-row">
            <label>Contact Person:</label>
            <input
              type="text"
              placeholder="Enter contact person"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              required
            />
          </div>

          <div className="supplier-form-row">
            <label>Contact Number:</label>
            <input
              type="text"
              placeholder="Enter contact number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>

          <div className="supplier-form-row">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="supplier-form-row">
            <label>Date Added:</label>
            <input
              type="date"
              value={dateAdded}
              onChange={(e) => setDateAdded(e.target.value)}
              min={today}
              required
            />
          </div>

          <button type="submit" className="btn-submit-supplier">
            Add Supplier
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSupplierModal;
