// Best Selling Category Section Component

import React from "react";

function BestSellingCategory() {
  return (
    <div className="best-selling-category">
      <div className="best-category">
        <h2>Best Selling Category</h2>
        <div className="sales-table-wrapper">
          {/* Table Header with column titles */}
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

          {/* Table Body where category data is displayed */}
          <div className="table-body-wrapper">
            <table className="sales-table-body">
              <colgroup>
                <col style={{ width: "30%" }} />
                <col style={{ width: "30%" }} />
                <col style={{ width: "30%" }} />
              </colgroup>
              <tbody>
                <tr className="no-hover-row">
                  <td colSpan={3} style={{ textAlign: 'center', color: '#7b7b7b', padding: '10px 0' }}>
                    No purchase item available.
                  </td>
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
