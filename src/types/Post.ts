export type VotoUsuario = "like" | "dislike" | null;

export interface Post {
  id: number;
  title: string;
  image?: string;
  createdAt: string | number | Date;
  likes: number;
  dislikes: number;
  votoUsuario: VotoUsuario;
  isEditing: boolean;
}
