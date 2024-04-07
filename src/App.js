import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterForm from "./pages/RegisterForm";
import NewUserlist from "./pages/NewUserlist";
import EditUserPage from "./pages/EditUserPage";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/newUser" element={<NewUserlist />} />
        <Route path="/edit/:id" element={<EditUserPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
