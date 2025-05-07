import React from 'react';

interface InventoryItem {
  barcode: string;
  name: string;
  category: string;
  supplier: string;
  price: string;
  dateAdded: string;
  stocks: number;
  status: "IN-STOCK" | "LOW" | "OUT-OF-STOCK";
}

interface TableBodyProps {
  items: InventoryItem[];
}

const InventoryTableBody: React.FC<TableBodyProps> = ({ items }) => {
  return (
    <div className="table-body">
      {items.length > 0 ? (
        items.map((item, index) => (
          <div className="table-row" key={index}>
            <div className="row-item">{item.barcode}</div>
            <div className="row-item">{item.name}</div>
            <div className="row-item">{item.category}</div>
            <div className="row-item">{item.supplier}</div>
            <div className="row-item">{item.price}</div>
            <div className="row-item">{item.dateAdded}</div>
            <div className="row-item">{item.stocks}</div>
            <div className={`row-item status-${item.status.toLowerCase()}`}>
              {item.status}
            </div>
          </div>
        ))
      ) : (
        <div className="no-items-message">
          <p>No product items available</p>
        </div>
      )}
    </div>
  );
};

export default InventoryTableBody; 