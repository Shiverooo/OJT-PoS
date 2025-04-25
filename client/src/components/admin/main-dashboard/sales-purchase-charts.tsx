// Sales and Purchase Chart Component

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

// Sales Purchase Chart component definition
function SalesPurchaseChart({ data, height = 300 }) {
  return (
    <div className="sales-purchase">
      {/* Chart Header with Title and Filter Button */}
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

      {/* Responsive Container for BarChart */}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          {/* X and Y Axes, Tooltip, and Legend */}
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* Sales and Purchase Bars */}
          <Bar dataKey="purchase" fill="#6495ED" name="Purchase" />
          <Bar dataKey="sales" fill="#32CD32" name="Sales" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesPurchaseChart;
