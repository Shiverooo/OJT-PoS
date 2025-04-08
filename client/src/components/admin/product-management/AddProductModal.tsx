import React from "react";
import "../../../styles/admin/addproductmodal.css";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>New Product</h2>
        <div className="image-upload">
          <div className="image-box">
            <span className="browse">Browse image</span>
          </div>
        </div>
        <form className="product-form">
          <input type="text" placeholder="Enter barcode" />
          <input type="text" placeholder="Enter product name" />
          <input type="text" placeholder="Enter supplier name" />
          <select>
            <option>No category</option>
          </select>
          <input type="text" placeholder="Enter price" />
          <input type="text" placeholder="Enter quantity" />
          <input type="date" />
          <button type="submit" className="add-product-btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
