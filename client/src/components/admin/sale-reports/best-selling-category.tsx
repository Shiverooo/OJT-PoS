import React from "react";

function BestSellingCategory() {
  return (
    <div className="best-selling-category">
      <div className="best-category">
        <h2>Best Selling Category</h2>
        <div className="sales-table-wrapper">
          {/* Table Header */}
          <table className="sales-table-header">
            <colgroup>
              <col style={{ width: "30%" }} />
              <col style={{ width: "30%" }} />
              <col style={{ width: "30%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>Category</th>
                <th>Turn Over</th>
                <th>Increased By</th>
              </tr>
            </thead>
          </table>

          {/* Table Body */}
          <div className="table-body-wrapper">
            <table className="sales-table-body">
              <colgroup>
                <col style={{ width: "30%" }} />
                <col style={{ width: "30%" }} />
                <col style={{ width: "30%" }} />
              </colgroup>
              <tbody>
                {/* Category rows */}
                <tr>
                  <td>Peripherals</td>
                  <td>₱52,000</td>
                  <td className="increased-by">4%</td>
                </tr>
                <tr>
                  <td>Display</td>
                  <td>₱22,000</td>
                  <td className="increased-by">2%</td>
                </tr>
                <tr>
                  <td>Memory</td>
                  <td>₱22,000</td>
                  <td className="increased-by">1.5%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BestSellingCategory;
