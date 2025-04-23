import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import calendarIcon from "../../../assets/images/calendar.svg";

function SalesPurchaseChart({ data, height = 300 }) {
  return (
    <div className="sales-purchase">
      <div className="main-header">
        <h2>Sales</h2>
        <button className="filter-btn">
          <img
            src={calendarIcon}
            alt="Calendar Icon"
            className="calendar-icon"
          />
          Weekly
        </button>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="purchase" fill="#6495ED" name="Purchase" />
          <Bar dataKey="sales" fill="#32CD32" name="Sales" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesPurchaseChart;
