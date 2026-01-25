import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  search: string;
  setSearch: (value: string) => void;
}

function Search({ search, setSearch }: SearchProps) {
  return (
    <div className="relative group w-full">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-indigo-500 transition-colors pointer-events-none">
        <SearchIcon size={18} />
      </div>
      <input
        type="text"
        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all text-neutral-100 placeholder:text-neutral-500 text-sm"
        placeholder="Pesquisar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
      />
    </div>
  );
}

export default Search;