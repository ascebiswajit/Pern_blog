import { useState, useEffect } from "react";
import { createPost, updatePost } from "../api";

export default function PostForm({ onPost, editingPost, clearEdit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setContent(editingPost.content);
    }
  }, [editingPost]);

  async function handleSubmit(e) {
    e.preventDefault();
    let newPost;
    if (editingPost) {
      newPost = await updatePost(editingPost.id, { title, content });
    } else {
      newPost = await createPost({ title, content });
    }
    onPost(newPost);
    setTitle("");
    setContent("");
    clearEdit();
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}
    >
      <input 
        placeholder="Title" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        style={{ padding: "0.5rem" }}
      />
      <textarea 
        placeholder="Content" 
        value={content} 
        onChange={e => setContent(e.target.value)} 
        style={{ padding: "0.5rem", minHeight: "100px" }}
      />
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button type="submit">{editingPost ? "💾 Update" : "➕ Publish"}</button>
        {editingPost && <button type="button" onClick={clearEdit}>❌ Cancel</button>}
      </div>
    </form>
  );
}
