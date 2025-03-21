import React, {useState} from 'react'
import '../../../styles/cashier/main-section.css'

function SalesScreen() {
    const products = new Array(12).fill({
        name: "Computer Set",
        image: require("../../../assets/images/computer.jpg"),
    });

    const navItems = [
        "Laptops and Desktops",
        "Printers and Ink",
        "Monitors",
        "Storage",
        "Other Accessories",
        "Gaming Devices"
        ];

    const [active, setActive] = useState(0);

    return (
        <div className="cashier-container">
            <div className="product-container">
                <div className="products-grid">
                    {products.map((product, index) => (
                        <div className="product-card" key={index}>
                        <img src={product.image} alt={product.name} />
                        <div className="product-name">{product.name}</div> {/* Product name overlay */}
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
        </div>

  )
}

export default SalesScreen;
