import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import "./registerForm.css";
import NewUserlist from './NewUserlist';

const EditUserPage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    mobileNumber: "",
    address: "",
    gender: "",
    hobbies: [],
    degree: "",
    state: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (checked) {
        setUserData((prevState) => ({
          ...prevState,
          hobbies: [...userData.hobbies, value],
        }));
      } else {
        setUserData((prevState) => ({
          ...prevState,
          hobbies: userData.hobbies.filter((item) => item !== value),
        }));
      }
    } else {
        setUserData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const success = () => toast.success("Edit Successfully");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/users/${id}`, userData);
      console.log('User data updated successfully!');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
    navigate('/newUser');
  };

  return (
    <div className="registration-form">
      <h2>User Edit</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </label>
        <label>
          Mobile Number:
          <input
            type="text"
            name="mobileNumber"
            value={userData.mobileNumber}
            onChange={handleChange}
          />
        </label>
        <label>
          Address:
          <textarea
            name="address"
            value={userData.address}
            onChange={handleChange}
          />
        </label>
        <label>
          Gender:
          <label className="radio">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={userData.gender === "male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label className="radio">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={userData.gender === "female"}
              onChange={handleChange}
            />
            Female
          </label>
          <label className="radio">
            <input
              type="radio"
              name="gender"
              value="transgender"
              checked={userData.gender === "transgender"}
              onChange={handleChange}
            />
            Transgender
          </label>
        </label>
        <label>
          Hobbies:
          <label className="radio">
            <input
              type="checkbox"
              name="hobbies"
              value="singing"
              checked={userData.hobbies.includes("singing")}
              onChange={handleChange}
            />
            Singing
          </label>
          <label className="radio">
            <input
              type="checkbox"
              name="hobbies"
              value="dancing"
              checked={userData.hobbies.includes("dancing")}
              onChange={handleChange}
            />
            Dancing
          </label>
          <label className="radio">
            <input
              type="checkbox"
              name="hobbies"
              value="cricket"
              checked={userData.hobbies.includes("cricket")}
              onChange={handleChange}
            />
            Cricket
          </label>
        </label>
        <label>
          Select Degree:
          <select  name="degree" value={userData.degree} onChange={handleChange}>
            <option value="">Select</option>
            <option value="bachelors">Bachelor's</option>
            <option value="masters">Master's</option>
            <option value="doctorate">Doctorate</option>
          </select>
        </label>
        <label>
          Select State:
          <select name="state" value={userData.state} onChange={handleChange}>
            <option value="">Select</option>
            <option value="chhattisgarh">Chhattisgarh</option>
            <option value="mp">Madhya Pradesh</option>
          </select>
        </label>
        <button type="submit" onClick={success}>Edit</button>
        {/* <Link to='/newUser' onClick={success} type='submit' className='EditButton'>Edit</Link> */}
        <Toaster />
      </form>
    </div>
  );
};

export default EditUserPage;
