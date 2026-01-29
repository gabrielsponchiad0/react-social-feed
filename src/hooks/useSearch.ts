import { useState, useEffect } from "react";

const STORAGE_KEY_SEARCHES = "@feedly:recent_searches";

/**
 * Hook para gerenciar estado de busca e histórico com debounce
 */
export function useSearch() {
  const [search, setSearch] = useState(""); 
  const [isSearching, setIsSearching] = useState(false); 
  const [debouncedSearch, setDebouncedSearch] = useState(""); 
  
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SEARCHES);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SEARCHES, JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Efeito de Debounce: evita múltiplas requisições/filtros ao digitar
  useEffect(() => {
    if (search === debouncedSearch) return;

    setIsSearching(true);
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(handler);
  }, [search, debouncedSearch]);

  const addRecentSearch = (query: string) => {
    const cleaned = query.trim();
    if (!cleaned) return;
    
    setRecentSearches((prev) => {
      const withoutDuplicate = prev.filter((q) => q !== cleaned);
      return [cleaned, ...withoutDuplicate].slice(0, 10);
    });
  };

  const removeRecentSearch = (query: string) => {
    setRecentSearches((prev) => prev.filter((q) => q !== query));
  };

  const clearAllRecentSearches = () => {
    setRecentSearches([]);
  };

  return {
    search,
    setSearch,
    isSearching,
    debouncedSearch,
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearAllRecentSearches,
  };
}
