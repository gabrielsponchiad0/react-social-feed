import { useState } from "react";
import "./App.css";
import PostCard from "./components/PostCard";
import PostForm from "./components/PostForm";
import Sidebar from "./components/Sidebar";

function App() {
  const [task, setTask] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Post 1",
      image: `https://picsum.photos/seed/${1}/400/300`,
      likes: 27,
      dislikes: 4,
      votoUsuario: null,
    },
    {
      id: 2,
      title: "Post 2",
      image: `https://picsum.photos/seed/${2}/400/300`,
      likes: 11,
      dislikes: 87,
      votoUsuario: null,
    },
    {
      id: 3,
      title: "Post 3",
      image: `https://picsum.photos/seed/${3}/400/300`,
      likes: 12,
      dislikes: 1,
      votoUsuario: null,
    },
  ]);

function handleLike(id) {
    const newPosts = posts.map((post) => {
      if (post.id === id) {
        if (post.votoUsuario === "like") return post;

        const dislikeAdjustment = post.votoUsuario === "dislike" ? -1 : 0;

        return {
          ...post,
          likes: post.likes + 1,
          dislikes: post.dislikes + dislikeAdjustment,
          votoUsuario: "like",
        };
      }
      return post;
    });
    setPosts(newPosts);
  }

  function handleDislike(id) {
    const newPosts = posts.map((post) => {
      if (post.id === id) {
        if (post.votoUsuario === "dislike") return post;

        const likeAdjustment = post.votoUsuario === "like" ? -1 : 0;

        return {
          ...post,
          dislikes: post.dislikes + 1,
          likes: post.likes + likeAdjustment,
          votoUsuario: "dislike",
        };
      }
      return post;
    });
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
      votoUsuario: null,
    };

    setPosts([newPost, ...posts]);
    setTask("");
  }

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <PostForm
          task={task}
          setTask={setTask}
          addPost={addPost}
          count={posts.length}
        />
        <PostCard
          posts={posts}
          onLike={handleLike}
          onDislike={handleDislike}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
