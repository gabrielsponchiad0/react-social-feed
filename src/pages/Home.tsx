import PostForm from '../components/post/PostForm';
import PostCard from '../components/post/PostCard';
import { Post } from '../types/types';

interface HomeProps {
  posts: Post[];
  filteredPosts: Post[];
  isPosting: boolean;
  onAddPost: (title: string, image?: string) => void;
  onLike: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
  onAddComment: (id: number, text: string) => void;
}

export default function Home({ 
  posts, 
  filteredPosts, 
  isPosting, 
  onAddPost, 
  onLike, 
  onDelete, 
  onEdit, 
  onUpdate,
  onAddComment,
}: HomeProps) {
  return (
    <div className="mx-auto w-full max-w-xl py-12 px-4">
      <PostForm 
        onAddPost={onAddPost} 
        count={posts.length} 
        isPosting={isPosting}
      />

      <div className="mt-12 space-y-8">
        {posts.length === 0 ? (
          <p className="text-center text-neutral-500">
            Sua timeline está vazia...
          </p>
        ) : (
          <PostCard
            posts={filteredPosts}
            onLike={onLike}
            onDelete={onDelete}
            onEdit={onEdit}
            onUpdate={onUpdate}
            onAddComment={onAddComment}
          />
        )}
      </div>
    </div>
  );
}
