const Explore = () => {
  return (
    <div className="py-12 px-4">
      <h2 className="text-2xl font-bold mb-6">Explorar</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-square bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl flex items-center justify-center text-[var(--text-secondary)]">
            Trend {i}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
