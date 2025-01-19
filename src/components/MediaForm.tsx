import { useState } from "react";
import { MediaItem, MediaType } from "@/types/media";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MediaFormProps {
  initialData?: MediaItem;
  onSubmit: (data: Omit<MediaItem, "id">) => void;
  onCancel: () => void;
}

export function MediaForm({ initialData, onSubmit, onCancel }: MediaFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    type: initialData?.type || "anime",
    rating: initialData?.rating || 5,
    imageUrl: initialData?.imageUrl || "",
    description: initialData?.description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <Select
          value={formData.type}
          onValueChange={value => setFormData(prev => ({ ...prev, type: value as MediaType }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="anime">Anime</SelectItem>
            <SelectItem value="manga">Manga</SelectItem>
            <SelectItem value="novel">Novel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="rating">Rating (1-10)</Label>
        <Input
          id="rating"
          type="number"
          min="1"
          max="10"
          value={formData.rating}
          onChange={e => setFormData(prev => ({ ...prev, rating: Number(e.target.value) }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Cover Image URL</Label>
        <Input
          id="imageUrl"
          type="url"
          value={formData.imageUrl}
          onChange={e => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? "Update" : "Add"} Media
        </Button>
      </div>
    </form>
  );
}