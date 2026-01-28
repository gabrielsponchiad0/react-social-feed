export type VotoUsuario = "like" | null;

export interface Post {
  id: number;
  title: string;
  image?: string;
  createdAt: string | number | Date;
  likes: number;
  votoUsuario: VotoUsuario;
  isEditing: boolean;
}

export type Theme = "dark" | "light"
