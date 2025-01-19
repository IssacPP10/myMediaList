import { createContext, useContext, useEffect, useState } from "react";
import { MediaItem } from "@/types/media";

interface MediaContextType {
  items: MediaItem[];
  addItem: (item: Omit<MediaItem, "id">) => void;
  editItem: (item: MediaItem) => void;
  deleteItem: (id: string) => void;
}

const defaultItems: MediaItem[] = [
  {
    id: "1",
    name: "Attack on Titan",
    type: "anime",
    rating: 9,
    imageUrl: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    description: "In a world where humanity lives inside cities surrounded by enormous walls due to the Titans, giant humanoid creatures who devour humans seemingly without reason.",
  },
  {
    id: "2",
    name: "One Piece",
    type: "manga",
    rating: 10,
    imageUrl: "https://cdn.myanimelist.net/images/manga/2/253146.jpg",
    description: "Follow Monkey D. Luffy and his swashbuckling crew in their search for the ultimate treasure, the One Piece.",
  },
  {
    id: "3",
    name: "Sword Art Online",
    type: "novel",
    rating: 8,
    imageUrl: "https://cdn.myanimelist.net/images/manga/1/115009.jpg",
    description: "In the year 2022, virtual reality has progressed by leaps and bounds, and a massive online role-playing game called Sword Art Online (SAO) is launched.",
  },
];

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export function MediaProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<MediaItem[]>(() => {
    const stored = localStorage.getItem("mediaItems");
    return stored ? JSON.parse(stored) : defaultItems;
  });

  useEffect(() => {
    localStorage.setItem("mediaItems", JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<MediaItem, "id">) => {
    const newItem = { ...item, id: crypto.randomUUID() };
    setItems(prev => [...prev, newItem]);
  };

  const editItem = (updatedItem: MediaItem) => {
    setItems(prev => prev.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <MediaContext.Provider value={{ items, addItem, editItem, deleteItem }}>
      {children}
    </MediaContext.Provider>
  );
}

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) throw new Error("useMedia must be used within MediaProvider");
  return context;
};