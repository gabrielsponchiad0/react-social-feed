export type VotoUsuario = "like" | null;

export interface Comment {
  id: number;
  text: string;
  createdAt: string | number | Date;
}

export interface Post {
  id: number;
  title: string;
  image?: string;
  createdAt: string | number | Date;
  likes: number;
  votoUsuario: VotoUsuario;
  isEditing: boolean;
  isPosting: boolean;
  comments?: Comment[];
}
