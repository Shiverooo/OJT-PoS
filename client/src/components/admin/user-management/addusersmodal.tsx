import React, { useState, useEffect } from "react";
import "../../../styles/admin/addusersmodal.css";

interface AddUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: User) => void;
}

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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState(""); 
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    setFirstName("");
    setLastName("");
    setUsername(""); // Reset username state
    setContact("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !username || !contact || !email || !password) {
      return;
    }

    const newUser: User = {
      firstName,
      lastName,
      username, // Include username in the new user object
      contact,
      email,
      password,
    };

    onAddUser(newUser);
    resetForm();
    onClose();
  };

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
            <label>First Name:</label>
            <input
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  setFirstName(value);
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
                  setLastName(value);
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
              onChange={(e) => setUsername(e.target.value)}
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

          <button type="submit" className="btn-submit-user">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUsersModal;
