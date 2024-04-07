import React, { useState, useEffect } from "react";
import axios from "axios";
import "./newUserlist.css";
import { Link } from "react-router-dom";

const NewUserlist = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch users from JSON server when component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    // nevigate to edit
    console.log("Editing user:", userId);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      console.log("User deleted successfully:", userId);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.username?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  return (
    <div className="user-list-container">
      <h2>Users List</h2>
      <div className="search">
        SEARCH BY NAME
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {searchQuery === ""
            ? users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.mobileNumber}</td>
                  <td>
                    <Link to={`/edit/${user.id}`} className="edit-button">
                      Edit
                    </Link>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.mobileNumber}</td>
                  <td>
                    {/* <a href={`/edit/${user.id}`} className="edit-button">Edit</a> */}
                    <Link to={`/edit/${user.id}`} className="edit-button">
                      Edit
                    </Link>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewUserlist;
