import { ThumbsDown, ThumbsUp } from "lucide-react";

function PostCard({ posts, onLike, onDislike, onDelete }) {
  return (
    <div className="posts-list">
      {posts.map((post) => (
        <div className="card" key={post.id}>
          <button className="delete-x" onClick={() => onDelete(post.id)}>
            ×
          </button>
          {post.image && (
            <img src={post.image} alt="Post" className="post-image" />
          )}

          <h2>{post.title}</h2>

          <div className="actions">
            <button
              className={`like-btn ${
                post.votoUsuario === "like" ? "active-like" : ""
              }`}
              onClick={() => onLike(post.id)}>
              <ThumbsUp />
              <span>{post.likes}</span>
            </button>

            <button
              className={`dislike-btn ${
                post.votoUsuario === "dislike" ? "active-dislike" : ""
              }`}
              onClick={() => onDislike(post.id)}>
              <ThumbsDown />
              <span>{post.dislikes}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostCard;
