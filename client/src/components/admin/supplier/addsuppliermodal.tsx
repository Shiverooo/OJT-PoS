// Add Supplier Modal Component

import React, { useState, useEffect } from "react";
import "../../../styles/admin/addsuppliermodal.css";

// Interface for Supplier data structure
interface Supplier {
  name: string;
  location: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  dateAdded: string;
}

// Interface for the AddSupplierModal props
interface AddSupplierModalProps {
  isOpen: boolean; // Controls modal visibility
  onClose: () => void; // Function to close the modal
  onAddSupplier: (supplier: Supplier) => void; // Function to handle adding a supplier
}

const AddSupplierModal: React.FC<AddSupplierModalProps> = ({
  isOpen,
  onClose,
  onAddSupplier,
}) => {
  // State hooks for form fields
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dateAdded, setDateAdded] = useState("");

  // Handle closing the modal with Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        (document.activeElement as HTMLElement)?.blur();
        resetForm();
        onClose();
      }
    };

    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset the form fields
  const resetForm = () => {
    setName("");
    setLocation("");
    setContactPerson("");
    setContactNumber("");
    setEmail("");
    setDateAdded("");
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !name ||
      !location ||
      !contactPerson ||
      !contactNumber ||
      !email ||
      !dateAdded
    ) {
      return;
    }

    // Create new supplier object
    const newSupplier: Supplier = {
      name,
      location,
      contactPerson,
      contactNumber,
      email,
      dateAdded,
    };

    // Pass the new supplier to the parent component and reset form
    onAddSupplier(newSupplier);
    resetForm();
    onClose();
  };

  // Set today's date to limit the "Date Added" field
  const today = new Date().toISOString().split("T")[0];

  // Don't render if modal is closed
  if (!isOpen) return null;

  return (
    <div className="supplier-modal-overlay">
      <div className="supplier-modal-content">
        {/* Close button */}
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

        {/* Supplier form */}
        <form className="supplier-form" onSubmit={handleSubmit}>
          {/* Name input field */}
          <div className="supplier-form-row">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter supplier name"
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  setName(value);
                }
              }}
            />
          </div>

          {/* Location input field */}
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

          {/* Contact person input field */}
          <div className="supplier-form-row">
            <label>Contact Person:</label>
            <input
              type="text"
              placeholder="Enter contact person"
              value={contactPerson}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  setContactPerson(value);
                }
              }}
              required
            />
          </div>

          {/* Contact number input field */}
          <div className="supplier-form-row">
            <label>Contact Number:</label>
            <input
              type="tel"
              placeholder="Enter contact number"
              value={contactNumber}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[\d+\-/\s]*$/.test(value)) {
                  setContactNumber(value);
                }
              }}
              maxLength={20}
              required
            />
          </div>

          {/* Email input field */}
          <div className="supplier-form-row">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              required
            />
          </div>

          {/* Date Added input field */}
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

          {/* Submit button */}
          <button type="submit" className="btn-submit-supplier">
            Add Supplier
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSupplierModal;
