const Profile = () => {
  return (
    <div className="py-12 px-4">
      <div className="flex flex-col items-center mb-12">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-700 border-4 border-[var(--border-color)] flex items-center justify-center text-3xl font-bold mb-4">
          U
        </div>
        <h2 className="text-2xl font-bold">Membro do Feedly</h2>
        <p className="text-[var(--text-secondary)]">@usuario_feedly</p>
      </div>
      
      <div className="border-t border-[var(--border-color)] pt-8">
        <h3 className="font-bold mb-4">Minhas Publicações</h3>
        <p className="text-center text-[var(--text-secondary)] py-10">Você ainda não tem publicações.</p>
      </div>
    </div>
  );
};

export default Profile;
