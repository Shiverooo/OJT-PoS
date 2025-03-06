import React, { useState } from 'react';
import '../styles/cashier/cashier.css';
import Header from '../components/header.tsx'
import ItemSelection from '../components/item-selection.tsx'


function Cashier() {
    const products = new Array(12).fill({
        name: "Computer Set",
        image: require("../assets/images/computer.jpg"),
    });

    const [active, setActive] = useState(0);
    const navItems = [
        "Laptops and Desktops",
        "Printers and Ink",
        "Monitors",
        "Storage",
        "Other Accessories",
        "Gaming Devices"
    ];

    const today = new Date().toLocaleDateString("en-US");
    const [receiptItems, setReceiptItems] = useState([
        { name: "Red Dragon Mouse", quantity: 1, price: 100 },
        { name: "RAPOO Keyboard", quantity: 1, price: 150 },
        { name: "Seagate HDD", quantity: 1, price: 200 },
        { name: "MSI Monitor", quantity: 1, price: 1000 },
    ]);

    const totalAmount = receiptItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <div>
            <Header />
            {/* <ItemSelection /> */}
            <div className="cashier-container">
                <div className="product-container">
                    <div className="products-grid">
                        {products.map((product, index) => (
                            <div className="product-card" key={index}>
                                <img src={product.image} alt={product.name} />
                            </div>
                        ))}
                    </div>

                    <div className="nav-category">
                        <nav className="navbar">
                            <ul className="nav-list">
                                {navItems.map((item, index) => (
                                    <li
                                        key={index}
                                        className={`nav-item ${active === index ? "active" : ""}`}
                                        onClick={() => setActive(index)}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>    
                </div>
                
                {/* Receipt Section */}
                <div className="receipt-section">
                    <div className="table-section">
                        <table className="receipt-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {receiptItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.price}</td>
                                        <td>${item.quantity * item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="receipt-total">
                        <strong>Total</strong>
                        <strong>${totalAmount}</strong>
                    </div>
                    <div className="receipt-actions">
                        <button className="edit-btn">EDIT</button>
                        <button className="pay-btn">PAY</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Cashier;
