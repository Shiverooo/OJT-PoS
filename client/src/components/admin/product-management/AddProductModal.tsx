// Add Product Modal Component

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
  // Declare state variables for form fields
  const [image, setImage] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [barcode, setBarcode] = useState("");
  const [dateAdded, setDateAdded] = useState("");
  const [productName, setProductName] = useState("");
  const [supplier, setSupplier] = useState("");

  // Effect hook to handle Escape key press and close modal
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

  // Function to reset form fields
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

  // Handle image upload
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
    // Prevent submission if any required field is empty
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

    // Pass product data to parent for adding
    const getProductStatus = (quantity: number) => {
      if (quantity === 0) return "OUT-OF-STOCK";
      if (quantity < 5) return "LOW";
      return "IN-STOCK";
    };

    const newProduct = {
      barcode,
      name: productName,
      category,
      supplier,
      price,
      quantity: parseInt(quantity),
      dateAdded,
      image,
      status: getProductStatus(parseInt(quantity))
    };

    onAddProduct(newProduct);

    // Save product to localStorage
    const storedProducts = localStorage.getItem("products");
    let products = storedProducts ? JSON.parse(storedProducts) : [];
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    resetForm();
    onClose();
  };

  // Get today's date for date input's minimum value
  const today = new Date().toISOString().split("T")[0];

  // Return nothing if modal is not open
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Close Button */}
        <button
          className="add-close-button"
          onClick={() => {
            resetForm();
            onClose();
          }}
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2>New Product</h2>

        {/* Image Upload Section */}
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

        {/* Product Form */}
        <form className="product-form" onSubmit={handleSubmit}>
          {/* Barcode Input */}
          <div className="form-row">
            <label>Barcode:</label>
            <input
              type="text"
              placeholder="Enter barcode"
              value={barcode}
              onChange={(e) => {
                const input = e.target.value;
                // Allow only numbers and spaces
                if (/^[0-9\s]*$/.test(input)) {
                  setBarcode(input);
                }
              }}
              required
            />
          </div>

          {/* Product Name Input */}
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

          {/* Supplier Input */}
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

          {/* Category Dropdown */}
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
              <option>Gaming Devices</option>
              <option>Other Accessories</option>
            </select>
          </div>

          {/* Price Input */}
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

          {/* Quantity Input */}
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

          {/* Date Added Input */}
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

          {/* Submit Button */}
          <button type="submit" className="add-product-btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
