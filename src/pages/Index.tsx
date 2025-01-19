import { useState } from "react";
import { Plus } from "lucide-react";
import { Header } from "@/components/Header";
import { MediaForm } from "@/components/MediaForm";
import { MediaGrid } from "@/components/MediaGrid";
import { useMedia } from "@/context/MediaContext";
import { MediaItem } from "@/types/media";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { addItem, editItem } = useMedia();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaItem | undefined>();

  const handleAdd = (data: Omit<MediaItem, "id">) => {
    addItem(data);
    setIsModalOpen(false);
    toast({
      title: "Success",
      description: "Media item added successfully",
    });
  };

  const handleEdit = (data: Omit<MediaItem, "id">) => {
    if (editingItem) {
      editItem({ ...data, id: editingItem.id });
      setEditingItem(undefined);
      setIsModalOpen(false);
      toast({
        title: "Success",
        description: "Media item updated successfully",
      });
    }
  };

  return (
    <div className="min-h-screen pb-8">
      <Header />
      
      <main className="container mx-auto px-4 pt-24">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">My Collection</h2>
          <Button
            onClick={() => {
              setEditingItem(undefined);
              setIsModalOpen(true);
            }}
            className="bg-secondary hover:bg-secondary/80 text-secondary-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Media
          </Button>
        </div>

        <MediaGrid />

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit" : "Add"} Media Item
              </DialogTitle>
            </DialogHeader>
            <MediaForm
              initialData={editingItem}
              onSubmit={editingItem ? handleEdit : handleAdd}
              onCancel={() => {
                setEditingItem(undefined);
                setIsModalOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Index;