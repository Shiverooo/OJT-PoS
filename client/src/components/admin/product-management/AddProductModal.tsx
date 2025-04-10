import React, { useState, useEffect } from "react";
import "../../../styles/admin/addproductmodal.css";

interface AddProductModalProps {
  isOpen: boolean; 
  onClose: () => void; 
  onAddProduct: (product: any) => void; 
}

// AddProductModal component definition
const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  // Declare state variables for each form field
  const [image, setImage] = useState<string | null>(null); 
  const [category, setCategory] = useState(""); 
  const [price, setPrice] = useState(""); 
  const [quantity, setQuantity] = useState(""); 
  const [barcode, setBarcode] = useState(""); 
  const [dateAdded, setDateAdded] = useState(""); 
  const [productName, setProductName] = useState(""); 
  const [supplier, setSupplier] = useState(""); 

  // Effect hook to handle the Escape key press to close the modal
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

  // Function to reset the form fields
  const resetForm = () => {
    setImage(null); 
    setCategory(""); 
    setPrice(""); 
    setQuantity("");
    setBarcode("");
    setDateAdded(""); 
    setProductName(""); 
    setSupplier(""); 
  };

  // Handle image file upload
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
    // If any required field is empty, prevent submission
    if (
      !image ||
      !productName ||
      !supplier ||
      !category ||
      !price ||
      !quantity ||
      !barcode ||
      !dateAdded
    ) {
      return; 
    }
    // Pass the product details to the parent component for adding
    onAddProduct({
      barcode,
      name: productName,
      price,
      quantity: parseInt(quantity),
      date: dateAdded,
    });
    resetForm(); 
    onClose(); 
  };

  // Get today's date to set as the minimum value for the date field
  const today = new Date().toISOString().split("T")[0];

  // If the modal is not open, don't render anything
  if (!isOpen) return null;

  // Render the modal
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Close button to reset form and close the modal */}
        <button
          className="close-button"
          onClick={() => {
            resetForm(); 
            onClose(); 
          }}
        >
          &times;
        </button>
        <h2>New Product</h2>

        {/* Image upload section */}
        <div className="image-upload">
          <div className="image-box">
            {image ? (
              <img src={image} alt="Preview" className="uploaded-image" /> 
            ) : (
              <p>No image selected</p> 
            )}
          </div>
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

        {/* Product form */}
        <form className="product-form" onSubmit={handleSubmit}>
          {/* Barcode input */}
          <div className="form-row">
            <label>Barcode:</label>
            <input
              type="text"
              placeholder="Enter barcode"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              required
            />
          </div>

          {/* Product name input */}
          <div className="form-row">
            <label>Product Name:</label>
            <input
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          {/* Supplier input */}
          <div className="form-row">
            <label>Supplier:</label>
            <input
              type="text"
              placeholder="Enter supplier name"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              required
            />
          </div>

          {/* Category dropdown */}
          <div className="form-row">
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
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

          {/* Price input */}
          <div className="form-row">
            <label>Price:</label>
            <input
              type="text"
              placeholder="Enter ₱ price"
              value={price}
              onChange={(e) =>
                /^\d*\.?\d{0,2}$/.test(e.target.value) &&
                setPrice(e.target.value)
              } 
              required
            />
          </div>

          {/* Quantity input */}
          <div className="form-row">
            <label>Quantity:</label>
            <input
              type="text"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) =>
                /^\d*$/.test(e.target.value) && setQuantity(e.target.value)
              } 
              required
            />
          </div>

          {/* Date added input */}
          <div className="form-row">
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
          <button type="submit" className="add-product-btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
