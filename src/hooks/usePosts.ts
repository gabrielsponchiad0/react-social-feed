import { useState, useEffect } from "react";
import { Post } from "../types/types";

const STORAGE_KEY_POSTS = "@feedly:posts";

/**
 * Hook para gerenciar a lógica de posts (CRUD e persistência)
 */
export function usePosts() {
  const [isPosting, setIsPosting] = useState(false);

  // Inicializa posts buscando do localStorage
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_POSTS);
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch {
      console.error("Erro ao carregar posts do localStorage");
      return [];
    }
  });

  // Persiste os posts sempre que houver mudanças
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(posts));
  }, [posts]);

  // Toggle de Like/Remover Like
  const toggleLikePost = (postId: number) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        
        const isLiked = post.votoUsuario === "like";
        
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
          votoUsuario: isLiked ? null : "like",
        };
      }),
    );
  };

  const deletePost = (postId: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  const toggleEditMode = (postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, isEditing: !post.isEditing } : post,
      ),
    );
  };

  const saveUpdatedPost = (postId: number, newTitle: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, title: newTitle, isEditing: false } : post,
      ),
    );
  };

  const createNewPost = (title: string, image?: string) => {
    if (isPosting) return;
    
    setIsPosting(true);

    // Simula delay de rede e cria novo post
    setTimeout(() => {
      const newPost: Post = {
        id: Date.now(),
        title,
        image: image || undefined,
        likes: 0,
        votoUsuario: null,
        isEditing: false,
        createdAt: new Date().toISOString(),
        isPosting: false
      };
      
      setPosts((prev) => [newPost, ...prev]);
      setIsPosting(false);
    }, 500);
  };

  return {
    posts,
    isPosting,
    toggleLikePost,
    deletePost,
    toggleEditMode,
    saveUpdatedPost,
    createNewPost,
  };
}
