import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';

import "./registerForm.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (checked) {
        setFormData((prevState) => ({
          ...prevState,
          hobbies: [...formData.hobbies, value],
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          hobbies: formData.hobbies.filter((item) => item !== value),
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const success = () => toast.success("Registration Successfull");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // Do something for sending form data
    try {
        await axios.post('https://users-b6io.onrender.com/users', formData);
        console.log('Form data submitted successfully!');
      } catch (error) {
        console.error('Error submitting form data:', error);
      }
  };

  return (
    <div className="registration-form">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <label>
          Mobile Number:
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
        </label>
        <label>
          Address:
          <textarea
            name="address"
            value={formData.address}
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
              checked={formData.gender === "male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label className="radio">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
            />
            Female
          </label>
          <label className="radio">
            <input
              type="radio"
              name="gender"
              value="transgender"
              checked={formData.gender === "transgender"}
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
              checked={formData.hobbies.includes("singing")}
              onChange={handleChange}
            />
            Singing
          </label>
          <label className="radio">
            <input
              type="checkbox"
              name="hobbies"
              value="dancing"
              checked={formData.hobbies.includes("dancing")}
              onChange={handleChange}
            />
            Dancing
          </label>
          <label className="radio">
            <input
              type="checkbox"
              name="hobbies"
              value="cricket"
              checked={formData.hobbies.includes("cricket")}
              onChange={handleChange}
            />
            Cricket
          </label>
        </label>
        <label>
          Select Degree:
          <select  name="degree" value={formData.degree} onChange={handleChange}>
            <option value="">Select</option>
            <option value="bachelors">Bachelor's</option>
            <option value="masters">Master's</option>
            <option value="doctorate">Doctorate</option>
          </select>
        </label>
        <label>
          Select State:
          <select name="state" value={formData.state} onChange={handleChange}>
            <option value="">Select</option>
            <option value="chhattisgarh">Chhattisgarh</option>
            <option value="mp">Madhya Pradesh</option>
          </select>
        </label>
        <button type="submit" onClick={success}>Register</button>
        <Toaster />
      </form>
    </div>
  );
};

export default RegisterForm;
