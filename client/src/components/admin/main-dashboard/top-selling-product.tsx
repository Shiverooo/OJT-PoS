import React from 'react'

function TopSellingTable() {
  return (
    <div className="top-selling">
      <div className="main-header">
        <h2>Top Selling Product</h2>
        <a href="#">See All</a>
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
              <td>{product.name}</td>
              <td>{product.sold}</td>
              <td>{product.remaining}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default TopSellingTable;
