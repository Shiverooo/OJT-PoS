import React, { useState, useEffect } from "react";
import "../../../styles/admin/user-management.css";
import searchIcon from "../../../assets/images/search-icon.svg";
import ascendingIcon from "../../../assets/images/ascending-icon.svg";
import descendingIcon from "../../../assets/images/descending-icon.svg";
import axios from "axios";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const getUserProfile = async() =>{
    const resUser = await axios.get('/users/req-data');
    setUsers(resUser.data.users);
  }
  useEffect(()=>{
    getUserProfile();
  },[])
  // const initialUsers = [
  //   {
  //     fullName: "Jerson Mamangun",
  //     email: "jerson@gmail.com",
  //     contact: "0991650344",
  //     dateAdded: "11/12/22",
  //   },
  //   {
  //     fullName: "Jeriel Falla",
  //     email: "jeriel@gmail.com",
  //     contact: "09975509103",
  //     dateAdded: "12/12/22",
  //   },
  //   {
  //     fullName: "John Philip Barnchia",
  //     email: "jeypee@gmail.com",
  //     contact: "09935815603",
  //     dateAdded: "05/12/22",
  //   },
  //   {
  //     fullName: "Matthew Cabanban",
  //     email: "matthew@gmail.com",
  //     contact: "09152345766",
  //     dateAdded: "08/12/22",
  //   },
  // ];

  
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [sortOrderFullName, setSortOrderFullName] = useState<"asc" | "desc">(
    "asc"
  );
  const [sortOrderEmail, setSortOrderEmail] = useState<"asc" | "desc">("asc");
  const [sortOrderDate, setSortOrderDate] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (index: number) => {
    if (selectedUsers.includes(index)) {
      setSelectedUsers(selectedUsers.filter((i) => i !== index));
    } else {
      setSelectedUsers([...selectedUsers, index]);
    }
  };

  const handleSortByFullName = () => {
    const newOrder = sortOrderFullName === "asc" ? "desc" : "asc";
    const sorted = [...users].sort((a, b) =>
      newOrder === "asc"
        ? a.fullName.localeCompare(b.fullName)
        : b.fullName.localeCompare(a.fullName)
    );
    setUsers(sorted);
    setSortOrderFullName(newOrder);
  };

  const handleSortByEmail = () => {
    const newOrder = sortOrderEmail === "asc" ? "desc" : "asc";
    const sorted = [...users].sort((a, b) =>
      newOrder === "asc"
        ? a.email.localeCompare(b.email)
        : b.email.localeCompare(a.email)
    );
    setUsers(sorted);
    setSortOrderEmail(newOrder);
  };

  const handleSortByDateAdded = () => {
    const newOrder = sortOrderDate === "asc" ? "desc" : "asc";
    const sorted = [...users].sort((a, b) => {
      const [dayA, monthA, yearA] = a.dateAdded.split("/").map(Number);
      const [dayB, monthB, yearB] = b.dateAdded.split("/").map(Number);

      const dateA = new Date(2000 + yearA, monthA - 1, dayA);
      const dateB = new Date(2000 + yearB, monthB - 1, dayB);

      return newOrder === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
    setUsers(sorted);
    setSortOrderDate(newOrder);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                <th>
                  <div className="th-sort-wrapper">
                    Full Name
                    <button
                      onClick={handleSortByFullName}
                      className="sort-button-name"
                      title="Sort by Full Name"
                    >
                      <img
                        src={
                          sortOrderFullName === "asc"
                            ? ascendingIcon
                            : descendingIcon
                        }
                        alt={
                          sortOrderFullName === "asc"
                            ? "Ascending"
                            : "Descending"
                        }
                        className="sort-icon"
                      />
                    </button>
                  </div>
                </th>
                <th>Contact number</th>
                <th>
                  <div className="th-sort-wrapper">
                    Email
                    <button
                      onClick={handleSortByEmail}
                      className="sort-button-email"
                      title="Sort by Email"
                    >
                      <img
                        src={
                          sortOrderEmail === "asc"
                            ? ascendingIcon
                            : descendingIcon
                        }
                        alt={
                          sortOrderEmail === "asc" ? "Ascending" : "Descending"
                        }
                        className="sort-icon"
                      />
                    </button>
                  </div>
                </th>
                <th>
                  <div className="th-sort-wrapper">
                    Date Added
                    <button
                      onClick={handleSortByDateAdded}
                      className="sort-button-date"
                      title="Sort by Date Added"
                    >
                      <img
                        src={
                          sortOrderDate === "asc"
                            ? ascendingIcon
                            : descendingIcon
                        }
                        alt={
                          sortOrderDate === "asc" ? "Ascending" : "Descending"
                        }
                        className="sort-icon"
                      />
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td>{user.fullName}</td>
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
