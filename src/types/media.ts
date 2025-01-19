export type MediaType = "manga" | "anime" | "novel";

export interface MediaItem {
  id: string;
  name: string;
  type: MediaType;
  rating: number;
  imageUrl: string;
  description: string;
}