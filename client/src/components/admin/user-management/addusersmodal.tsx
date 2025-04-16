import React, { useState, useEffect } from "react";
import "../../../styles/admin/addusersmodal.css";

interface AddUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: User) => void;
}

interface User {
  fullName: string;
  contact: string;
  email: string;
  password: string;
  dateAdded: string;
}

const AddUsersModal: React.FC<AddUsersModalProps> = ({
  isOpen,
  onClose,
  onAddUser,
}) => {
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    setFullName("");
    setContact("");
    setEmail("");
    setPassword("");
    setDateAdded("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !contact || !email || !password || !dateAdded) {
      return;
    }

    const newUser: User = {
      fullName,
      contact,
      email,
      password,
      dateAdded,
    };

    onAddUser(newUser);
    resetForm();
    onClose();
  };

  const today = new Date().toISOString().split("T")[0];

  if (!isOpen) return null;

  return (
    <div className="user-modal-overlay">
      <div className="user-modal-content">
        <button
          className="user-close-button"
          onClick={() => {
            resetForm();
            onClose();
          }}
        >
          ×
        </button>
        <h2>Add New User</h2>
        <div className="between-line"></div>
        <form className="user-form" onSubmit={handleSubmit}>
          <div className="user-form-row">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  setFullName(value);
                }
              }}
            />
          </div>

          <div className="user-form-row">
            <label>Contact Number:</label>
            <input
              type="tel"
              placeholder="Enter contact number"
              value={contact}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[\d+\-/\s]*$/.test(value)) {
                  setContact(value);
                }
              }}
              maxLength={20}
              required
            />
          </div>

          <div className="user-form-row">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="user-form-row">
            <label>Password:</label>
            <input
              type="text"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="user-form-row">
            <label>Date Added:</label>
            <input
              type="date"
              value={dateAdded}
              onChange={(e) => setDateAdded(e.target.value)}
              min={today}
              required
            />
          </div>

          <button type="submit" className="btn-submit-user">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUsersModal;
