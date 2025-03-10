import React, { useState } from 'react';
import '../styles/cashier/cashier.css';
import MainSection from '../components/main-section.tsx';
import Receipt from '../components/receipt.tsx';
<<<<<<< HEAD
import Header from '../components/header.tsx'
=======

>>>>>>> bbacb8a65815d6492efe089bf474774e9b3e1c52

function Cashier() {
    
    return (
<<<<<<< HEAD
        <div className="header">
            <MainSection/>
            <Receipt/>
            <Header />
=======
        <div className="cashier-container">
            <MainSection/>
            <Receipt/>
            {/* <ItemSelection /> */}
            
                {/* Receipt Section */}
                
>>>>>>> bbacb8a65815d6492efe089bf474774e9b3e1c52
        </div>
    );
}
export default Cashier;
