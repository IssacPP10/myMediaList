import { createContext, useContext, useEffect, useState } from "react";
import { MediaItem } from "@/types/media";

interface MediaContextType {
  items: MediaItem[];
  addItem: (item: Omit<MediaItem, "id">) => void;
  editItem: (item: MediaItem) => void;
  deleteItem: (id: string) => void;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export function MediaProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<MediaItem[]>(() => {
    const stored = localStorage.getItem("mediaItems");
    return stored ? JSON.parse(stored) : [];
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