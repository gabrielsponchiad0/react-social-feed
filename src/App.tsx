// Componentes
import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import SearchPanel from "./components/SearchPanel";
import { Theme } from "./types/types";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

// Hooks
import { usePosts } from "./hooks/usePosts";
import { useSearch } from "./hooks/useSearch";

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  const {
    posts,
    isPosting,
    toggleLikePost,
    deletePost,
    toggleEditMode,
    saveUpdatedPost,
    createNewPost,
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

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // filtro do feed baseado na busca atual (debounced)
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <BrowserRouter>
      <div
        data-theme={theme}
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
          <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 z-50 p-2 rounded-full bg-[var(--bg-secondary)] cursor-pointer"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <Routes>
            <Route
              path="/"
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
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>

          <Footer />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
