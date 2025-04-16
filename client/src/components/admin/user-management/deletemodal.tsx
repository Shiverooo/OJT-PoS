import React from "react";
import "../../../styles/admin/deletemodal.css";

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  selectedCount: number;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  onConfirm,
  onCancel,
  selectedCount,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Confirm Deletion</h3>
        <p>
          Are you sure you want to delete <strong>{selectedCount}</strong>{" "}
          selected {selectedCount === 1 ? "user" : "users"}?
        </p>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-confirm-delete" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
