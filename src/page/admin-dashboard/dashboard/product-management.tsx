import React, { useState } from 'react';
import '../../../styles/admin/product-management.css';
import searchIcon from "../../../assets/images/search-icon.svg";

// Dummy product data
const productData = [
  {
    barcode: "8 1234 2145 9",
    name: "Red Dragon Mouse",
    price: "₱1,000.00",
    quantity: 12,
    date: "11/12/22",
    status: "In-stock"
  },
  {
    barcode: "6 1234 5268 1",
    name: "RAPOO Keyboard",
    price: "₱1,500.00",
    quantity: 10,
    date: "21/12/22",
    status: "Out of stock"
  },
  {
    barcode: "6 1234 5268 1",
    name: "N-VISION 23.8 Inch",
    price: "₱5,000.00",
    quantity: 8,
    date: "5/12/22",
    status: "In-stock"
  },
  {
    barcode: "6 1234 5268 1",
    name: "IN PLAY Speaker Small",
    price: "₱500.00",
    quantity: 10,
    date: "8/12/22",
    status: "Out of stock"
  },
  {
    barcode: "6 1234 5268 1",
    name: "AULA Mouse and Keyboard",
    price: "₱293.00",
    quantity: 10,
    date: "9/1/23",
    status: "In-stock"
  },
];

function ProductManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'in-stock':
        return 'status-in-stock';
      case 'out of stock':
        return 'status-out-of-stock';
      case 'low stock':
        return 'status-low-stock';
      default:
        return '';
    }
  };

  const filteredProducts = productData.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="management-container">
      <div className="header-management">
        <div className="search-prod-management">
          <div className="search-bar-management">
            <img
              src={searchIcon}
              alt="Search Icon"
              className="search-icon"
            />
            <input
              type="text"
              placeholder="Search product, supplier, order"
              className="prod-search-input"
              value={searchQuery}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="prod-inventory-summary">
        <div>Categories</div>
        <div>Total Products</div>
        <div>Top Selling</div>
        <div>Low Stocks</div>
      </div>

      <div className="products-section">
        <div className="products-header">
          <h3>Products</h3>
          <div>
            <button className="btn-add">Add Product</button>
            <button className="btn-filters">Filters</button>
            <button className="btn-download">Download all</button>
          </div>
        </div>

        <table className="product-table">
          <thead>
            <tr>
              <th>Barcode</th>
              <th>Products</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Date Added</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((prod, index) => (
              <tr key={index}>
                <td>{prod.barcode}</td>
                <td>{prod.name}</td>
                <td>{prod.price}</td>
                <td>{prod.quantity}</td>
                <td>{prod.date}</td>
                <td>
                  <span className={`status ${getStatusClass(prod.status)}`}>
                    {prod.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button>Previous</button>
          <span>Page 1 of 10</span>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
}

export default ProductManagement;
