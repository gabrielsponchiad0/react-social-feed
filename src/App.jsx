import { useState, useEffect } from "react";
import "./App.css";
import PostCard from "./components/PostCard";
import PostForm from "./components/PostForm";
import Sidebar from "./components/Sidebar";
import Search from "./components/Search";

// Boa prática: Definir a chave do storage fora do componente
const STORAGE_KEY = "@fleedly:posts";

function App() {
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [task, setTask] = useState("");

  // Lógica de Inicialização: Tenta carregar do LocalStorage ou usa o padrão
  const [posts, setPosts] = useState(() => {
    const salvos = localStorage.getItem(STORAGE_KEY);
    if (salvos) {
      return JSON.parse(salvos);
    }
    return [];
  });

  // Efeito de Persistência: Sempre que 'posts' mudar, salva no navegador
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  function handleLike(id) {
    const newPosts = posts.map((post) => {
      if (post.id === id) {
        if (post.votoUsuario === "like") {
          // Remove like
          return {
            ...post,
            likes: post.likes - 1,
            votoUsuario: null,
          };
        }

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
        if (post.votoUsuario === "dislike") {
          // Remove dislike
          return {
            ...post,
            dislikes: post.dislikes - 1,
            votoUsuario: null,
          };
        }

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

  function handleEdit(id) {
    const newPosts = posts.map((post) => {
      if (post.id === id) {
        return { ...post, isEditing: !post.isEditing };
      }
      return post;
    });
    setPosts(newPosts);
  }

  function handleUpdate(id, newTitle) {
    const newPosts = posts.map((post) => {
      if (post.id === id) {
        return { ...post, title: newTitle, isEditing: false };
      }
      return post;
    });
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
      isEditing: false,
      createdAt: new Date().toISOString(),
    };

    setPosts([newPost, ...posts]);
    setTask("");
  }

  const postsFiltrados = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <Sidebar onSearchClick={() => setIsSearchOpen(!isSearchOpen)} />

      {isSearchOpen && (
        <div className="search-panel">
          <Search search={search} setSearch={setSearch} />
        </div>
      )}
      <div className="main-content">
        <PostForm
          task={task}
          setTask={setTask}
          addPost={addPost}
          count={posts.length}
        />

        {posts.length === 0 ? (
          <p>Nenhum post por aqui... Que tal criar o primeiro?</p>
        ) : (
          <PostCard
            posts={postsFiltrados}
            onLike={handleLike}
            onDislike={handleDislike}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
}

export default App;