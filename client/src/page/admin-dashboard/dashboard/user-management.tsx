import React, { useState, useEffect } from "react";
import "../../../styles/admin/user-management.css";
import DeleteModal from "../../../components/admin/user-management/deletemodal.tsx";
import AddUsersModal from "../../../components/admin/user-management/addusersmodal.tsx";
import searchIcon from "../../../assets/images/search-icon.svg";
import ascendingIcon from "../../../assets/images/ascending-icon.svg";
import descendingIcon from "../../../assets/images/descending-icon.svg";
import deleteIcon from "../../../assets/images/delete-icon.svg";
import editIcon from "../../../assets/images/user-edit-icon.svg";
import axios from "axios";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  contact: string;
  created_at: string;
}
const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const getUserProfile = async () => {
    const resUser = await axios.get('/users/req-data');
    setUsers(resUser.data.users);
  }
  useEffect(() => {
    getUserProfile();
  }, [])
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
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [sortOrderFirstName, setSortOrderFirstName] = useState<"asc" | "desc">("asc");
  const [sortOrderLastName, setSortOrderLastName] = useState<"asc" | "desc">("asc");
  const [sortOrderEmail, setSortOrderEmail] = useState<"asc" | "desc">("asc");
  const [sortOrderDate, setSortOrderDate] = useState<"asc" | "desc">("asc");

  const [sortOrderTime, setSortOrderTime] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    const updatePageSize = () => {
      if (window.innerWidth <= 1366) {
        setPageSize(7);
      } else {
        setPageSize(10);
      }
    };

    updatePageSize();

    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  const handleSelectAll = (): void => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (index: number): void => {
    if (selectedUsers.includes(index)) {
      setSelectedUsers(selectedUsers.filter((i) => i !== index));
    } else {
      setSelectedUsers([...selectedUsers, index]);
    }
  };

  const handleSortByFirstName = (): void => {
    const newOrder = sortOrderFirstName === "asc" ? "desc" : "asc";
    const sorted = [...users].sort((a, b) =>
      newOrder === "asc"
        ? a.firstName.localeCompare(b.first_name)
        : b.firstName.localeCompare(a.first_name)
    );
    setUsers(sorted);
    setSortOrderFirstName(newOrder);
  };

  const handleSortByLastName = (): void => {
    const newOrder = sortOrderLastName === "asc" ? "desc" : "asc";
    const sorted = [...users].sort((a, b) =>
      newOrder === "asc"
        ? a.lastName.localeCompare(b.last_name)
        : b.lastName.localeCompare(a.last_name)
    );
    setUsers(sorted);
    setSortOrderLastName(newOrder);
  };

  const handleSortByEmail = (): void => {
    const newOrder = sortOrderEmail === "asc" ? "desc" : "asc";
    const sorted = [...users].sort((a, b) =>
      newOrder === "asc"
        ? a.email.localeCompare(b.email)
        : b.email.localeCompare(a.email)
    );
    setUsers(sorted);
    setSortOrderEmail(newOrder);
  };

  const handleSortByDateAdded = (): void => {
    const newOrder = sortOrderDate === "asc" ? "desc" : "asc";
    const sorted = [...users].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return newOrder === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
    setUsers(sorted);
    setSortOrderDate(newOrder);
  };

  // Sort by time
  const handleSortByTimeAdded = (): void => {
    const newOrder = sortOrderTime === "asc" ? "desc" : "asc";
    const sorted = [...users].sort((a, b) => {
      const timeA = new Date(a.created_at).getTime();
      const timeB = new Date(b.created_at).getTime();
      return newOrder === "asc" ? timeA - timeB : timeB - timeA;
    });
    setUsers(sorted);
    setSortOrderTime(newOrder);
  };

  const formatDate = (date: string): string => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleDeleteSelected = (): void => {
    const updatedUsers = users.filter(
      (_, index) => !selectedUsers.includes(index)
    );
    setUsers(updatedUsers);
    setSelectedUsers([]);
    setSelectAll(false);
    setShowConfirmModal(false);
  };

  const handlePrevPage = (): void => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = (): void => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="header-user-btn">
          <div>
            <button
              className="btn-add-user"
              onClick={() => setShowAddUserModal(true)}
            >
              Add User
            </button>
            <button className="btn-filters-user">Filters</button>
          </div>
        </div>
      </div>

      <div className="user-management-section">
        <div className="user-header">
          <h3>Users</h3>
        </div>
        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    disabled={users.length === 0}
                  />
                </th>
                <th>
                  <div className="th-sort-wrapper">
                    First Name
                    <button
                      onClick={handleSortByFirstName}
                      className="sort-button-name"
                      title="Sort by First Name"
                    >
                      <img
                        src={
                          sortOrderFirstName === "asc"
                            ? ascendingIcon
                            : descendingIcon
                        }
                        alt="Sort"
                        className="sort-icon"
                      />
                    </button>
                  </div>
                </th>
                <th>
                  <div className="th-sort-wrapper">
                    Last Name
                    <button
                      onClick={handleSortByLastName}
                      className="sort-button-name"
                      title="Sort by Last Name"
                    >
                      <img
                        src={
                          sortOrderLastName === "asc"
                            ? ascendingIcon
                            : descendingIcon
                        }
                        alt="Sort"
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
                        alt="Sort"
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
                        alt="Sort"
                        className="sort-icon"
                      />
                    </button>
                  </div>
                </th>

                {/* Time Added */}
                <th>
                  <div className="th-sort-wrapper">
                    Time
                    <button
                      onClick={handleSortByTimeAdded}
                      className="sort-button-date"
                      title="Sort by Time Added"
                    >
                      <img
                        src={
                          sortOrderTime === "asc"
                            ? ascendingIcon
                            : descendingIcon
                        }
                        alt="Sort"
                        className="sort-icon"
                      />
                    </button>
                  </div>
                </th>

                <th>
                  <div className="delete-section">
                    <button
                      className="delete-btn"
                      onClick={() => setShowConfirmModal(true)}
                      disabled={selectedUsers.length === 0}
                      title="Delete selected users"
                    >
                      <img
                        src={deleteIcon}
                        alt="Delete icon"
                        className="delete-icon"
                      />
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.contact}</td>
                    <td>{user.email}</td>
                    <td>{formatDate(user.created_at)}</td>

                    {/* Time cell */}
                    <td>
                      {user.created_at.includes("T") ? (
                        new Date(user.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      ) : (
                        "-"
                      )}
                    </td>

                    <td>
                      <button className="edit-button">
                        <img
                          src={editIcon}
                          alt="Edit Icon"
                          className="edit-icon"
                        />
                        <span>Edit</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="no-users-row">
                  <td colSpan={8} style={{ textAlign: "center" }}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="user-pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {totalPages === 0 ? 1 : currentPage} of{" "}
            {totalPages === 0 ? 1 : totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={
              currentPage >= totalPages || filteredUsers.length <= pageSize
            }
          >
            Next
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      {showConfirmModal && (
        <DeleteModal
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={handleDeleteSelected}
          selectedCount={selectedUsers.length}
        />
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <AddUsersModal
          isOpen={showAddUserModal}
          onClose={() => setShowAddUserModal(false)}
          onAddUser={(newUser: User) => {
            setUsers((prev) => [...prev, newUser]);
            setShowAddUserModal(false);
          }}
        />
      )}
    </div>
  );
};

export default UserManagement;
