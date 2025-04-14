import React, { useState } from "react";
import "../../../styles/admin/user-management.css";
import searchIcon from "../../../assets/images/search-icon.svg";

function UserManagement() {
  const users = [
    {
      fullName: "Jerson Mamangun",
      age: 23,
      contact: "0991650344",
      email: "jerson@gmail.com",
      dateAdded: "11/12/22",
    },
    {
      fullName: "Jeriel Falla",
      age: 23,
      contact: "09975509103",
      email: "jeriel@gmail.com",
      dateAdded: "21/12/22",
    },
    {
      fullName: "John Philip Barnchia",
      age: 23,
      contact: "09935815603",
      email: "jeypee@gmail.com",
      dateAdded: "05/12/22",
    },
    {
      fullName: "Matthew Cabanban",
      age: 23,
      contact: "09152345766",
      email: "matthew@gmail.com",
      dateAdded: "08/12/22",
    },
  ];

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (index) => {
    if (selectedUsers.includes(index)) {
      setSelectedUsers(selectedUsers.filter((i) => i !== index));
    } else {
      setSelectedUsers([...selectedUsers, index]);
    }
  };

  return (
    <div className="user-management-container">
      <div className="user-management">
        <div className="search-user-management">
          <div className="user-search-bar">
            <img src={searchIcon} alt="Search Icon" className="search-icon" />
            <input
              type="text"
              placeholder="Search user management"
              className="user-search-input"
            />
          </div>
        </div>
        <div className="header-user-btn">
          <div>
            <button className="btn-add-user">Add User</button>
            <button className="btn-filters-user">Filters</button>
          </div>
        </div>
      </div>

      <div className="user-management-section">
        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Full Name</th>
                <th>Age</th>
                <th>Contact number</th>
                <th>Email</th>
                <th>Date Added</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td>{user.fullName}</td>
                  <td>{user.age}</td>
                  <td>{user.contact}</td>
                  <td>{user.email}</td>
                  <td>{user.dateAdded}</td>
                  <td>...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
