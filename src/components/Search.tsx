import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  search: string;
  setSearch: (value: string) => void;
  onSearch?: (query: string) => void;
}

/**
 * Input controlado de busca.
 * O estado vem do componente pai para permitir filtros globais.
 */
function Search({ search, setSearch, onSearch }: SearchProps) {
  // busca apenas ao pressionar Enter, se houver texto válido
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim() && onSearch) {
      onSearch(search.trim());
    }
  };

  return (
    <div className="relative group w-full">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] group-focus-within:text-[var(--accent-color)] transition-colors pointer-events-none">
        <SearchIcon size={18} />
      </div>
      <input
        type="text"
        className={`
          w-full bg-[var(--bg-secondary)] 
          border border-[var(--border-color)] 
          rounded-xl py-3 pl-11 pr-4 
          outline-none transition-all 
          text-[var(--text-primary)] 
          placeholder:text-[var(--text-secondary)] 
          text-sm focus:ring-1 
          focus:ring-[var(--accent-color)]/30
        `}
        placeholder="Pesquisar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default Search;