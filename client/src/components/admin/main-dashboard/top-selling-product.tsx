import React from "react";
import { Link } from "react-router-dom";

function TopSellingTable() {
  const products = [
    // { name: "Product 1", sold: 120, remaining: 30, price: "$100" },
    // { name: "Product 2", sold: 90, remaining: 10, price: "$150" },
    // { name: "Product 3", sold: 70, remaining: 50, price: "$80" },
  ];
  
  return (
    <div className="top-selling">
      <div className="main-header">
        <h2>Top Selling Product</h2>
        <Link to="/admin/sales-reports">See All</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Sold Quantity</th>
            <th>Remaining Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              {/* <td>{product.name}</td>
              <td>{product.sold}</td>
              <td>{product.remaining}</td>
              <td>{product.price}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopSellingTable;
