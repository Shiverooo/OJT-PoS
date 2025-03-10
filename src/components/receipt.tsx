<<<<<<< HEAD
import React, { useState } from 'react'
import "../styles/cashier/receipt.css"
=======
import React, { useState } from "react";
import '../styles/cashier/receipt.css'

>>>>>>> bbacb8a65815d6492efe089bf474774e9b3e1c52
function Receipt() {
  const today = new Date().toLocaleDateString("en-US");
  const [receiptItems, setReceiptItems] = useState([
        { name: "Red Dragon Mouse", quantity: 1, price: 100 },
        { name: "RAPOO Keyboard", quantity: 1, price: 150 },
        { name: "Seagate HDD", quantity: 1, price: 200 },
        { name: "MSI Monitor", quantity: 1, price: 1000 },
  ]);
<<<<<<< HEAD

  const totalAmount = receiptItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="receipt">
        <div className="header-right">
        <span className="receipt-text">Receipt</span>
        <span className="date-text">DATE: {today}</span>

        <div className="receipt-section">
                    <div className="table-section">
                        <table className="receipt-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {receiptItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.price}</td>
                                        <td>${item.quantity * item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="receipt-total">
                        <strong>Total</strong>
                        <strong>${totalAmount}</strong>
                    </div>
                    <div className="receipt-actions">
                        <button className="edit-btn">EDIT</button>
                        <button className="pay-btn">PAY</button>
                    </div>
                </div>
      </div>
    </div>
  )
}

export default Receipt
=======
  const totalAmount = receiptItems.reduce((sum, item) => sum + item.price, 0);
  
  return (
   <div className="receipt">
      <div className="header-right">
        <span className="receipt-text">Receipt</span>
        <span className="date-text">DATE: {today}</span>
      </div>

      <div className="receipt-section">
          <div className="table-section">
              <table className="receipt-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                      {receiptItems.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price}</td>
                          <td>${item.quantity * item.price}</td>
                        </tr>
                      ))}
                  </tbody>
              </table>
          </div>
          <div className="receipt-total">
              <strong>Total</strong>
              <strong>${totalAmount}</strong>
          </div>
          <div className="receipt-actions">
              <button className="edit-btn">EDIT</button>
              <button className="pay-btn">PAY</button>
          </div>
      </div>
  </div>
  
  );
}

export default Receipt;
>>>>>>> bbacb8a65815d6492efe089bf474774e9b3e1c52
