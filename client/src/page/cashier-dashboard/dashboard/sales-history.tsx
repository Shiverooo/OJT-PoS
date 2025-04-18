import React, { useEffect, useState } from "react";
import "../../../styles/cashier/history.css";
import SearchIcon from "../../../assets/images/search-icon.svg";

const generateSalesData = () => {
  const now = new Date();

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  return [
    // Sales for today's date
    {
      id: "1001",
      amount: 1200,
      orderNumber: "#4-1001",
      date: now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }),
      time: formatTime(new Date(now.getTime() - 2 * 60 * 60 * 1000)),
      paymentType: "Cash",
      items: [
        { name: "Logitech Mouse", qty: 1, price: 200 },
        { name: "Corsair Keyboard", qty: 1, price: 300 },
        { name: "Kingston SSD", qty: 1, price: 700 },
      ],
    },
    {
      id: "1002",
      amount: 1550,
      orderNumber: "#4-1002",
      date: now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }),
      time: formatTime(new Date(now.getTime() - 1 * 60 * 60 * 1000)),
      paymentType: "Cash",
      items: [
        { name: "Red Dragon Mouse", qty: 1, price: 100 },
        { name: "RAPOO Keyboard", qty: 1, price: 150 },
        { name: "Seagate HDD", qty: 1, price: 200 },
        { name: "MSI Monitor", qty: 1, price: 1000 },
      ],
    },
    {
      id: "1003",
      amount: 950,
      orderNumber: "#4-1003",
      date: now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }),
      time: formatTime(new Date(now.getTime() - 30 * 60 * 1000)),
      paymentType: "Cash",
      items: [
        { name: "Wireless Mouse", qty: 2, price: 500 },
        { name: "Mouse Pad", qty: 1, price: 50 },
      ],
    },

    // Sales for March 24, 2025 (Yesterday)
    {
      id: "3001",
      amount: 1950,
      orderNumber: "#4-3001",
      date: "March 24, 2025",
      time: "11:25:30 AM",
      paymentType: "Cash",
      items: [
        { name: "Dell Laptop", qty: 1, price: 1500 },
        { name: "Wireless Mouse", qty: 1, price: 350 },
        { name: "Mouse Pad", qty: 1, price: 100 },
      ],
    },
    {
      id: "3002",
      amount: 2200,
      orderNumber: "#4-3002",
      date: "March 24, 2025",
      time: "2:10:50 PM",
      paymentType: "Card",
      items: [
        { name: "HP Desktop", qty: 1, price: 1800 },
        { name: "Logitech Keyboard", qty: 1, price: 400 },
      ],
    },
    {
      id: "3003",
      amount: 1270,
      orderNumber: "#4-3003",
      date: "March 24, 2025",
      time: "4:45:00 PM",
      paymentType: "Cash",
      items: [
        { name: "Canon Camera", qty: 1, price: 1000 },
        { name: "Camera Case", qty: 1, price: 150 },
        { name: "Memory Card", qty: 1, price: 120 },
      ],
    },

    // Sales for March 21, 2025
    {
      id: "2001",
      amount: 2450,
      orderNumber: "#4-2001",
      date: "March 21, 2025",
      time: "10:15:30 AM",
      paymentType: "Cash",
      items: [
        { name: "Acer Laptop", qty: 1, price: 2000 },
        { name: "Wireless Mouse", qty: 1, price: 400 },
        { name: "Mouse Pad", qty: 1, price: 50 },
      ],
    },
    {
      id: "2002",
      amount: 1750,
      orderNumber: "#4-2002",
      date: "March 21, 2025",
      time: "1:45:10 PM",
      paymentType: "Cash",
      items: [
        { name: "Canon Printer", qty: 1, price: 1500 },
        { name: "Ink Cartridge", qty: 1, price: 250 },
      ],
    },
    {
      id: "2003",
      amount: 870,
      orderNumber: "#4-2003",
      date: "March 21, 2025",
      time: "3:20:55 PM",
      paymentType: "Cash",
      items: [
        { name: "Sandisk Flash Drive 64GB", qty: 2, price: 350 },
        { name: "HDMI Cable", qty: 1, price: 170 },
      ],
    },
  ];
};

const formatDateLong = (shortDate) => {
  const dateObj = new Date(shortDate);
  return dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const monthNameToNumber = (monthName) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = months.indexOf(monthName);
  return monthIndex >= 0 ? `0${monthIndex + 1}`.slice(-2) : null;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SearchWithDateAndSalesSummary = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const date = new Date();
    setCurrentDate(
      date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    setSalesData(generateSalesData());
    document.title = "Infinitum PoS | Sales History"; // Updated document title
  }, []);

  useEffect(() => {
    if (salesData.length > 0) {
      setSelectedSale(salesData[0]);
    }
  }, [salesData]);

  // Filter sales based on search query
  const filteredSales = salesData.filter((sale) => {
    const saleDate = sale.date.toLowerCase();
    const formattedSearchQuery = searchQuery.trim().toLowerCase();

    return saleDate.includes(formattedSearchQuery);
  });

  const salesToDisplay = searchQuery ? filteredSales : salesData;

  const groupedSales = Object.entries(
    salesToDisplay.reduce((acc, sale) => {
      if (!acc[sale.date]) acc[sale.date] = [];
      acc[sale.date].push(sale);
      return acc;
    }, {})
  );

  return (
    <div className="history-receipt-wrapper">
      <div className="history-container">
        <div className="search-date-container">
          <div className="search-bar">
            <img src={SearchIcon} alt="Search Icon" className="search-icon" />
            <input
              type="text"
              placeholder="Search By Month & Date (e.g., March 25)"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {groupedSales.length === 0 ? (
          <div>No sales found for this search.</div>
        ) : (
          groupedSales.map(([date, sales]) => (
            <div key={date}>
              <div className="current-date">
                {date ===
                new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                  ? currentDate
                  : formatDateLong(date)}
              </div>
              {sales.map((sale) => (
                <div
                  key={sale.id}
                  className={`sales-summary-container ${
                    selectedSale?.id === sale.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedSale(sale)}
                >
                  <div className="amount">₱{sale.amount.toFixed(2)}</div>
                  <div className="date-time">
                    <div>{sale.date}</div>
                    <div className="time">{sale.time}</div>
                  </div>
                  <div className="order-number">
                    <span>#4-</span>
                    <strong>{sale.id}</strong>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {selectedSale && (
        <div className="receipt-box">
          <div className="receipt-total-amount">
            <h1>₱{selectedSale.amount.toFixed(2)}</h1>
            <p>Total</p>
          </div>

          <div className="receipt-items-list">
            {selectedSale.items.map((item, idx) => (
              <div className="item-row" key={idx}>
                <div>
                  <strong>{item.name}</strong>
                  <div className="item-qty">
                    {item.qty} x {item.price.toFixed(2)}
                  </div>
                </div>
                <div className="price">
                  ₱{(item.qty * item.price).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="receipt-summary-total">
            <div>Total</div>
            <div className="price">₱{selectedSale.amount.toFixed(2)}</div>
          </div>
          <div className="receipt-payment-type">{selectedSale.paymentType}</div>

          <div className="receipt-footer">
            <div>
              {selectedSale.date}, {selectedSale.time}
            </div>
            <div>{selectedSale.orderNumber}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchWithDateAndSalesSummary;
