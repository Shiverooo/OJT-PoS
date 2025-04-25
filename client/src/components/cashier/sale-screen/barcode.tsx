// Barcode Icon Component

import React from "react";
import barcodeIcon from "../../../assets/images/barcode-icon.svg";

// Define and return the icon
const BarcodeIcon: React.FC = () => {
  return (
    <img src={barcodeIcon} alt="Barcode" className="icon" id="barcode-icon" />
  );
};

export default BarcodeIcon;
