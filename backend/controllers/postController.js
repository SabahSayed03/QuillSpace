//postController.js
import db from "../db.js";
import { exportToCSV } from "../utils/exportCSV.js";

export const getPosts = (req, res) => {
  const query = "SELECT * FROM posts ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("getPosts error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

export const getPostById = (req, res) => {
  const query = "SELECT * FROM posts WHERE id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error("getPostById error for id=", req.params.id, err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) return res.status(404).json({ error: "Post not found" });
    res.json(results[0]);
  });
};

export const createPost = (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author)
    return res.status(400).json({ error: "All fields are required" });

  const query = "INSERT INTO posts (title, content, author) VALUES (?, ?, ?)";
  db.query(query, [title, content, author], (err, result) => {
    if (err) {
      console.error("createPost error with payload:", { title, author }, err);
      return res.status(500).json({ error: "Failed to create post" });
    }
    res.status(201).json({ message: "Post created successfully" });
  });
};

export const updatePost = (req, res) => {
  const { title, content, author } = req.body;
  const query = "UPDATE posts SET title=?, content=?, author=? WHERE id=?";
  db.query(query, [title, content, author, req.params.id], (err, result) => {
    if (err) {
      console.error("updatePost error for id=", req.params.id, err);
      return res.status(500).json({ error: "Failed to update post" });
    }
    res.json({ message: "Post updated successfully" });
  });
};

export const deletePost = (req, res) => {
  const query = "DELETE FROM posts WHERE id=?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error("deletePost error for id=", req.params.id, err);
      return res.status(500).json({ error: "Failed to delete post" });
    }
    res.json({ message: "Post deleted successfully" });
  });
};

export const exportPostsCSV = (req, res) => {
  const query = "SELECT title, author, created_at FROM posts";
  db.query(query, (err, results) => {
    if (err) {
      console.error("exportPostsCSV error:", err);
      return res.status(500).json({ error: "Failed to export CSV" });
    }
    exportToCSV(results, res);
  });
};
