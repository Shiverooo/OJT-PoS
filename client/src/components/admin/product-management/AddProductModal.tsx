import React, { useState } from "react";
import "../../../styles/admin/addproductmodal.css";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
}) => {
  // State for image and category
  const [image, setImage] = useState<string | null>(null);
  const [category, setCategory] = useState("");

  // Handle file selection
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted");
  };

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
            {image ? (
              <img src={image} alt="Uploaded preview" className="uploaded-image" />
            ) : (
              <p>No image selected</p>
            )}
          </div>
          
          {/* Move Browse Image label to bottom if an image is uploaded */}
          <label className="browse" htmlFor="file-upload">
            Browse image
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </div>

        <div className="between-line"></div>

        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Barcode:</label>
            <input type="text" placeholder="Enter barcode" />
          </div>

          <div className="form-row">
            <label>Product Name:</label>
            <input type="text" placeholder="Enter product name" />
          </div>

          <div className="form-row">
            <label>Supplier:</label>
            <input type="text" placeholder="Enter supplier name" />
          </div>

          <div className="form-row">
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)} 
            >
              <option value="" disabled>
                Select Category
              </option>
              <option>Laptops and Desktops</option>
              <option>Printers and Ink</option>
              <option>Monitors</option>
              <option>Storage</option>
              <option>Other Accessories</option>
              <option>Gaming Devices</option>
            </select>
          </div>

          <div className="form-row">
            <label>Price:</label>
            <input type="text" placeholder="Enter price" />
          </div>

          <div className="form-row">
            <label>Quantity:</label>
            <input type="text" placeholder="Enter quantity" />
          </div>

          <div className="form-row">
            <label>Date Added:</label>
            <input type="date" />
          </div>

          <button type="submit" className="add-product-btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
