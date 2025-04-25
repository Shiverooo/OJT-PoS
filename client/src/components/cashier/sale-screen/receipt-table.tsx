import React from "react";

// Define Item type with name, quantity, and price
type Item = {
  name: string;
  quantity: number;
  price: number;
};

// ReceiptTable component to display selected items in a table
function ReceiptTable({ selectedItems }: { selectedItems: Item[] }) {
  return (
    <div className="table-section">
      {" "}
      {/* Container for table section */}
      <div className="table-wrapper">
        {" "}
        {/* Wrapper for the table */}
        <table className="receipt-table">
          {" "}
          {/* Table header */}
          <thead>
            <tr>
              <th>Name</th> {/* Item name column */}
              <th>Quantity</th> {/* Item quantity column */}
              <th>Price</th> {/* Item price column */}
              <th>Amount</th> {/* Total amount column */}
            </tr>
          </thead>
        </table>
        <div className="table-receipt-wrapper">
          {" "}
          {/* Wrapper for the table body */}
          <table className="receipt-table">
            <tbody>
              {/* Map through selected items and display each item in a row */}
              {selectedItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td> {/* Display item name */}
                  <td>{item.quantity}</td> {/* Display item quantity */}
                  <td>
                    ₱
                    {(item.price || 0).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </td>{" "}
                  {/* Display item price */}
                  <td>
                    ₱
                    {(item.quantity * (item.price || 0)).toLocaleString(
                      undefined,
                      { minimumFractionDigits: 2 }
                    )}
                  </td>{" "}
                  {/* Display total amount (quantity * price) */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ReceiptTable; 
