import React from 'react';
import barcodeIcon from "../../assets/images/barcode-icon.svg";

const BarcodeIcon: React.FC = () => {
    return (
        <img
            src={barcodeIcon}
            alt="Barcode"
            className="icon"
            id="barcode-icon"
        />
    );
};

export default BarcodeIcon;
