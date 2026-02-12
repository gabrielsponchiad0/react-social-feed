// Componentes
import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import SearchPanel from "./components/navigation/SearchPanel";

// Páginas
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Hooks
import { usePosts } from "./hooks/usePosts";
import { useSearch } from "./hooks/useSearch";

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  // Fecha o painel de busca sempre que a rota mudar
  useEffect(() => {
    setIsSearchOpen(false);
  }, [location]);

  const {
    posts,
    isPosting,
    toggleLikePost,
    deletePost,
    toggleEditMode,
    saveUpdatedPost,
    createNewPost,
    addComment,
  } = usePosts();

  const { search,
    setSearch,
    isSearching,
    debouncedSearch,
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearAllRecentSearches,
  } = useSearch();


  // filtro do feed baseado na busca atual (debounced)
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div
      className="
        min-h-screen bg-[var(--bg-primary)]
        text-[var(--text-primary)] flex flex-col
        md:flex-row transition-colors duration-300
      "
    >
      <Sidebar
        onSearchClick={() => setIsSearchOpen(!isSearchOpen)}
        isCollapsed={false}
        isSearchOpen={isSearchOpen}
      />

      <SearchPanel
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        search={search}
        setSearch={setSearch}
        isSearching={isSearching}
        recentSearches={recentSearches}
        onAddRecentSearch={addRecentSearch}
        onRemoveRecentSearch={removeRecentSearch}
        onClearAllRecentSearches={clearAllRecentSearches}
      />

      <main
        className={`
          flex-1 flex flex-col pb-24 md:pb-0
          transition-all duration-300
          ${isSearchOpen ? "md:ml-64 md:px-10" : "md:ml-64"}
        `}
      >


        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={
              <Home
                posts={posts}
                filteredPosts={filteredPosts}
                isPosting={isPosting}
                onAddPost={createNewPost}
                onLike={toggleLikePost}
                onDelete={deletePost}
                onEdit={toggleEditMode}
                onUpdate={saveUpdatedPost}
                onAddComment={addComment}
              />
            }
          />
          <Route path="/explore" element={<Explore />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route
            path="/create"
            element={
              <Home
                posts={posts}
                filteredPosts={filteredPosts}
                isPosting={isPosting}
                onAddPost={createNewPost}
                onLike={toggleLikePost}
                onDelete={deletePost}
                onEdit={toggleEditMode}
                onUpdate={saveUpdatedPost}
                onAddComment={addComment}
              />
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </main>
    </div>
  );
}

export default App;
