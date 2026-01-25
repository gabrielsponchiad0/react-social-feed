import { useState, useEffect, FormEvent } from "react";
import "./App.css";
import PostCard from "./components/PostCard";
import PostForm from "./components/PostForm";
import Sidebar from "./components/Sidebar";
import Search from "./components/Search";
import { Post } from "./types/Post";

const STORAGE_KEY = "@fleedly:posts";

function App() {
  const [search, setSearch] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");

  const [posts, setPosts] = useState<Post[]>(() => {
    const salvos = localStorage.getItem(STORAGE_KEY);
    if (salvos) {
      try {
        return JSON.parse(salvos);
      } catch (e) {
        console.error("Erro ao carregar posts do localStorage", e);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const handleLike = (id: number) => {
    const newPosts = posts.map((post) => {
      if (post.id === id) {
        if (post.votoUsuario === "like") {
          return {
            ...post,
            likes: post.likes - 1,
            votoUsuario: null,
          } as Post;
        }

        const dislikeAdjustment = post.votoUsuario === "dislike" ? -1 : 0;

        return {
          ...post,
          likes: post.likes + 1,
          dislikes: post.dislikes + dislikeAdjustment,
          votoUsuario: "like",
        } as Post;
      }
      return post;
    });
    setPosts(newPosts);
  }

  const handleDislike = (id: number) => {
    const newPosts = posts.map((post) => {
      if (post.id === id) {
        if (post.votoUsuario === "dislike") {
          return {
            ...post,
            dislikes: post.dislikes - 1,
            votoUsuario: null,
          } as Post;
        }

        const likeAdjustment = post.votoUsuario === "like" ? -1 : 0;

        return {
          ...post,
          dislikes: post.dislikes + 1,
          likes: post.likes + likeAdjustment,
          votoUsuario: "dislike",
        } as Post;
      }
      return post;
    });
    setPosts(newPosts);
  }

  const handleDelete = (id: number) => {
    const newPosts = posts.filter((post) => post.id !== id);
    setPosts(newPosts);
  }

  const handleEdit = (id: number) => {
    const newPosts = posts.map((post) => {
      if (post.id === id) {
        return { ...post, isEditing: !post.isEditing };
      }
      return post;
    });
    setPosts(newPosts);
  }

  const handleUpdate = (id: number, newTitle: string) => {
    const newPosts = posts.map((post) => {
      if (post.id === id) {
        return { ...post, title: newTitle, isEditing: false };
      }
      return post;
    });
    setPosts(newPosts);
  }

  const addPost = (e: FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;

    const newPost: Post = {
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
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col md:flex-row overflow-x-hidden relative">
      <Sidebar 
        onSearchClick={() => setIsSearchOpen(!isSearchOpen)} 
        isCollapsed={isSearchOpen} 
      />

      {/* Menu de Pesquisa */}
      <div 
        className={`
          fixed top-0 bottom-0 bg-black border-r border-neutral-800 z-40 transition-all duration-300 ease-in-out
          hidden md:block shadow-[10px_0_30px_rgba(0,0,0,0.5)]
          ${isSearchOpen ? 'left-16 w-80 opacity-100' : '-left-80 w-80 opacity-0'}
        `}
      >
        <div className="p-6 h-full flex flex-col">
          <h2 className="text-2xl font-bold mb-8">Pesquisa</h2>
          <Search search={search} setSearch={setSearch} />
          
          <div className="mt-8 flex-1 overflow-y-auto custom-scrollbar">
             <div className="flex justify-between items-center px-1 mb-4">
               <p className="text-sm text-neutral-200 font-bold">Recentes</p>
               <button className="text-xs text-blue-500 font-bold hover:text-white transition-colors">Limpar tudo</button>
             </div>
             <div className="flex flex-col items-center justify-center h-48 px-8 text-center">
                <p className="text-sm text-neutral-500 font-medium">Nenhuma pesquisa recente.</p>
             </div>
          </div>
        </div>
      </div>

      {/* Pesquisa para Mobile */}
      {isSearchOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-14 bg-black z-40 md:hidden p-5 flex flex-col animate-in fade-in duration-300">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold flex-1">Pesquisa</h2>
          </div>
          <Search search={search} setSearch={setSearch} />
          
          <div className="mt-8 text-center pt-20">
             <p className="text-neutral-600 text-sm">Digite algo para buscar...</p>
          </div>
        </div>
      )}

      <main 
        className={`
          flex-1 transition-all duration-300 flex flex-col bg-neutral-950/20 pb-24 md:pb-0 min-w-0
          ${isSearchOpen ? 'md:ml-20' : 'md:ml-64'}
        `}
      >
        <div className="mx-auto w-full max-w-xl py-4 md:py-12 px-3 md:px-6 box-border">
          <PostForm
            task={task}
            setTask={setTask}
            addPost={addPost}
            count={posts.length}
          />

          <div className="mt-8 md:mt-12 space-y-8">
            {posts.length === 0 ? (
              <div className="text-center py-20 bg-neutral-900/20 rounded-3xl border border-dashed border-neutral-800">
                <p className="text-neutral-500 font-medium">Sua timeline está vazia...</p>
              </div>
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
      </main>
    </div>
  );
}

export default App;
