import { useState, useEffect } from "react";
import { X, Clock } from "lucide-react";
import "./App.css";
import PostCard from "./components/PostCard";
import PostForm from "./components/PostForm";
import Sidebar from "./components/Sidebar";
import Search from "./components/Search";
import Footer from "./components/Footer";
import { Post, Theme } from "./types/types";

// chaves do localStorage 
const STORAGE_KEY_POSTS = "@feedly:posts";
const STORAGE_KEY_SEARCHES = "@feedly:recent_searches";

function App() {
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  // pesquisas recentes (carrega uma vez na inicialização)
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SEARCHES);
    return saved ? JSON.parse(saved) : [];
  });

  // posts do feed
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_POSTS);
    if (!saved) return [];

    try {
      return JSON.parse(saved);
    } catch {
      console.error("Erro ao carregar posts do localStorage");
      return [];
    }
  });

 
  // localstorage para sincronizar (por enquanto)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SEARCHES, JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Ações abaixo
  // like toggle (like / remover like)
  const toggleLikePost = (postId: number) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id !== postId) return post;

        const isLiked = post.votoUsuario === "like";

        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
          votoUsuario: isLiked ? null : "like",
        };
      })
    );
  };

  const deletePost = (postId: number) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };

  // alterna modo edição de um post específico
  const toggleEditMode = (postId: number) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, isEditing: !post.isEditing }
          : post
      )
    );
  };

  // salva edição e sai do modo edição
  const saveUpdatedPost = (postId: number, newTitle: string) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, title: newTitle, isEditing: false }
          : post
      )
    );
  };

  // criação de novo post
  const createNewPost = (title: string, image?: string) => {
    const newPost: Post = {
      id: Date.now(),
      title,
      image,
      likes: 0,
      votoUsuario: null,
      isEditing: false,
      createdAt: new Date().toISOString(),
    };

    setPosts(prev => [newPost, ...prev]);
  };


  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  // adiciona busca recente (sem duplicar e com limite)
  const addRecentSearch = (query: string) => {
    const cleaned = query.trim();
    if (!cleaned) return;

    setRecentSearches(prev => {
      const withoutDuplicate = prev.filter(q => q !== cleaned);
      return [cleaned, ...withoutDuplicate].slice(0, 10);
    });
  };

  const removeRecentSearch = (query: string) => {
    setRecentSearches(prev => prev.filter(q => q !== query));
  };

  const clearAllRecentSearches = () => {
    setRecentSearches([]);
  };

  // filtro do feed baseado na busca atual
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      data-theme={theme}
      className="
        min-h-screen bg-[var(--bg-primary)]
        text-[var(--text-primary)] flex flex-col
        md:flex-row transition-colors duration-300
      "
    >
      {/* Sidebar principal */}
      <Sidebar
        onSearchClick={() => setIsSearchOpen(!isSearchOpen)}
        isCollapsed={false}
      />

      {/* Painel de busca - Desktop */}
      <div
        className={`
          fixed top-0 bottom-0 z-40 hidden md:block
          bg-[var(--bg-primary)] border-r border-[var(--border-color)]
          transition-all duration-300 ease-in-out
          shadow-[-10px_0_30px_rgba(0,0,0,0.5)]
          ${isSearchOpen ? "left-64 w-80 opacity-100" : "-left-80 w-80 opacity-0"}
        `}
      >
        <div className="p-6 h-full flex flex-col">
          <h2 className="text-2xl font-bold mb-8">Pesquisa</h2>

          <Search
            search={search}
            setSearch={setSearch}
            onSearch={addRecentSearch}
          />

          {/* pesquisas recentes */}
          <div className="mt-8 flex-1 overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-bold">Recentes</p>
              {recentSearches.length > 0 && (
                <button
                  onClick={clearAllRecentSearches}
                  className="text-xs font-bold text-blue-500 hover:text-[var(--text-primary)]"
                >
                  Limpar tudo
                </button>
              )}
            </div>

            {recentSearches.length === 0 ? (
              <p className="text-center text-sm text-[var(--text-secondary)]">
                Nenhuma pesquisa recente.
              </p>
            ) : (
              recentSearches.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSearch(item)}
                  className="group flex justify-between items-center px-2 py-3 rounded-lg hover:bg-[var(--bg-secondary)] cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Clock size={16} />
                    <span className="truncate max-w-[180px]">{item}</span>
                  </div>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      removeRecentSearch(item);
                    }}
                    className="opacity-0 group-hover:opacity-100"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Painel de busca - Mobile */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-[var(--bg-primary)] p-5 flex flex-col md:hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Pesquisa</h2>
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="p-2 rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-transform active:scale-90"
            >
              <X size={20} />
            </button>
          </div>
          
          <Search 
            search={search} 
            setSearch={setSearch} 
            onSearch={(query) => {
              addRecentSearch(query);
              setIsSearchOpen(false);
            }} 
          />
          
          <div className="mt-8 flex-1 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-bold opacity-50 uppercase tracking-wider">Recentes</p>
              {recentSearches.length > 0 && (
                <button 
                  onClick={clearAllRecentSearches}
                  className="text-xs font-bold text-blue-500"
                >
                  Limpar tudo
                </button>
              )}
            </div>

            {recentSearches.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 opacity-30">
                <Clock size={40} className="mb-3" />
                <p className="text-sm">Nenhuma pesquisa recente</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {recentSearches.map((item, index) => (
                  <div 
                    key={index}
                    onClick={() => {
                      setSearch(item);
                      setIsSearchOpen(false);
                    }}
                    className="flex justify-between items-center py-4 px-2 border-b border-[var(--border-color)]/30 active:bg-[var(--bg-secondary)] rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Clock size={18} className="opacity-40" />
                      <span className="text-base font-medium">{item}</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRecentSearch(item);
                      }}
                      className="p-2 opacity-40 hover:opacity-100"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Conteúdo principal */}
      <main
        className={`
          flex-1 flex flex-col pb-24 md:pb-0
          transition-all duration-300
          ${isSearchOpen ? "md:ml-64 md:px-10" : "md:ml-64"}
        `}
      >
        {/* botão de alternar tema */}
        <button
          onClick={toggleTheme}
          className="fixed top-4 right-4 z-50 p-2 rounded-full bg-[var(--bg-secondary)]"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <div className="mx-auto w-full max-w-xl py-12 px-4">
          <PostForm onAddPost={createNewPost} count={posts.length} />

          <div className="mt-12 space-y-8">
            {posts.length === 0 ? (
              <p className="text-center text-neutral-500">
                Sua timeline está vazia...
              </p>
            ) : (
              <PostCard
                posts={filteredPosts}
                onLike={toggleLikePost}
                onDelete={deletePost}
                onEdit={toggleEditMode}
                onUpdate={saveUpdatedPost}
              />
            )}
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default App;
