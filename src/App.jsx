import { useState } from "react";
import "./App.css";
import PostCard from "./components/PostCard";
import PostForm from "./components/PostForm";

function App() {
  const [task, setTask] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Post 1",
      image: `https://picsum.photos/seed/${1}/400/300`,
      likes: 27,
      dislikes: 4,
    },
    {
      id: 2,
      title: "Post 2",
      image: `https://picsum.photos/seed/${2}/400/300`,
      likes: 11,
      dislikes: 87,
    },
    {
      id: 3,
      title: "Post 3",
      image: `https://picsum.photos/seed/${3}/400/300`,
      likes: 12,
      dislikes: 1,
    },
  ]);

  function handleLike(id) {
    const newPosts = posts.map((post) =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(newPosts);
  }

  function handleDislike(id) {
    const newPosts = posts.map((post) =>
      post.id === id ? { ...post, dislikes: post.dislikes + 1 } : post
    );
    setPosts(newPosts);
  }

  function handleDelete(id) {
    const newPosts = posts.filter((post) => post.id !== id);
    setPosts(newPosts);
  }

  function addPost(e) {
    e.preventDefault();
    if (!task.trim()) return;

    const newPost = {
      id: Date.now(),
      title: task,
      image: `https://picsum.photos/seed/${Date.now()}/400/300`,
      likes: 0,
      dislikes: 0,
    };

    setPosts([newPost, ...posts]);
    setTask("");
  }

  return (
    <div>
      <PostForm
        task={task}
        setTask={setTask}
        addPost={addPost}
        count={posts.length}
      />
      <PostCard
        posts={posts}
        onLike={handleLike}
        onDelete={handleDelete}
        onDislike={handleDislike}
      />
    </div>
  );
}

export default App;
