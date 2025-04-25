import React from "react";

// CashInputSection component to handle cash input
function CashInputSection({
  cashReceived,
  setCashReceived,
}: {
  cashReceived: number; // Current cash received value
  setCashReceived: (val: number) => void; // Function to update cash received
}) {
  return (
    <div className="cash-input">
      {" "}
      {/* Container for cash input */}
      <label>Cash Received: </label> {/* Label for the input */}
      <input
        type="number"
        value={cashReceived} // Display the current cash received
        onChange={(e) => setCashReceived(Number(e.target.value))} // Update cash received value on change
      />
    </div>
  );
}

export default CashInputSection;
