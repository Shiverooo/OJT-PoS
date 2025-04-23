import React, { useState, useEffect, useContext } from "react";
import { SearchContext } from "../../../components/cashier/search-context.tsx";
import { useSelectedProducts } from "../../../components/cashier/selected-products-context.tsx";
import "../../../styles/cashier/cashier-dashboard.css";

function SalesScreen() {
  const products = [
    // Laptops and Desktops
    {
      name: "Dell Inspiron Laptop",
      image: require("../../../assets/images/computer.jpg"),
      category: "Laptops and Desktops",
    },
    {
      name: "HP Pavilion Desktop",
      image: require("../../../assets/images/computer.jpg"),
      category: "Laptops and Desktops",
    },
    {
      name: "Lenovo ThinkPad",
      image: require("../../../assets/images/computer.jpg"),
      category: "Laptops and Desktops",
    },
    {
      name: "Apple MacBook Pro",
      image: require("../../../assets/images/computer.jpg"),
      category: "Laptops and Desktops",
    },
    {
      name: "Microsoft Surface Laptop",
      image: require("../../../assets/images/computer.jpg"),
      category: "Laptops and Desktops",
    },
    {
      name: "Acer Aspire Series",
      image: require("../../../assets/images/computer.jpg"),
      category: "Laptops and Desktops",
    },

    // Printers and Ink
    {
      name: "Canon PIXMA Inkjet Printer",
      image: require("../../../assets/images/computer.jpg"),
      category: "Printers and Ink",
    },
    {
      name: "HP DeskJet 2700",
      image: require("../../../assets/images/computer.jpg"),
      category: "Printers and Ink",
    },
    {
      name: "Epson EcoTank L3150",
      image: require("../../../assets/images/computer.jpg"),
      category: "Printers and Ink",
    },
    {
      name: "Brother HL-L2350DW",
      image: require("../../../assets/images/computer.jpg"),
      category: "Printers and Ink",
    },
    {
      name: "Samsung Xpress SL-M2020",
      image: require("../../../assets/images/computer.jpg"),
      category: "Printers and Ink",
    },
    {
      name: "Lexmark MB2236adw",
      image: require("../../../assets/images/computer.jpg"),
      category: "Printers and Ink",
    },

    // Monitors
    {
      name: 'Samsung 27" Curved Monitor',
      image: require("../../../assets/images/computer.jpg"),
      category: "Monitors",
    },
    {
      name: "LG UltraGear Gaming Monitor",
      image: require("../../../assets/images/computer.jpg"),
      category: "Monitors",
    },
    {
      name: "Dell UltraSharp U2723QE",
      image: require("../../../assets/images/computer.jpg"),
      category: "Monitors",
    },
    {
      name: "ASUS ProArt Display",
      image: require("../../../assets/images/computer.jpg"),
      category: "Monitors",
    },
    {
      name: "Acer Nitro XV272U",
      image: require("../../../assets/images/computer.jpg"),
      category: "Monitors",
    },
    {
      name: "ViewSonic VA2456-MHD",
      image: require("../../../assets/images/computer.jpg"),
      category: "Monitors",
    },

    // Storage
    {
      name: "Seagate 2TB External Drive",
      image: require("../../../assets/images/computer.jpg"),
      category: "Storage",
    },
    {
      name: "WD My Passport 1TB",
      image: require("../../../assets/images/computer.jpg"),
      category: "Storage",
    },
    {
      name: "Samsung T7 SSD 1TB",
      image: require("../../../assets/images/computer.jpg"),
      category: "Storage",
    },
    {
      name: "SanDisk Ultra Flair 128GB",
      image: require("../../../assets/images/computer.jpg"),
      category: "Storage",
    },
    {
      name: "Kingston A400 SSD 480GB",
      image: require("../../../assets/images/computer.jpg"),
      category: "Storage",
    },
    {
      name: "Crucial P3 Plus NVMe 1TB",
      image: require("../../../assets/images/computer.jpg"),
      category: "Storage",
    },

    // Gaming Devices
    {
      name: "Razer Viper Gaming Mouse",
      image: require("../../../assets/images/computer.jpg"),
      category: "Gaming Devices",
    },
    {
      name: "Logitech G Pro Keyboard",
      image: require("../../../assets/images/computer.jpg"),
      category: "Gaming Devices",
    },
    {
      name: "Xbox Series X Controller",
      image: require("../../../assets/images/computer.jpg"),
      category: "Gaming Devices",
    },
    {
      name: "PlayStation DualSense",
      image: require("../../../assets/images/computer.jpg"),
      category: "Gaming Devices",
    },
    {
      name: "SteelSeries Arctis 7",
      image: require("../../../assets/images/computer.jpg"),
      category: "Gaming Devices",
    },
    {
      name: "Elgato Stream Deck Mini",
      image: require("../../../assets/images/computer.jpg"),
      category: "Gaming Devices",
    },

    // Other Accessories
    {
      name: "Logitech Wireless Keyboard",
      image: require("../../../assets/images/computer.jpg"),
      category: "Other Accessories",
    },
    {
      name: "Anker USB-C Hub",
      image: require("../../../assets/images/computer.jpg"),
      category: "Other Accessories",
    },
    {
      name: "Ugreen HDMI Cable",
      image: require("../../../assets/images/computer.jpg"),
      category: "Other Accessories",
    },
    {
      name: "TP-Link USB WiFi Adapter",
      image: require("../../../assets/images/computer.jpg"),
      category: "Other Accessories",
    },
    {
      name: "Baseus Phone Stand",
      image: require("../../../assets/images/computer.jpg"),
      category: "Other Accessories",
    },
    {
      name: "ORICO USB Docking Station",
      image: require("../../../assets/images/computer.jpg"),
      category: "Other Accessories",
    },
  ];

  const navItems = [
    "Laptops and Desktops",
    "Printers and Ink",
    "Monitors",
    "Storage",
    "Gaming Devices",
    "Other Accessories",
  ];

  const [active, setActive] = useState(0);
  const { query } = useContext(SearchContext);
  const { addProduct } = useSelectedProducts();

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) &&
      product.category === navItems[active]
  );

  useEffect(() => {
    document.title = "Infinitum PoS | Sale Screen";
  }, []);

  return (
    <div className="cashier-container">
      <div className="product-container">
        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <div
              className="product-card"
              key={index}
              onClick={() => addProduct(product.name)}
            >
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
