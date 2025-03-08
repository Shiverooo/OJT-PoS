import React, { useState } from 'react';
import '../styles/cashier/cashier.css';
import MainSection from '../components/main-section.tsx';
import Receipt from '../components/receipt.tsx';


function Cashier() {
    
    return (
        <div className="cashier-container">
            <MainSection/>
            <Receipt/>
            {/* <ItemSelection /> */}
            
                {/* Receipt Section */}
                
        </div>
    );
}
export default Cashier;
