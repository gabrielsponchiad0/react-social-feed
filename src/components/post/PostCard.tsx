import { Pencil, Check, X, Heart } from "lucide-react";
import { useState } from "react";
import { Post } from "../../types/types";

/**
 * Props do item individual do post.
 * Todas as ações vêm do componente pai (estado centralizado).
 */
interface PostItemProps {
  post: Post;
  onLike: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
}

/**
 * Componente responsável por renderizar UM post.
 * Ele só controla estado temporário (edição do texto).
 */
function PostItem({ post, onLike, onDelete, onEdit, onUpdate }: PostItemProps) {
  // Estado local apenas para edição (não vai para o estado global)
  const [editTitle, setEditTitle] = useState<string>(post.title);

  /**
   * Salva a edição:
   * - Se houver texto válido, atualiza o post
   * - Caso contrário, apenas cancela o modo edição
   */
  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(post.id, editTitle);
    } else {
      onEdit(post.id);
    }
  };

  // Data formatada apenas para exibição
  const formattedDate = new Date(post.createdAt).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article
      className="
        group bg-[var(--bg-secondary)]
        border border-[var(--border-color)]
        rounded-2xl overflow-hidden
        duration-300 shadow-lg shadow-black/5
        hover:border-[var(--text-secondary)]/30
      "
    >
      {/* Cabeçalho do post */}
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="
              w-10 h-10 rounded-full flex items-center justify-center
              text-white font-bold text-sm shadow-inner overflow-hidden
              bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
            "
          >
            {post.image ? (
              <img
                src={post.image}
                className="w-full h-full object-cover opacity-30"
                alt="Avatar"
              />
            ) : (
              "U"
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-bold text-[var(--text-primary)] leading-tight">
              Membro do Feedly
            </span>
            <span className="text-[11px] font-medium text-[var(--text-secondary)] uppercase tracking-wider">
              {formattedDate}
            </span>
          </div>
        </div>

        {/* ações aparecem no hover em ambos dispositivos (desktop & mobile) */}
        <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <button
            className={`cursor-pointer p-2 rounded-full transition-all ${
              post.isEditing
                ? "text-green-500 bg-green-500/10"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]"
            }`}
            onClick={() => (post.isEditing ? handleSave() : onEdit(post.id))}
            title={post.isEditing ? "Salvar" : "Editar"}
          >
            {post.isEditing ? <Check size={18} /> : <Pencil size={18} />}
          </button>

          <button
            className="cursor-pointer p-2 rounded-full text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-500/10 transition-all"
            onClick={() => onDelete(post.id)}
            title="Excluir"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* conteúdo do post */}
      <div className="px-4 pb-3">
        {post.isEditing ? (
          <textarea
            className="
              w-full bg-[var(--bg-primary)]
              border border-[var(--border-color)]
              outline-none rounded-xl
              py-3 px-4 text-[var(--text-primary)]
              focus:ring-2 focus:ring-[var(--accent-color)]/50
              shadow-inner min-h-[100px] resize-none
            "
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              // Enter salva / Shift+Enter quebra linha / Escape cancela
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSave();
              } else if (e.key === "Escape") {
                onEdit(post.id);
              }
            }}
            autoFocus
          />
        ) : (
          <h2 className="text-[17px] text-[var(--text-primary)] font-normal leading-relaxed tracking-wide whitespace-pre-wrap">
            {post.title}
          </h2>
        )}
      </div>

      {/* imagem opcional do post */}
      {post.image && (
        <div className="px-3 pb-3">
          <div className="aspect-video w-full rounded-xl bg-[var(--bg-primary)] overflow-hidden border border-[var(--border-color)]">
            <img
              src={post.image}
              alt="Conteúdo do post"
              className="w-full h-full object-cover transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Área de interação (like) */}
      <div className="p-2 flex items-center gap-2 border-t border-[var(--border-color)]/30 bg-[var(--bg-primary)]/30">
        <button
          className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 group/btn ${
            post.votoUsuario === "like"
              ? "text-red-500 bg-red-500/10"
              : "text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-500/10"
          }`}
          onClick={() => onLike(post.id)}
        >
          <Heart
            size={24}
            className={
              post.votoUsuario === "like"
                ? "fill-current"
                : "group-hover/btn:scale-110 transition-transform"
            }
          />
          <span className="text-sm font-bold">{post.likes}</span>
        </button>
      </div>
    </article>
  );
}

/**
 * componente responsável apenas por listar os posts
 * não possui lógica própria, só repassa ações
 */
interface PostCardProps {
  posts: Post[];
  onLike: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
}

export default function PostCard({
  posts,
  onLike,
  onDelete,
  onEdit,
  onUpdate,
}: PostCardProps) {
  return (
    <div className="grid gap-8">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onLike={onLike}
          onDelete={onDelete}
          onEdit={onEdit}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
