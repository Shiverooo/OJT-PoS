import React, { useState } from "react";
import '../../styles/cashier/receipt.css'
import { useLocation } from "react-router-dom";
import CashIcon from "../../assets/images/cash.svg";

function Receipt() {
  const location = useLocation();
  const isReceiptPage = location.pathname === "/cashier";
  const today = new Date().toLocaleDateString("en-US");
  const [receiptItems] = useState([
    { name: "Red Dragon Mouse", quantity: 1, price: 100 },
    { name: "RAPOO Keyboard", quantity: 1, price: 150 },
    { name: "Seagate HDD", quantity: 1, price: 200 },
    { name: "MSI Monitor", quantity: 1, price: 1000 },
  ]);
  const [cashReceived, setCashReceived] = useState(0);
  const [change, setChange] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const totalAmount = receiptItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleNumberClick = (value) => {
    setCashReceived((prev) => parseInt(prev || 0) + value);
  };

  const handlePay = () => {
    const computedChange = cashReceived - totalAmount;
    setChange(computedChange > 0 ? computedChange : 0);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setCashReceived(0);
    setChange(0);
  };
  if (!isReceiptPage) {
    return null; 
  }

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (value === "" || !isNaN(value)) {
      setCashReceived(value === "" ? 0 : Number(value));
    }
  };

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
                  <td>₱{item.price}</td>
                  <td>₱{item.quantity * item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="receipt-total">
          <strong>Total</strong>
          <strong>₱{totalAmount}</strong>
        </div>
        <div className="cash-input">
          <label>Cash Received: </label>
          <input
            type="number"
            value={cashReceived}
            onChange={(e) => setCashReceived(Number(e.target.value))}
          />
        </div>
        <div className="receipt-actions">
          <button className="edit-btn">EDIT</button>
          <button className="pay-btn" onClick={handlePay}>
            PAY
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <div className="popup-left">Receipt</div>
              <div className="popup-right">
                <button className="receipt-close-button" onClick={handleClosePopup}>
                  Close
                </button>
              </div>
            </div>
            <div className="popup-body">
              <div className="receipt-container">
                <table className="popup-receipt-table">
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
                        <td className="item-name">{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>₱{item.price}</td>
                        <td>₱{item.quantity * item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="popup-total">
                  <strong>Total</strong>
                  <strong>₱{totalAmount}</strong>
                </div>
              </div>

              <div className="payment-section">
                <h1>₱{totalAmount}</h1>
                <p>Total amount due</p>

                <div className="cash-input-container">
                  <p>Cash Received</p>
                  <div className="cash-row">
                    <div className="cash-box">
                      <img
                        src={CashIcon}
                        alt="Cash Icon"
                        className="cash-icon"
                      />
                      <span className="currency-symbol">₱</span>
                      <input
                        type="text"
                        value={cashReceived}
                        onChange={handleInputChange}
                        readOnly={false}
                        className="cash-received-input"
                      />
                    </div>
                    <button onClick={handleClosePopup} className="pay-button">
                      Pay
                    </button>
                    <div class="underline"></div>
                  </div>

                  <div className="number-buttons-grid">
                    {[1, 5, 10, 20, 50, 100, 500, 1000].map((num) => (
                      <button
                        key={num}
                        onClick={() => handleNumberClick(num)}
                        className="number-button"
                      >
                        ₱{num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="change-section">
                  <p>Change</p>
                  <h2>₱{change}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Receipt; 