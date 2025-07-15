const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");

const router = express.Router();

// Dummy auth middleware for testing
function auth(req, res, next) {
  // Accept any request with Authorization header
  if (req.headers.authorization) {
    // In a real app, decode token and set req.user
    req.user = { _id: req.headers.authorization.split(" ")[1] };
    return next();
  }
  return res.status(401).json({ error: "Unauthorized" });
}

// Create post
router.post("/", auth, async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const post = await Post.create({
      title,
      content,
      author: req.user._id,
      category,
      slug: title.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all posts (with optional category filter and pagination)
router.get("/", async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;
  const filter = category ? { category } : {};
  try {
    const posts = await Post.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).end();
    res.json(post);
  } catch (err) {
    res.status(404).end();
  }
});

// Update post
router.put("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).end();
    if (post.author.toString() !== req.user._id) return res.status(403).end();
    Object.assign(post, req.body);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete post
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).end();
    if (post.author.toString() !== req.user._id) return res.status(403).end();
    await post.deleteOne();
    res.status(200).end();
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
