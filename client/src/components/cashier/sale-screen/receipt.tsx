import React, { useState, useEffect, useRef } from "react";
import "../../../styles/cashier/receipt.css";
import { useLocation } from "react-router-dom";
import { useSelectedProducts } from "../../../components/cashier/sale-screen/selected-products-context.tsx";

// Import Components
import ReceiptHeader from "../../../components/cashier/sale-screen/receipt-header.tsx";
import ReceiptTable from "../../../components/cashier/sale-screen/receipt-table.tsx";
import TotalSection from "../../../components/cashier/sale-screen/receipt-total.tsx";
import CashInput from "../../../components/cashier/sale-screen/cash-input-section.tsx";
import ActionButtons from "../../../components/cashier/sale-screen/receipt-actions.tsx";
import Popup from "../../../components/cashier/sale-screen/receipt-popup.tsx";

// Receipt Component
function Receipt() {
  const location = useLocation();
  const isReceiptPage = location.pathname === "/cashier"; // Check if it's the receipt page
  const today = new Date().toLocaleDateString("en-US"); // Get current date

  const [cashReceived, setCashReceived] = useState(0); // Track cash received
  const [change, setChange] = useState(0); // Track change to give back
  const [showPopup, setShowPopup] = useState(false); // Show or hide popup
  const { selectedItems, clearItems } = useSelectedProducts(); // Get selected items
  const [cashInput, setCashInput] = useState("0"); // Track cash input as string

  // Add a reference to the Pay button
  const payButtonRef = useRef<HTMLButtonElement>(null);

  // Calculate total amount to pay
  const totalAmount = selectedItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  // Handle numeric input click (for the keypad)
  const handleNumberClick = (value: number) => {
    setCashReceived((prev) => parseInt(prev.toString() || "0") + value);
  };

  // Handle payment and calculate change
  const handlePay = () => {
    const computedChange = cashReceived - totalAmount;
    setChange(computedChange > 0 ? computedChange : 0);
    setShowPopup(true);
  };

  // Close the popup and reset inputs
  const handleClosePopup = () => {
    if (payButtonRef.current) {
      payButtonRef.current.blur(); // Remove focus from Pay button
    }
    setCashReceived(0);
    setCashInput("0");
    setChange(0);
    setShowPopup(false);
  };

  // Reset receipt details
  const resetReceipt = () => {
    setCashReceived(0);
    setCashInput("0");
    setChange(0);
    setShowPopup(false);
    clearItems(); // Clear selected items
  };

  // Handle cash input changes (e.g., typing or pasting)
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

  // Set up event listener for Escape key to close popup
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

  if (!isReceiptPage) return null; // Only render if on the receipt page

  return (
    <div className="receipt">
      <ReceiptHeader today={today} /> {/* Render receipt header */}
      <div className="receipt-section">
        <ReceiptTable selectedItems={selectedItems} />{" "}
        {/* Display items in the table */}
        <TotalSection totalAmount={totalAmount} /> {/* Display total amount */}
        <CashInput
          cashReceived={cashReceived}
          setCashReceived={setCashReceived}
        />{" "}
        {/* Handle cash input */}
        <ActionButtons handlePay={handlePay} payButtonRef={payButtonRef} />{" "}
        {/* Payment actions */}
      </div>
      {showPopup && (
        <Popup
          selectedItems={selectedItems}
          cashInput={cashInput}
          totalAmount={totalAmount}
          cashReceived={cashReceived}
          resetReceipt={resetReceipt}
          setCashReceived={setCashReceived}
          handleNumberClick={handleNumberClick}
          handleClosePopup={handleClosePopup}
          handleInputChange={handleInputChange}
        />
      )}
    </div>
  );
}

export default Receipt;
