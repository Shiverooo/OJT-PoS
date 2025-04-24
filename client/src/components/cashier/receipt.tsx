import React, { useState, useEffect } from "react";
import "../../styles/cashier/receipt.css";
import { useLocation } from "react-router-dom";
import CashIcon from "../../assets/images/cash.svg";
import { useSelectedProducts } from "../../components/cashier/selected-products-context.tsx";

function Receipt() {
  const location = useLocation();
  const isReceiptPage = location.pathname === "/cashier";
  const today = new Date().toLocaleDateString("en-US");

  const [cashReceived, setCashReceived] = useState(0);
  const [change, setChange] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const { selectedItems } = useSelectedProducts();
  const [cashInput, setCashInput] = useState("0");

  const totalAmount = selectedItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  const handleNumberClick = (value: number) => {
    setCashReceived((prev) => parseInt(prev.toString() || "0") + value);
  };

  const handlePay = () => {
    const computedChange = cashReceived - totalAmount;
    setChange(computedChange > 0 ? computedChange : 0);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setCashReceived(0);
    setCashInput("0");
    setChange(0);

    setShowPopup(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");

    if (rawValue === "" || /^\d+$/.test(rawValue)) {
      const numericValue = rawValue === "" ? 0 : Number(rawValue);
      setCashReceived(numericValue);
      setCashInput(
        numericValue.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      );
    }
  };

  // Close popup when ESC key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClosePopup();
      }
    };

    if (showPopup) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showPopup]);

  if (!isReceiptPage) return null;

  return (
    <div className="receipt">
      <div className="header-right">
        <span className="receipt-text">Receipt</span>
        <span className="date-text">DATE: {today}</span>
      </div>

      <div className="receipt-section">
        <div className="table-section">
          <div className="table-wrapper">
            <table className="receipt-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
            </table>

            <div className="table-receipt-wrapper">
              <table className="receipt-table">
                <tbody>
                  {selectedItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>
                        ₱
                        {(item.price || 0).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td>
                        ₱
                        {(item.quantity * (item.price || 0)).toLocaleString(
                          undefined,
                          { minimumFractionDigits: 2 }
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="receipt-total">
          <strong>Total</strong>
          <strong>
            ₱
            {totalAmount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </strong>
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
                <button
                  className="receipt-close-button"
                  onClick={handleClosePopup}
                >
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
                </table>
                <div className="popup-tbody-scroll">
                  <table className="popup-receipt-table">
                    <tbody>
                      {selectedItems.map((item, index) => (
                        <tr key={index}>
                          <td className="item-name">{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>
                            ₱
                            {(item.price || 0).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })}
                          </td>
                          <td>
                            ₱
                            {(item.quantity * (item.price || 0)).toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                              }
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="payment-section">
                <h1>
                  ₱
                  {totalAmount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </h1>
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
                        value={cashInput}
                        onChange={handleInputChange}
                        className="cash-received-input"
                      />
                    </div>
                    <button onClick={handleClosePopup} className="pay-button">
                      Pay
                    </button>
                    <div className="underline"></div>
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
                  <h2>
                    ₱
                    {(cashReceived - totalAmount > 0
                      ? cashReceived - totalAmount
                      : 0
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </h2>
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
