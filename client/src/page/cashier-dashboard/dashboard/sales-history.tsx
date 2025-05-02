import React, { useEffect, useState } from "react";
import "../../../styles/cashier/history.css";
import SearchIcon from "../../../assets/images/search-icon.svg";
import { Sale } from "../../../types/sales";

const formatDateLong = (shortDate: string) => {
  const dateObj = new Date(shortDate);
  return dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const monthNameToNumber = (monthName: string) => {
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

const SearchWithDateAndSalesSummary = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [salesData, setSalesData] = useState<Sale[]>([]);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
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

    // Load sales data from localStorage
    const loadSalesData = () => {
      const storedSales = localStorage.getItem("sales");
      if (storedSales) {
        const sales = JSON.parse(storedSales);
        setSalesData(sales);
        if (sales.length > 0) {
          setSelectedSale(sales[0]);
        }
      }
    };

    loadSalesData();
    document.title = "Infinitum PoS | Sales History";

    // Add event listener for storage changes
    window.addEventListener("storage", loadSalesData);
    return () => window.removeEventListener("storage", loadSalesData);
  }, []);

  // Filter sales based on search query
  const filteredSales = salesData.filter((sale) => {
    const saleDate = sale.date.toLowerCase();
    const orderNumber = sale.orderNumber.toLowerCase();
    const formattedSearchQuery = searchQuery.trim().toLowerCase();
    return (
      saleDate.includes(formattedSearchQuery) ||
      orderNumber.includes(formattedSearchQuery)
    );
  });

  const salesToDisplay = searchQuery ? filteredSales : salesData;

  const groupedSales = Object.entries(
    salesToDisplay.reduce((acc, sale) => {
      if (!acc[sale.date]) acc[sale.date] = [];
      acc[sale.date].push(sale);
      return acc;
    }, {} as Record<string, Sale[]>)
  ).sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()); // Sort by date descending

  const emptyReceipt: Sale = {
    id: "",
    amount: 0,
    orderNumber: "No Order",
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }),
    time: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }),
    paymentType: "---",
    items: [],
  };

  return (
    <div className="history-receipt-wrapper">
      <div className="history-container">
        <div className="search-date-container">
          <div className="search-bar">
            <img src={SearchIcon} alt="Search Icon" className="search-icon" />
            <input
              type="text"
              placeholder="Search by date or order number"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {groupedSales.length === 0 ? (
          <div className="no-sales-message">
            {searchQuery
              ? "No sales found for this search."
              : "No sales history available."}
          </div>
        ) : (
          groupedSales.map(([date, sales]) => (
            <div key={date}>
              <div className="current-date">
                {date ===
                new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
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
                  <div className="amount">
                    ₱
                    {sale.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div className="date-time">
                    <div>{sale.date}</div>
                    <div className="time">{sale.time}</div>
                  </div>
                  <div className="order-number">{sale.orderNumber}</div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      <div className="receipt-box">
        {(selectedSale || salesData.length === 0) && (
          <>
            <div className="receipt-total-amount">
              <h1>
                ₱
                {(selectedSale?.amount || 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h1>
              <p>Total</p>
            </div>

            <div className="receipt-items-list">
              {(selectedSale?.items || []).map((item, idx) => (
                <div className="item-row" key={idx}>
                  <div>
                    <strong>{item.name}</strong>
                    <div className="item-qty">
                      {item.qty} x ₱
                      {item.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                  <div className="price">
                    ₱
                    {(item.qty * item.price).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
              ))}
              {!selectedSale && (
                <div className="empty-receipt-message">
                  <p>No items to display</p>
                </div>
              )}
            </div>

            <div className="receipt-summary-total">
              <div>Total</div>
              <div className="price">
                ₱
                {(selectedSale?.amount || 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            <div className="receipt-payment-type">
              {selectedSale?.paymentType || "---"}
            </div>

            <div className="receipt-footer">
              <div>
                {selectedSale
                  ? `${selectedSale.date}, ${selectedSale.time}`
                  : `${emptyReceipt.date}, ${emptyReceipt.time}`}
              </div>
              <div>{selectedSale?.orderNumber || emptyReceipt.orderNumber}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchWithDateAndSalesSummary;
