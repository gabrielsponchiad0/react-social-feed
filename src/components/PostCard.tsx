import { ThumbsDown, ThumbsUp, Pencil, Check, X } from "lucide-react";
import { useState, KeyboardEvent } from "react";
import { Post } from "../types/Post";

interface PostItemProps {
  post: Post;
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
}

function PostItem({ post, onLike, onDislike, onDelete, onEdit, onUpdate }: PostItemProps) {
  const [editTitle, setEditTitle] = useState<string>(post.title);

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(post.id, editTitle);
    } else {
      onEdit(post.id); 
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      onEdit(post.id);
    }
  };

  const dataFormatada = new Date(post.createdAt).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-neutral-700 shadow-lg shadow-black/20">
      {/* header do post */}
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-inner overflow-hidden">
            {post.image ? (
              <img
                src={post.image}
                className="w-full h-full object-cover opacity-30"
              />
            ) : (
              "U"
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-neutral-100 leading-tight">
              Membro do Feedly
            </span>
            <span className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
              {dataFormatada}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className={`cursor-pointer p-2 rounded-full transition-all ${
              post.isEditing
                ? "text-green-400 bg-green-400/10"
                : "text-neutral-500 hover:text-white hover:bg-neutral-800"
            }`}
            onClick={() => (post.isEditing ? handleSave() : onEdit(post.id))}
            title={post.isEditing ? "Salvar" : "Editar"}
          >
            {post.isEditing ? <Check size={18} /> : <Pencil size={18} />}
          </button>

          <button
            className="cursor-pointer p-2 rounded-full text-neutral-500 hover:text-red-400 hover:bg-red-400/10 transition-all"
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
          <div className="relative">
            <input
              type="text"
              className="w-full bg-neutral-800 border-none outline-none rounded-xl py-3 px-4 text-white ring-2 ring-indigo-500/50 focus:ring-indigo-500 shadow-inner"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>
        ) : (
          <h2 className="text-[17px] text-neutral-200 font-normal leading-relaxed tracking-wide">
            {post.title}
          </h2>
        )}
      </div>

      {/* imagem do post */}
      {post.image && (
        <div className="px-3 pb-3">
          <div className="aspect-video w-full rounded-xl bg-neutral-950 flex items-center justify-center overflow-hidden border border-neutral-800">
            <img
              src={post.image}
              alt="Conteúdo do post"
              className="w-full h-full object-cover transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* botão like/dislike */}
      <div className="p-2 flex items-center gap-2 border-t border-neutral-800/30 bg-neutral-900/50">
        <button
          className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 group/btn ${
            post.votoUsuario === "like"
              ? "text-indigo-400 bg-indigo-400/10"
              : "text-neutral-500 hover:text-indigo-400 hover:bg-neutral-800"
          }`}
          onClick={() => onLike(post.id)}
        >
          <ThumbsUp
            size={24}
            className={
              post.votoUsuario === "like"
                ? "fill-current"
                : "group-hover/btn:scale-110 transition-transform"
            }
          />
          <span className="text-sm font-bold">{post.likes}</span>
        </button>

        <button
          className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 group/btn ${
            post.votoUsuario === "dislike"
              ? "text-rose-400 bg-rose-400/10"
              : "text-neutral-500 hover:text-rose-400 hover:bg-neutral-800"
          }`}
          onClick={() => onDislike(post.id)}
        >
          <ThumbsDown
            size={24}
            className={
              post.votoUsuario === "dislike"
                ? "fill-current"
                : "group-hover/btn:scale-110 transition-transform"
            }
          />
          <span className="text-sm font-bold">{post.dislikes}</span>
        </button>
      </div>
    </article>
  );
}

interface PostCardProps {
  posts: Post[];
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
}

export default function PostCard({ posts, onLike, onDislike, onDelete, onEdit, onUpdate }: PostCardProps) {
  return (
    <div className="grid gap-8">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onLike={onLike}
          onDislike={onDislike}
          onDelete={onDelete}
          onEdit={onEdit}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
