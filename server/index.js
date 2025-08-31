import express, { json } from "express";
import cors from "cors";
import { query } from "./db.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors());
app.use(json());
// Get all posts
app.get("/posts", async (req, res) => {
  try {
    const result = await query("SELECT * FROM posts ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});
// Get one post
app.get("/posts/:id", async (req, res) => {
  try {
    const result = await query("SELECT * FROM posts WHERE id=$1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Post not found" });
    res.json(result.rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});
// Create
app.post("/posts", async (req, res) => {
  try {
    const { title, content } = req.body;
    const result = await query(
      "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );
    res.json(result.rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});
// Update
app.put("/posts/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    const result = await query(
      "UPDATE posts SET title=$1, content=$2 WHERE id=$3 RETURNING *",
      [title, content, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: "Post not found" });
    res.json(result.rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});
// Delete
app.delete("/posts/:id", async (req, res) => {
  try {
    const result = await query("DELETE FROM posts WHERE id=$1 RETURNING *", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));