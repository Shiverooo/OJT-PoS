import React from "react";

// Props interface for ActionButtons component
interface ActionButtonsProps {
  handlePay: () => void; // Function to handle payment
  payButtonRef: React.RefObject<HTMLButtonElement>; // Reference to Pay button
}

// ActionButtons component
function ActionButtons({ handlePay, payButtonRef }: ActionButtonsProps) {
  return (
    <div className="receipt-actions">
      {" "}
      {/* Container for action buttons */}
      <button className="edit-btn">EDIT</button>{" "}
      {/* Edit button (not functional here) */}
      <button
        className="pay-btn"
        onClick={handlePay} // Trigger handlePay function when clicked
        ref={payButtonRef} // Attach reference to Pay button
      >
        PAY
      </button>
    </div>
  );
}

export default ActionButtons;
