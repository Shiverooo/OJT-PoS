import React, { useState, useEffect, useContext } from 'react';
import { SearchContext } from '../../../components/cashier/search-context.tsx';
import '../../../styles/cashier/cashier-dashboard.css';

function SalesScreen() {
    const products = [
        { name: "Dell Inspiron Laptop", image: require("../../../assets/images/computer.jpg") },
        { name: "HP Pavilion Desktop", image: require("../../../assets/images/computer.jpg") },
        { name: "Lenovo ThinkPad", image: require("../../../assets/images/computer.jpg") },
        { name: "ASUS ROG Strix", image: require("../../../assets/images/computer.jpg") },
        { name: "Acer Aspire Series", image: require("../../../assets/images/computer.jpg") },
        { name: "Apple MacBook Pro", image: require("../../../assets/images/computer.jpg") },
        { name: "Microsoft Surface Laptop", image: require("../../../assets/images/computer.jpg") },
        { name: "MSI Gaming Laptop", image: require("../../../assets/images/computer.jpg") },
        { name: "Alienware Aurora Desktop", image: require("../../../assets/images/computer.jpg") },
        { name: "Gigabyte Aero", image: require("../../../assets/images/computer.jpg") },
        { name: "Razer Blade 15", image: require("../../../assets/images/computer.jpg") },
        { name: "Samsung Galaxy Book", image: require("../../../assets/images/computer.jpg") },
    ];

    const navItems = [
        "Laptops and Desktops",
        "Printers and Ink",
        "Monitors",
        "Storage",
        "Other Accessories",
        "Gaming Devices"
    ];

    const [active, setActive] = useState(0);
    const { query } = useContext(SearchContext);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        document.title = "Infinitum PoS | Sale Screen";
    }, []);

    return (
        <div className="cashier-container">
            <div className="product-container">
                <div className="products-grid">
                    {filteredProducts.map((product, index) => (
                        <div className="product-card" key={index}>
                            <img src={product.image} alt={product.name} />
                            <div className="product-name">{product.name}</div>
                        </div>
                    ))}
                    {filteredProducts.length === 0 && <p>No products found.</p>}
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
        </div>
    );
}

export default SalesScreen;
