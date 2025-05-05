import React from 'react';
import { Sale } from '../../../types/sales.ts';
import { formatDateLong } from './utils.ts';

interface SalesListProps {
  groupedSales: [string, Sale[]][];
  selectedSale: Sale | null;
  onSaleSelect: (sale: Sale) => void;
  currentDate: string;
}

const HistorySalesList: React.FC<SalesListProps> = ({
  groupedSales,
  selectedSale,
  onSaleSelect,
  currentDate,
}) => {
  if (groupedSales.length === 0) {
    return (
      <div className="no-sales-message">
        No sales history available.
      </div>
    );
  }

  return (
    <>
      {groupedSales.map(([date, sales]) => (
        <div key={date}>
          <div className="current-date">
            {date ===
            new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })
              ? currentDate
              : formatDateLong(date)}
          </div>
          {sales.map((sale) => (
            <div
              key={sale.id}
              className={`sales-summary-container ${
                selectedSale?.id === sale.id ? "active" : ""
              }`}
              onClick={() => onSaleSelect(sale)}
            >
              <div className="amount">
                ₱
                {sale.amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="date-time">
                <div>{sale.date}</div>
                <div className="time">{sale.time}</div>
              </div>
              <div className="order-number">{sale.orderNumber}</div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default HistorySalesList; 