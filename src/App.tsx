
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/singupcard";
import Login from "./components/logincard";
import Dashboard from "./components/dashboard";
import ProfileEdit from "./components/profileEditpage";

import React, { useState, useEffect } from "react";
import axios from "axios";


const App: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
        try {
            const statusResponse = await axios.get("https://rumi-backend-wvba.onrender.com/api/users/status");
            const userId = statusResponse.data.userId;
            setUserId(userId);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    fetchUserProfile();
}, []);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path={`/profile:${userId}`} element={<ProfileEdit/>} />
        <Route path="/" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
};

export default App;
