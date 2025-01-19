import { MediaCard } from "@/components/MediaCard";
import { useMedia } from "@/context/MediaContext";
import { MediaItem } from "@/types/media";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MediaForm } from "@/components/MediaForm";

export function MediaGrid() {
  const { items, editItem, deleteItem } = useMedia();
  const { toast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaItem | undefined>();

  const handleEdit = (item: MediaItem) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteItem(id);
    toast({
      title: "Success",
      description: "Media item deleted successfully",
    });
  };

  const handleEditSubmit = (data: Omit<MediaItem, "id">) => {
    if (editingItem) {
      editItem({ ...data, id: editingItem.id });
      setEditingItem(undefined);
      setIsEditModalOpen(false);
      toast({
        title: "Success",
        description: "Media item updated successfully",
      });
    }
  };

  return (
    <>
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

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Media Item</DialogTitle>
          </DialogHeader>
          <MediaForm
            initialData={editingItem}
            onSubmit={handleEditSubmit}
            onCancel={() => {
              setEditingItem(undefined);
              setIsEditModalOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}