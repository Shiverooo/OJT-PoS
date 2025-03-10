import React, { useState } from 'react';
import '../styles/cashier/cashier.css';
import MainSection from '../components/main-section.tsx';
import Receipt from '../components/receipt.tsx';
import Header from '../components/header.tsx'

function Cashier() {
    
    return (
        <div className="header">
            <MainSection/>
            <Receipt/>
            <Header />
        </div>
    );
}
export default Cashier;
