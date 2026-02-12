import { Pencil, Check, X, Heart, MessageSquare, Send } from "lucide-react";
import { useState, useEffect } from "react";
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
  onAddComment: (id: number, text: string) => void;
}

/**
 * Componente responsável por renderizar UM post.
 * Ele só controla estado temporário (edição do texto).
 */
function PostItem({
  post,
  onLike,
  onDelete,
  onEdit,
  onUpdate,
  onAddComment,
}: PostItemProps) {
  // Estado local apenas para edição (não vai para o estado global)
  const [editTitle, setEditTitle] = useState<string>(post.title);
  const [showComments, setShowComments] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [newComment, setNewComment] = useState("");

  // Bloqueia o scroll do body quando os comentários ou o modal estão abertos
  useEffect(() => {
    if (showComments || showDeleteConfirm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showComments, showDeleteConfirm]);

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(post.id, editTitle);
    } else {
      onEdit(post.id);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(post.id, newComment);
      setNewComment("");
    }
  };

  // Data formatada apenas para exibição
  const formattedDate = new Date(post.createdAt).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <>
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
              text-[var(--text-secondary)] font-bold text-xs
              bg-[var(--bg-primary)] border border-[var(--border-color)]
              shadow-inner overflow-hidden
            "
          >
            U
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

          {/* ações */}
          <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            <button
              className={`cursor-pointer p-2 rounded-full transition-all ${
                post.isEditing
                  ? "text-green-500 bg-green-500/10"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]"
              }`}
              onClick={() => (post.isEditing ? handleSave() : onEdit(post.id))}
            >
              {post.isEditing ? <Check size={18} /> : <Pencil size={18} />}
            </button>

            <button
              className="cursor-pointer p-2 rounded-full text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-500/10 transition-all"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* conteúdo */}
        <div className="px-4 pb-3">
          {post.isEditing ? (
            <textarea
              className="
                w-full bg-[var(--bg-primary)] border border-[var(--border-color)]
                outline-none rounded-xl py-3 px-4 text-[var(--text-primary)]
                focus:ring-2 focus:ring-[var(--accent-color)]/50 min-h-[100px] resize-none
              "
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => {
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

        {post.image && (
          <div className="px-3 pb-3">
            <div className="aspect-video w-full rounded-xl bg-[var(--bg-primary)] overflow-hidden border border-[var(--border-color)]">
              <img
                src={post.image}
                alt="Post"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        )}

        {/* interação */}
        <div className="p-2 flex items-center gap-2 border-t border-[var(--border-color)]/30 bg-[var(--bg-primary)]/30">
          <button
            className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 group/btn ${
              post.votoUsuario === "like"
                ? "text-red-500 bg-red-500/10"
                : "text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-500/10"
            }`}
            onClick={() => onLike(post.id)}
          >
            <Heart size={22} className={post.votoUsuario === "like" ? "fill-current" : "group-hover/btn:scale-110"} />
            <span className="text-sm font-bold">{post.likes}</span>
          </button>

          <button
            className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--accent-color)] hover:bg-[var(--accent-color)]/10 transition-all duration-300 group/btn"
            onClick={() => setShowComments(true)}
          >
            <MessageSquare size={22} className="group-hover/btn:scale-110" />
            <span className="text-sm font-bold">{post.comments?.length || 0}</span>
          </button>
        </div>
      </article>

      {/* confirmar exclusão */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setShowDeleteConfirm(false)}
          />
          <div className="relative w-full max-w-sm bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6">
                <X size={32} />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Excluir postagem?</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
                Esta ação não pode ser desfeita. A postagem será removida permanentemente da sua timeline.
              </p>
              
              <div className="flex flex-col w-full gap-3">
                <button
                  onClick={() => {
                    onDelete(post.id);
                    setShowDeleteConfirm(false);
                  }}
                  className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl transition-all active:scale-[0.98] cursor-pointer"
                >
                  Excluir permanentemente
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="w-full py-4 bg-[var(--bg-primary)] hover:bg-[var(--border-color)] text-[var(--text-primary)] font-bold rounded-2xl transition-all active:scale-[0.98] cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Painel de Comentários */}
      {showComments && (
        <div className="fixed inset-0 z-[150] flex justify-end">
          {/* Fundo escurecido */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowComments(false)}
          />

          {/* Conteúdo do Painel */}
          <div 
            className="
              relative w-full max-w-[400px] bg-[var(--bg-secondary)] h-full
              shadow-2xl border-l border-[var(--border-color)]
              flex flex-col animate-in slide-in-from-right duration-500 ease-out
            "
          >
            {/* Cabeçalho */}
            <div className="p-6 border-b border-[var(--border-color)]/30 flex justify-between items-center bg-[var(--bg-secondary)]/50 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[var(--accent-color)]/10 rounded-xl text-[var(--accent-color)]">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text-primary)]">Comentários</h3>
                  <p className="text-xs text-[var(--text-secondary)]">{post.comments?.length || 0} conversas</p>
                </div>
              </div>
              <button 
                className="p-2 rounded-full hover:bg-[var(--bg-primary)] text-[var(--text-secondary)] transition-all cursor-pointer"
                onClick={() => setShowComments(false)}
              >
                <X size={20} />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-6">
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <div key={comment.id} className="group/comment flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="w-10 h-10 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] flex-shrink-0 flex items-center justify-center text-xs text-[var(--text-secondary)] font-bold">
                      U
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-[var(--text-primary)]">Usuário</span>
                        <span className="text-[10px] text-[var(--text-secondary)]">
                          {new Date(comment.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <div className="bg-[var(--bg-primary)]/40 rounded-2xl px-1 transition-all">
                        <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-10">
                  <div className="w-16 h-16 bg-[var(--bg-primary)] rounded-full flex items-center justify-center mb-4 text-[var(--text-secondary)]">
                    <MessageSquare size={32} />
                  </div>
                  <h4 className="text-[var(--text-primary)] font-bold mb-2">Nenhum comentário por aqui</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Este post ainda não recebeu nenhuma interação. Que tal começar a conversa?
                  </p>
                </div>
              )}
            </div>

            {/* Input Overlay at bottom */}
            <div className="p-6 bg-[var(--bg-primary)] border-t border-[var(--border-color)]">
              <div className="flex gap-3 items-center">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Deixe sua opinião..."
                    className="
                      w-full bg-[var(--bg-secondary)] border border-[var(--border-color)]
                      rounded-2xl py-3 pl-5 pr-12 text-sm text-[var(--text-primary)]
                      outline-none focus:ring-2 focus:ring-[var(--accent-color)]/50
                      transition-all shadow-inner
                    "
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleAddComment();
                      }
                    }}
                  />
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="
                      absolute right-2 top-2 bottom-2 px-3 rounded-xl
                      bg-[var(--accent-color)] text-white
                      disabled:opacity-50 disabled:bg-neutral-800
                      hover:scale-105 active:scale-95 transition-all
                      cursor-pointer flex items-center justify-center
                    "
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-[var(--text-secondary)] mt-3 text-center">
                Respeite as diretrizes da comunidade ao comentar.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * componente responsável apenas por listar os posts
 */
interface PostCardProps {
  posts: Post[];
  onLike: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
  onAddComment: (id: number, text: string) => void;
}

  export default function PostCard({
    posts,
    onLike,
    onDelete,
    onEdit,
    onUpdate,
    onAddComment,
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
            onAddComment={onAddComment}
          />
        ))}
      </div>
    );
  }
