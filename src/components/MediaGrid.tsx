import { MediaCard } from "@/components/MediaCard";
import { useMedia } from "@/context/MediaContext";
import { MediaItem } from "@/types/media";

export function MediaGrid() {
  const { items, editItem, deleteItem } = useMedia();

  const handleEdit = (item: MediaItem) => {
    editItem(item);
  };

  const handleDelete = (id: string) => {
    deleteItem(id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map(item => (
        <MediaCard
          key={item.id}
          item={item}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}