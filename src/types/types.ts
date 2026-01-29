export type VotoUsuario = "like" | null;

export interface Post {
  id: number;
  title: string;
  image?: string;
  createdAt: string | number | Date;
  likes: number;
  votoUsuario: VotoUsuario;
  isEditing: boolean;
  isPosting: boolean;
}

export type Theme = "dark" | "light"
