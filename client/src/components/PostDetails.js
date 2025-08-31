import { useEffect, useState } from "react";
import { getPost } from "../api";

export default function PostDetail({ postId }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (postId) getPost(postId).then(setPost);
  }, [postId]);

  if (!post) return <p>Select a post to read</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <small>{new Date(post.created_at).toLocaleString()}</small>
    </div>
  );
}
