import React, { useState, useEffect, useContext } from "react";
import { SearchContext } from "../../../components/cashier/search-context.tsx";
import { useSelectedProducts } from "../../../components/cashier/selected-products-context.tsx";
import "../../../styles/cashier/cashier-dashboard.css";
import computerImage from "../../../assets/images/computer.jpg";

function SalesScreen() {
  const products = [
    // Laptops and Desktops
    {
      name: "Dell Inspiron Laptop",
      image: computerImage,
      category: "Laptops and Desktops",
      price: 30000,
    },
    {
      name: "HP Pavilion Desktop",
      image: computerImage,
      category: "Laptops and Desktops",
      price: 35000,
    },
    {
      name: "Lenovo ThinkPad",
      image: computerImage,
      category: "Laptops and Desktops",
      price: 40000,
    },
    {
      name: "Apple MacBook Pro",
      image: computerImage,
      category: "Laptops and Desktops",
      price: 90000,
    },
    {
      name: "Microsoft Surface Laptop",
      image: computerImage,
      category: "Laptops and Desktops",
      price: 75000,
    },
    {
      name: "Acer Aspire Series",
      image: computerImage,
      category: "Laptops and Desktops",
      price: 28000,
    },

    // Printers and Ink
    {
      name: "Canon PIXMA Inkjet Printer",
      image: computerImage,
      category: "Printers and Ink",
      price: 5000,
    },
    {
      name: "HP DeskJet 2700",
      image: computerImage,
      category: "Printers and Ink",
      price: 4500,
    },
    {
      name: "Epson EcoTank L3150",
      image: computerImage,
      category: "Printers and Ink",
      price: 8500,
    },
    {
      name: "Brother HL-L2350DW",
      image: computerImage,
      category: "Printers and Ink",
      price: 7000,
    },
    {
      name: "Samsung Xpress SL-M2020",
      image: computerImage,
      category: "Printers and Ink",
      price: 6500,
    },
    {
      name: "Lexmark MB2236adw",
      image: computerImage,
      category: "Printers and Ink",
      price: 8000,
    },

    // Monitors
    {
      name: 'Samsung 27" Curved Monitor',
      image: computerImage,
      category: "Monitors",
      price: 12000,
    },
    {
      name: "LG UltraGear Gaming Monitor",
      image: computerImage,
      category: "Monitors",
      price: 18000,
    },
    {
      name: "Dell UltraSharp U2723QE",
      image: computerImage,
      category: "Monitors",
      price: 22000,
    },
    {
      name: "ASUS ProArt Display",
      image: computerImage,
      category: "Monitors",
      price: 24000,
    },
    {
      name: "Acer Nitro XV272U",
      image: computerImage,
      category: "Monitors",
      price: 17000,
    },
    {
      name: "ViewSonic VA2456-MHD",
      image: computerImage,
      category: "Monitors",
      price: 10000,
    },

    // Storage
    {
      name: "Seagate 2TB External Drive",
      image: computerImage,
      category: "Storage",
      price: 4000,
    },
    {
      name: "WD My Passport 1TB",
      image: computerImage,
      category: "Storage",
      price: 3500,
    },
    {
      name: "Samsung T7 SSD 1TB",
      image: computerImage,
      category: "Storage",
      price: 6000,
    },
    {
      name: "SanDisk Ultra Flair 128GB",
      image: computerImage,
      category: "Storage",
      price: 1200,
    },
    {
      name: "Kingston A400 SSD 480GB",
      image: computerImage,
      category: "Storage",
      price: 2500,
    },
    {
      name: "Crucial P3 Plus NVMe 1TB",
      image: computerImage,
      category: "Storage",
      price: 5200,
    },

    // Gaming Devices
    {
      name: "Razer Viper Gaming Mouse",
      image: computerImage,
      category: "Gaming Devices",
      price: 3000,
    },
    {
      name: "Logitech G Pro Keyboard",
      image: computerImage,
      category: "Gaming Devices",
      price: 4500,
    },
    {
      name: "Xbox Series X Controller",
      image: computerImage,
      category: "Gaming Devices",
      price: 5000,
    },
    {
      name: "PlayStation DualSense",
      image: computerImage,
      category: "Gaming Devices",
      price: 4800,
    },
    {
      name: "SteelSeries Arctis 7",
      image: computerImage,
      category: "Gaming Devices",
      price: 7000,
    },
    {
      name: "Elgato Stream Deck Mini",
      image: computerImage,
      category: "Gaming Devices",
      price: 6000,
    },

    // Other Accessories
    {
      name: "Logitech Wireless Keyboard",
      image: computerImage,
      category: "Other Accessories",
      price: 1500,
    },
    {
      name: "Anker USB-C Hub",
      image: computerImage,
      category: "Other Accessories",
      price: 1800,
    },
    {
      name: "Ugreen HDMI Cable",
      image: computerImage,
      category: "Other Accessories",
      price: 600,
    },
    {
      name: "TP-Link USB WiFi Adapter",
      image: computerImage,
      category: "Other Accessories",
      price: 900,
    },
    {
      name: "Baseus Phone Stand",
      image: computerImage,
      category: "Other Accessories",
      price: 750,
    },
    {
      name: "ORICO USB Docking Station",
      image: computerImage,
      category: "Other Accessories",
      price: 2000,
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
              onClick={() => addProduct(product)} 
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
