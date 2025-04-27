import React, { useEffect } from "react";
import CashIcon from "../../../assets/images/cash.svg";

type PopupProps = {
  selectedItems: any[];
  cashInput: string;
  totalAmount: number;
  cashReceived: number;
  resetReceipt: () => void;
  setCashReceived: React.Dispatch<React.SetStateAction<number>>;
  handleNumberClick: (value: number) => void;
  handleClosePopup: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Popup: React.FC<PopupProps> = ({
  selectedItems,
  cashInput,
  totalAmount,
  cashReceived,
  resetReceipt,
  setCashReceived,
  handleNumberClick,
  handleClosePopup,
  handleInputChange,
}) => {
  const hasItems = selectedItems.length > 0;

  // Handle Enter key to trigger Pay action
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && hasItems) {
      resetReceipt();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasItems]);

  // Custom function to add value directly to cashInput and cashReceived
  const handleCustomNumberClick = (value: number) => {
    if (!hasItems) return; // Prevent clicking if no items

    const newCash = cashReceived + value;

    setCashReceived(newCash);

    const fakeEvent = {
      target: { value: newCash.toString() },
    } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(fakeEvent);
  };

  const handleInputIfAllowed = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasItems) return; // Prevent typing if no items
    handleInputChange(e);
  };

  return (
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
          {/* Popup Receipt Table */}
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
                          { minimumFractionDigits: 2 }
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Section */}
          <div className="payment-section">
            <h1>
              ₱
              {totalAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </h1>
            <p>Total amount due</p>

            {/* Cash Input with Buttons */}
            <div className="cash-input-container">
              <p>Cash Received</p>
              <div className="cash-row">
                <div className="cash-box">
                  <img src={CashIcon} alt="Cash Icon" className="cash-icon" />
                  <span className="currency-symbol">₱</span>
                  <input
                    type="text"
                    value={cashInput}
                    onChange={handleInputIfAllowed} // New restricted input handler
                    className="cash-received-input"
                    disabled={!hasItems} // Disable typing if no items
                  />
                </div>
                <button onClick={hasItems ? resetReceipt : undefined} className="pay-button" disabled={!hasItems}>
                  Pay
                </button>
                <div className="underline"></div>
              </div>

              {/* Number Buttons Grid */}
              <div className="number-buttons-grid">
                {[1, 5, 10, 20, 50, 100, 500, 1000].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleCustomNumberClick(num)}
                    className="number-button"
                    disabled={!hasItems} // Disable number buttons if no items
                  >
                    ₱{num}
                  </button>
                ))}
              </div>
            </div>

            {/* Change Section */}
            <div className="change-section">
              <p>Change</p>
              <h2>
                ₱
                {(cashReceived - totalAmount > 0
                  ? cashReceived - totalAmount
                  : 0
                ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
