import React, { useState } from "react";
import "../../../styles/admin/user-management.css";
import DeleteModal from "../../../components/admin/user-management/deletemodal.tsx";
import AddUsersModal from "../../../components/admin/user-management/addusersmodal.tsx";
import searchIcon from "../../../assets/images/search-icon.svg";
import ascendingIcon from "../../../assets/images/ascending-icon.svg";
import descendingIcon from "../../../assets/images/descending-icon.svg";
import deleteIcon from "../../../assets/images/delete-icon.svg";
import editIcon from "../../../assets/images/user-edit-icon.svg";

interface User {
  fullName: string;
  email: string;
  contact: string;
  dateAdded: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [sortOrderFullName, setSortOrderFullName] = useState<"asc" | "desc">(
    "asc"
  );
  const [sortOrderEmail, setSortOrderEmail] = useState<"asc" | "desc">("asc");
  const [sortOrderDate, setSortOrderDate] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize: number = 10;

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

  const handleSortByFullName = (): void => {
    const newOrder = sortOrderFullName === "asc" ? "desc" : "asc";
    const sorted = [...users].sort((a, b) =>
      newOrder === "asc"
        ? a.fullName.localeCompare(b.fullName)
        : b.fullName.localeCompare(a.fullName)
    );
    setUsers(sorted);
    setSortOrderFullName(newOrder);
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
      const [yearA, monthA, dayA] = a.dateAdded.split("-").map(Number);
      const [yearB, monthB, dayB] = b.dateAdded.split("-").map(Number);
      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);
      return newOrder === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
    setUsers(sorted);
    setSortOrderDate(newOrder);
  };

  const formatDate = (date: string): string => {
    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                    <td>{user.fullName}</td>
                    <td>{user.contact}</td>
                    <td>{user.email}</td>
                    <td>{formatDate(user.dateAdded)}</td>{" "}
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
                  <td colSpan={6} style={{ textAlign: "center" }}>
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
