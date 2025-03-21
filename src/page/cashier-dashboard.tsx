import React, { useState, useEffect } from 'react';
import '../styles/cashier/cashier.css';
import MainSection from '../components/cashier/main-section.tsx';
import Receipt from '../components/cashier/receipt.tsx';

function CashierDashboard() {
    useEffect(() => {
        document.title = "Infinitum PoS | Cashier";
    }, []);
    
    return (
        <div className="cashier-container">
            <MainSection/>
            <Receipt/>
        </div>
    );
}

export default CashierDashboard;
