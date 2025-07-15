const express = require("express");
const User = require("../models/User");

const router = express.Router();

// POST /api/users/register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.status(409).json({ error: "User already exists" });
    }
    const user = await User.create({ username, email, password });
    res
      .status(201)
      .json({ _id: user._id, username: user.username, email: user.email });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/users/login
router.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  if ((!username && !email) || !password) {
    return res
      .status(400)
      .json({ error: "Username/email and password are required" });
  }
  try {
    const user = await User.findOne(username ? { username } : { email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // For testing, return user ID as token
    res.json({
      token: user._id.toString(),
      user: { _id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
