import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import PostList from "./components/PostList";
import UserProfile from "./components/UserProfile";
import "./App.css";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/register">Register</Link> |{" "}
        <Link to="/profile/1">Profile</Link>
      </nav>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile/:userId" element={<UserProfile userId="1" />} />
      </Routes>
    </Router>
  );
}

export default App;
