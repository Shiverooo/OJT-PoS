// User Management Delete Button Modal

import React from "react";
import "../../../styles/admin/deletemodal.css";

// Define the types for the DeleteModal component's props
interface DeleteModalProps {
  onConfirm: () => void; // Function to handle the confirmation of deletion
  onCancel: () => void; // Function to handle the cancellation of the deletion
  selectedCount: number; // Number of items selected for deletion
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  onConfirm,
  onCancel,
  selectedCount,
}) => {
  return (
    <div className="modal-overlay">
      {" "}
      {/* Overlay background for the modal */}
      <div className="modal-box">
        <h3>Confirm Deletion</h3>
        <p>
          {/* Conditional message based on selectedCount */}
          Are you sure you want to delete <strong>{selectedCount}</strong>
          selected {selectedCount === 1 ? "user" : "users"}?
        </p>
        <div className="modal-actions">
          {/* Cancel button triggers the onCancel function */}
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          {/* Confirm button triggers the onConfirm function */}
          <button className="btn-confirm-delete" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
