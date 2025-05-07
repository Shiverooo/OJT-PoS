import React from 'react';

const InventoryTableHeader: React.FC = () => {
  return (
    <div className="table-header">
      <div className="header-item">BARCODE</div>
      <div className="header-item">NAME</div>
      <div className="header-item">CATEGORY</div>
      <div className="header-item">SUPPLIER</div>
      <div className="header-item">PRICE</div>
      <div className="header-item">DATE ADDED</div>
      <div className="header-item">STOCKS</div>
      <div className="header-item">STATUS</div>
    </div>
  );
};

export default InventoryTableHeader; 