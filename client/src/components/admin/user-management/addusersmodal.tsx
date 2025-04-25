// User Management Add User Modal Component

import React, { useState, useEffect } from "react";
import "../../../styles/admin/addusersmodal.css";

// Define the props for the AddUsersModal component
interface AddUsersModalProps {
  isOpen: boolean; // Determines if the modal is open or not
  onClose: () => void; // Function to close the modal
  onAddUser: (user: User) => void; // Function to handle adding the new user
}

// Define the structure of the user object
interface User {
  firstName: string;
  lastName: string;
  username: string;
  contact: string;
  email: string;
  password: string;
}

const AddUsersModal: React.FC<AddUsersModalProps> = ({
  isOpen,
  onClose,
  onAddUser,
}) => {
  // State variables for each input field
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle 'Escape' key to close modal and reset form
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        (document.activeElement as HTMLElement)?.blur();
        resetForm(); // Reset form when closing
        onClose(); // Close modal
      }
    };

    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset form fields to initial state
  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setUsername("");
    setContact("");
    setEmail("");
    setPassword("");
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent submission if any field is empty
    if (
      !firstName ||
      !lastName ||
      !username ||
      !contact ||
      !email ||
      !password
    ) {
      return;
    }

    // Create a new user object
    const newUser: User = {
      firstName,
      lastName,
      username,
      contact,
      email,
      password,
    };

    onAddUser(newUser); // Pass the new user to the parent component
    resetForm(); // Reset the form
    onClose(); // Close the modal
  };

  if (!isOpen) return null; // If the modal is not open, return null

  return (
    <div className="user-modal-overlay">
      <div className="user-modal-content">
        <button
          className="user-close-button"
          onClick={() => {
            resetForm(); // Reset form when closing modal
            onClose(); // Close the modal
          }}
        >
          ×
        </button>
        <h2>Add New User</h2>
        <div className="between-line"></div>
        <form className="user-form" onSubmit={handleSubmit}>
          {/* Input fields for user details */}
          <div className="user-form-row">
            <label>First Name:</label>
            <input
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  setFirstName(value); // Only allow letters and spaces
                }
              }}
              required
            />
          </div>

          <div className="user-form-row">
            <label>Last Name:</label>
            <input
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  setLastName(value); // Only allow letters and spaces
                }
              }}
              required
            />
          </div>

          {/* New username field */}
          <div className="user-form-row">
            <label>Username:</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Handle username input
              required
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
                  setContact(value); // Only allow numbers and specific characters
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
              onChange={(e) => setEmail(e.target.value)} // Handle email input
              required
            />
          </div>

          <div className="user-form-row">
            <label>Password:</label>
            <input
              type="text"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Handle password input
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
