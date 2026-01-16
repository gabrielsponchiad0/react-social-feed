import { ThumbsDown, ThumbsUp, Pencil, Check, X } from "lucide-react";
import { useState } from "react";

function PostItem({ post, onLike, onDislike, onDelete, onEdit, onUpdate }) {
  const [editTitle, setEditTitle] = useState(post.title);

  const handleSave = () => {
    onUpdate(post.id, editTitle);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
    onEdit(post.id);
    }
  };

  const dataFormatada = new Date(post.createdAt).toLocaleDateString();

  return (
    <div className="card">
      <div className="card-actions-top">
        <button 
          className="icon-btn edit-btn" 
          onClick={() => post.isEditing ? handleSave() : onEdit(post.id)}
          title={post.isEditing ? "Salvar" : "Editar"}
        >
          {post.isEditing ? <Check size={18} /> : <Pencil size={18} />}
        </button>
        <button 
          className="icon-btn delete-btn" 
          onClick={() => onDelete(post.id)}
          title="Excluir"
        >
          <X size={18} />
        </button>
      </div>

      {post.image && (
        <img src={post.image} alt="Post" className="post-image" />
      )}

      {post.isEditing ? (
        <input
          type="text"
          className="edit-title-input"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <h2>{post.title}</h2>
      )}

      <span className="post-date">{dataFormatada}</span>

      <div className="actions">
        <button
          className={`like-btn ${
            post.votoUsuario === "like" ? "active-like" : ""
          }`}
          onClick={() => onLike(post.id)}
        >
          <ThumbsUp size={20} />
          <span>{post.likes}</span>
        </button>

        <button
          className={`dislike-btn ${
            post.votoUsuario === "dislike" ? "active-dislike" : ""
          }`}
          onClick={() => onDislike(post.id)}
        >
          <ThumbsDown size={20} />
          <span>{post.dislikes}</span>
        </button>
      </div>
    </div>
  );
}

function PostCard({ posts, onLike, onDislike, onDelete, onEdit, onUpdate }) {
  return (
    <div className="posts-list">
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

export default PostCard;
