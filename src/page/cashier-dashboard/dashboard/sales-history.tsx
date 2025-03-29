import React, { useEffect, useState } from "react";
import "../../../styles/cashier/history.css";
import SearchIcon from "../../../assets/images/search-icon.svg";

const SearchWithDateAndSalesSummary = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrentDate(date.toLocaleDateString("en-US", options));
  }, []);

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
      });
      setCurrentDateTime(dateString);
      setCurrentTime(timeString);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="history-container">
      <div className="search-date-container">
        <div className="search-bar">
          <img src={SearchIcon} alt="Search Icon" className="search-icon" />
          <input type="text" placeholder="Search" className="search-input" />
        </div>
        <div className="current-date">{currentDate}</div>
      </div>

      <div className="sales-summary-container">
        <div className="amount">$1,550</div>
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
  );
};

export default SearchWithDateAndSalesSummary;
