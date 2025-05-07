import React from 'react';
import { Sale } from '../../../types/sales.ts';

interface ReceiptProps {
  selectedSale: Sale | null;
  salesData: Sale[];
}

const emptyReceipt: Sale = {
  id: "",
  amount: 0,
  orderNumber: "No Order",
  date: new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }),
  time: new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }),
  paymentType: "---",
  items: [],
};

const HistoryReceipt: React.FC<ReceiptProps> = ({ selectedSale, salesData }) => {
  if (!selectedSale && salesData.length > 0) return null;

  return (
    <div className="receipt-box">
      <div className="receipt-total-amount">
        <h1>
          ₱
          {(selectedSale?.amount || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h1>
        <p>Total</p>
      </div>

      <div className="receipt-items-list">
        {(selectedSale?.items || []).map((item, idx) => (
          <div className="item-row" key={idx}>
            <div>
              <strong>{item.name}</strong>
              <div className="item-qty">
                {item.qty} x ₱
                {item.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            <div className="price">
              ₱
              {(item.qty * item.price).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        ))}
        {!selectedSale && (
          <div className="empty-receipt-message">
            <p>No items to display</p>
          </div>
        )}
      </div>

      <div className="receipt-summary-total">
        <div>Total</div>
        <div className="price">
          ₱
          {(selectedSale?.amount || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      </div>
      <div className="receipt-payment-type">
        {selectedSale?.paymentType || "---"}

        <div className="history-change-section">
          <div>Change</div>
          <h2 className="history-change">
            ₱{(selectedSale?.change || 0).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h2>
        </div>
      </div>

      <div className="receipt-footer">
        <div>
          {selectedSale
            ? `${selectedSale.date}, ${selectedSale.time}`
            : `${emptyReceipt.date}, ${emptyReceipt.time}`}
        </div>
        <div>{selectedSale?.orderNumber || emptyReceipt.orderNumber}</div>
      </div>
    </div>
  );
};

export default HistoryReceipt; 