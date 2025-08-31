import { useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetails";

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <div style={{ display: "flex", padding: "1rem", gap: "2rem" }}>
      <div style={{ flex: 1 }}>
        <h1>📝 Minimal Blog</h1>
        <PostForm 
          editingPost={editingPost} 
          onPost={() => setRefresh(!refresh)} 
          clearEdit={() => setEditingPost(null)} 
        />
        <PostList
          onSelect={setSelectedId} 
          onEdit={setEditingPost} 
          onDelete={() => setRefresh(!refresh)} 
          key={refresh} 
        />
      </div>
      <div style={{ flex: 1 }}>
        <PostDetail postId={selectedId} />
      </div>
    </div>
  );
}

export default App;
