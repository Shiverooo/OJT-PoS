import React from "react";

// ReceiptTotal component to display the total amount
function ReceiptTotal({ totalAmount }: { totalAmount: number }) {
  return (
    <div className="receipt-total">
      {" "}
      {/* Container for total amount */}
      <strong>Total</strong> {/* Label for total */}
      <strong>
        ₱{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}{" "}
        {/* Format and display total amount */}
      </strong>
    </div>
  );
}

export default ReceiptTotal;
