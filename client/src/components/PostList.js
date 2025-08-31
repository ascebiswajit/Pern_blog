import { useEffect, useState } from "react";
import { getPosts, deletePost } from "../api";

export default function PostList({ onSelect, onEdit, onDelete }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, [onDelete]); // refresh when deletion happens

  return (
    <div style={{ borderRight: "1px solid #ccc", paddingRight: "1rem" }}>
      <h2>📜 Blog Posts</h2>
      {posts.map(p => (
        <div key={p.id} style={{ marginBottom: "1rem", padding: "0.5rem", borderBottom: "1px solid #eee" }}>
          <h3 
            style={{ cursor: "pointer", color: "#333" }} 
            onClick={() => onSelect(p.id)}
          >
            {p.title}
          </h3>
          <p>{p.content.slice(0, 100)}...</p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={() => onEdit(p)}>✏️ Edit</button>
            <button 
              style={{ color: "red" }}
              onClick={async () => {
                await deletePost(p.id);
                onDelete();
              }}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
