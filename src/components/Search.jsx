function Search({ search, setSearch }) {
  return (
    <div className="search-container">
      <h3>Pesquisar</h3>
      <input
        type="text"
        className="search-input"
        placeholder="Digite o título do post..."
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
      />
      {search && <p>Mostrando resultados para: <strong>{search}</strong></p>}
    </div>
  );
}

export default Search;