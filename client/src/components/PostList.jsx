import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    console.log("Requesting:", "/api/posts");
    axios
      .get("/api/posts")
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load posts");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>{error}</div>;
  if (!posts.length) return <div>No posts found</div>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>{post.title}</li>
      ))}
    </ul>
  );
}
