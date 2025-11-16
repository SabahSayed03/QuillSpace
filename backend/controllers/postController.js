import db from "../db.js";
import { exportToCSV } from "../utils/exportCSV.js";

export const getPosts = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM posts ORDER BY created_at DESC");
    res.json(results);
  } catch (err) {
    console.error("getPosts error:", err);
    res.status(500).json({ error: "Database error" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM posts WHERE id = ?", [req.params.id]);
    if (results.length === 0) return res.status(404).json({ error: "Post not found" });
    res.json(results[0]);
  } catch (err) {
    console.error("getPostById error for id=", req.params.id, err);
    res.status(500).json({ error: "Database error" });
  }
};

export const createPost = async (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author)
    return res.status(400).json({ error: "All fields are required" });

  try {
    await db.query("INSERT INTO posts (title, content, author) VALUES (?, ?, ?)", [title, content, author]);
    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    console.error("createPost error with payload:", { title, author }, err);
    res.status(500).json({ error: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
  const { title, content, author } = req.body;
  try {
    await db.query("UPDATE posts SET title=?, content=?, author=? WHERE id=?", [title, content, author, req.params.id]);
    res.json({ message: "Post updated successfully" });
  } catch (err) {
    console.error("updatePost error for id=", req.params.id, err);
    res.status(500).json({ error: "Failed to update post" });
  }
};

export const deletePost = async (req, res) => {
  try {
    await db.query("DELETE FROM posts WHERE id=?", [req.params.id]);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("deletePost error for id=", req.params.id, err);
    res.status(500).json({ error: "Failed to delete post" });
  }
};

export const exportPostsCSV = async (req, res) => {
  try {
    const [results] = await db.query("SELECT title, author, created_at FROM posts");
    exportToCSV(results, res);
  } catch (err) {
    console.error("exportPostsCSV error:", err);
    res.status(500).json({ error: "Failed to export CSV" });
  }
};
