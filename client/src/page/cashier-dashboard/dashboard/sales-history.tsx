import React, { useEffect, useState } from "react";
import "../../../styles/cashier/history.css";
import { Sale } from "../../../types/sales.ts";
import SearchBar from "../../../components/cashier/sale-history/history-search.tsx";
import SalesList from "../../../components/cashier/sale-history/sales-list.tsx";
import Receipt from "../../../components/cashier/sale-history/history-receipt.tsx";

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

  return (
    <div className="history-receipt-wrapper">
      <div className="history-container">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <SalesList
          groupedSales={groupedSales}
          selectedSale={selectedSale}
          onSaleSelect={setSelectedSale}
          currentDate={currentDate}
        />
      </div>
      <Receipt
        selectedSale={selectedSale}
        salesData={salesData}
      />
    </div>
  );
};

export default SearchWithDateAndSalesSummary;
