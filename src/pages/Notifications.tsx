export default function Notifications() {
  return (
    <div className="py-12 px-4">
      <h2 className="text-2xl font-bold mb-6">Notificações</h2>
      <div className="space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 border-b border-[var(--border-color)] flex items-center gap-4">
             <div className="w-2 h-2 rounded-full bg-blue-500"></div>
             <p className="text-sm">Alguém curtiu sua publicação #{i}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
