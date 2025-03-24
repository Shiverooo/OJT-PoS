import React, { useEffect, useState } from "react";
import "../../../styles/cashier/history.css";
import SearchIcon from "../../../assets/images/search-icon.svg";

const SearchWithDateAndSalesSummary = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  // Update current date
  useEffect(() => {
    const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrentDate(date.toLocaleDateString("en-US", options));

    // Set the document title when the component is mounted
    document.title = "Infinitum PoS | Sale History"; 
  }, []);

  // Update date and time every second
  useEffect(() => {
    const updateDateTime = () => {
      const date = new Date();
      const dateString = date.toLocaleDateString("en-US", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      });
      const timeString = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      setCurrentDateTime(dateString);
      setCurrentTime(timeString);
    };

    updateDateTime(); // Set the initial date and time
    const interval = setInterval(updateDateTime, 1000); // Update every second

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="history-receipt-wrapper">
      <div className="history-container">
        <div className="search-date-container">
          <div className="search-bar">
            <img src={SearchIcon} alt="Search Icon" className="search-icon" />
            <input type="text" placeholder="Search" className="search-input" />
          </div>
          <div className="current-date">{currentDate}</div>
        </div>

        <div className="sales-summary-container">
          <div className="amount">₱1,550.00</div>
          <div className="date-time">
            <div>{currentDateTime}</div>
            <div className="time">{currentTime}</div>
          </div>
          <div className="order-number">
            <span>#4-</span>
            <strong>1002</strong>
          </div>
        </div>
      </div>

      {/* Receipt box */}
      <div className="receipt-box">
        <div className="receipt-total-amount">
          <h1>₱1,550.00</h1>
          <p>Total</p>
        </div>

        <div className="receipt-items-list">
          <div className="item-row">
            <div>
              <strong>Red Dragon Mouse</strong>
              <div className="item-qty">1 x 100.00</div>
            </div>
            <div className="price">₱100</div>
          </div>

          <div className="item-row">
            <div>
              <strong>RAPOO Keyboard</strong>
              <div className="item-qty">1 x 150.00</div>
            </div>
            <div className="price">₱150</div>
          </div>

          <div className="item-row">
            <div>
              <strong>Seagate HDD</strong>
              <div className="item-qty">1 x 200.00</div>
            </div>
            <div className="price">₱200</div>
          </div>

          <div className="item-row">
            <div>
              <strong>MSI Monitor</strong>
              <div className="item-qty">1 x 1000.00</div>
            </div>
            <div className="price">₱1000</div>
          </div>
        </div>

        <div className="receipt-summary-total">
          <div>Total</div>
          <div className="price">₱1,550.00</div>
        </div>
        <div className="receipt-payment-type">Cash</div>

        <div className="receipt-footer">
            <div>{currentDateTime}, {currentTime}</div>
          <div>#4-1002</div>
        </div>
      </div>
    </div>
  );
};

export default SearchWithDateAndSalesSummary;
