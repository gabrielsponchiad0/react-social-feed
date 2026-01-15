import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [posts, setPosts] = useState([
    { id: 1, title: "Post 1", image: `https://picsum.photos/seed/${1}/400/300`, likes: 27, dislikes: 4 },
    { id: 2, title: "Post 2", image: `https://picsum.photos/seed/${2}/400/300`, likes: 11, dislikes: 87 },
    { id: 3, title: "Post 3", image: `https://picsum.photos/seed/${3}/400/300`, likes: 12, dislikes: 1 },
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
    <div className="main-layout">
      <header className="top-bar">
        <h1>Feed</h1>
        <p>{posts.length} publicações</p>
      </header>

      <form className="post-form" onSubmit={addPost}>
        <input
          type="text"
          placeholder="Qual a boa?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Publicar</button>
      </form>

      <div className="posts-list">
        {posts.map((post) => (
          <div className="card" key={post.id}>
            <button className="delete-x" onClick={() => handleDelete(post.id)}>×</button>
            {post.image && <img src={post.image} alt="Post content" className="post-image" />}
            <h2>{post.title}</h2>

            <div className="actions">
              <button className="like-btn" onClick={() => handleLike(post.id)}>👍<span>{post.likes}</span></button>
              <button className="dislike-btn" onClick={() => handleDislike(post.id)}>👎<span>{post.dislikes}</span></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
