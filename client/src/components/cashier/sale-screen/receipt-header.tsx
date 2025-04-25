import React from "react";

// ReceiptHeader component to display receipt title and date
function ReceiptHeader({ today }: { today: string }) {
  return (
    <div className="header-right">
      {" "}
      {/* Container for receipt header */}
      <span className="receipt-text">Receipt</span> {/* Receipt title */}
      <span className="date-text">DATE: {today}</span>{" "}
      {/* Display today's date */}
    </div>
  );
}

export default ReceiptHeader; 
