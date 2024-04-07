import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>Navbar</h2>
      </div>

      <div >
        <ul className="navMenu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">About</Link>
          </li>
          <li>
            <Link to="/register">Login</Link>
          </li>
          <li>
            <Link to="/register">Registration</Link>
          </li>
          <li>
            <Link to="/register">Userlist</Link>
          </li>
          <li>
            <Link to="/newUser">Newuserlist</Link>
          </li>
          <li>
            <Link to="/register">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
