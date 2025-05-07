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
  CartesianGrid,
} from "recharts";
import calendarIcon from "../../../assets/images/calendar.svg";

// Custom legend to use circle icons
const renderLegend = (props) => {
  const { payload } = props;
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 30, marginTop: 20 }}>
      {payload.map((entry, index) => (
        <div key={`item-${index}`} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: entry.color,
              marginRight: 6,
            }}
          ></span>
          <span style={{ color: "#666", fontSize: 15 }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

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
        <BarChart data={data} barCategoryGap={30} barGap={3}>
          {/* X and Y Axes, Tooltip, and Legend */}
          <CartesianGrid vertical={false} stroke="#bdbdbd" strokeWidth={2} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            domain={[10000, 60000]}
            tick={{ fontSize: 13 }}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip formatter={(value) => value.toLocaleString()} />
          <Legend content={renderLegend} verticalAlign="bottom" height={50} />

          {/* Sales and Purchase Bars */}
          <Bar
            dataKey="purchase"
            fill="#5d9cff"
            name="Purchase"
            radius={[8, 8, 0, 0]}
            barSize={28}
          />
          <Bar
            dataKey="sales"
            fill="#34c759"
            name="Sales"
            radius={[8, 8, 0, 0]}
            barSize={28}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesPurchaseChart;
