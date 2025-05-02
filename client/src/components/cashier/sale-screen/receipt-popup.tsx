import React, { useEffect } from "react";
import CashIcon from "../../../assets/images/cash.svg";

const generateOrderId = () => {
  const timestamp = new Date().getTime();
  return `${timestamp.toString().slice(-4)}`;
};

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
  clearItems: () => void;
};

const Popup: React.FC<PopupProps> = ({
  selectedItems,
  cashInput,
  totalAmount,
  cashReceived,
  resetReceipt: originalResetReceipt,
  setCashReceived,
  handleNumberClick,
  handleClosePopup,
  handleInputChange,
  clearItems,
}) => {
  const hasItems = selectedItems.length > 0;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && hasItems) {
      handlePayment();
    }
  };

  const handlePayment = () => {
    const now = new Date();
    const sale = {
      id: generateOrderId(),
      amount: totalAmount,
      orderNumber: `#4-${generateOrderId()}`,
      date: now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }),
      time: now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
      paymentType: "Cash",
      items: selectedItems.map((item) => ({
        name: item.name,
        qty: item.quantity,
        price: item.price,
      })),
    };

    const existingSales = JSON.parse(localStorage.getItem("sales") || "[]");

    existingSales.unshift(sale);

    localStorage.setItem("sales", JSON.stringify(existingSales));

    originalResetReceipt();
    clearItems();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasItems]);

  const handleCustomNumberClick = (value: number) => {
    if (!hasItems) return;

    const newCash = cashReceived + value;
    setCashReceived(newCash);

    const fakeEvent = {
      target: { value: newCash.toString() },
    } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(fakeEvent);
  };

  const handleInputIfAllowed = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasItems) return;
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
                  <img src={CashIcon} alt="Cash Icon" className="cash-icon" />
                  <span className="currency-symbol">₱</span>
                  <input
                    type="text"
                    value={cashInput}
                    onChange={handleInputIfAllowed}
                    className="cash-received-input"
                    disabled={!hasItems}
                  />
                </div>
                <button
                  onClick={hasItems ? handlePayment : undefined}
                  className="pay-button"
                  disabled={!hasItems}
                >
                  Pay
                </button>
                <div className="underline"></div>
              </div>

              <div className="number-buttons-grid">
                {[1, 5, 10, 20, 50, 100, 500, 1000].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleCustomNumberClick(num)}
                    className="number-button"
                    disabled={!hasItems}
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
