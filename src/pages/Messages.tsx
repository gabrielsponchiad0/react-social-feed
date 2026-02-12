export default function Messages() {
  return (
    <div className="py-12 px-4">
      <h2 className="text-2xl font-bold mb-6">Mensagens</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500"></div>
            <div>
              <p className="font-bold">Usuário {i}</p>
              <p className="text-sm text-[var(--text-secondary)]">Última mensagem enviada...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
