import React from 'react'

function LowStockList() {
  return (
    <div className="low-stock">
    <div className="main-header">
      <h2>Low Quantity Stock</h2>
      <a href="#">See All</a>
    </div>
    <div>
      {items.map((item, index) => (
        <div key={index} className="low-stock-item">
          <div className="low-stock-info">
            <img src={item.image} alt={item.name} />
            <div>
              <p className="main-product-name">{item.name}</p>
              <p className="remaining">Remaining Quantity: {item.remaining}</p>
            </div>
          </div>
          <span className="low-tag">Low</span>
        </div>
      ))}
    </div>
  </div>
  )
}

export default LowStockList;
