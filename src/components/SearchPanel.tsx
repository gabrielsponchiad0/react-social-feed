import React from 'react';
import { X, Clock } from "lucide-react";
import Search from "./Search";

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
  search: string;
  setSearch: (value: string) => void;
  isSearching: boolean;
  recentSearches: string[];
  onAddRecentSearch: (query: string) => void;
  onRemoveRecentSearch: (query: string) => void;
  onClearAllRecentSearches: () => void;
}

const SearchPanel = ({
  isOpen,
  onClose,
  search,
  setSearch,
  isSearching,
  recentSearches,
  onAddRecentSearch,
  onRemoveRecentSearch,
  onClearAllRecentSearches
}: SearchPanelProps) => {
    
  return (
    <>
      {/* Painel de busca - Desktop */}
      <div
        className={`
          fixed top-0 bottom-0 z-40 hidden md:block
          bg-[var(--bg-primary)] border-r border-[var(--border-color)]
          transition-all duration-300 ease-in-out
          shadow-[-10px_0_30px_rgba(0,0,0,0.5)]
          ${isOpen ? "left-64 w-80 opacity-100" : "-left-80 w-80 opacity-0"}
        `}
      >
        <div className="p-6 h-full flex flex-col">
          <h2 className="text-2xl font-bold mb-8">Pesquisa</h2>
          <Search
            search={search}
            setSearch={setSearch}
            onSearch={onAddRecentSearch}
            isSearching={isSearching}
          />

          <div className="mt-8 flex-1 overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-bold">Recentes</p>
              {recentSearches.length > 0 && (
                <button
                  onClick={onClearAllRecentSearches}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveRecentSearch(item);
                    }}
                    className="p-2 opacity-0 group-hover:opacity-100"
                  >
                    <X size={14} className="cursor-pointer" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Painel de busca - Mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-[var(--bg-primary)] p-5 flex flex-col md:hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Pesquisa</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-transform active:scale-90"
            >
              <X size={20} />
            </button>
          </div>

          <Search
            search={search}
            setSearch={setSearch}
            isSearching={isSearching}
            onSearch={(query) => {
              onAddRecentSearch(query);
              onClose();
            }}
          />

          <div className="mt-8 flex-1 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-bold opacity-50 uppercase tracking-wider">
                Recentes
              </p>
              {recentSearches.length > 0 && (
                <button
                  onClick={onClearAllRecentSearches}
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
                      onClose();
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
                        onRemoveRecentSearch(item);
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
    </>
  );
};

export default SearchPanel;
