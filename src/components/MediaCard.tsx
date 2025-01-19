import { MediaItem } from "@/types/media";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface MediaCardProps {
  item: MediaItem;
  onEdit: (item: MediaItem) => void;
  onDelete: (id: string) => void;
}

export function MediaCard({ item, onEdit, onDelete }: MediaCardProps) {
  return (
    <Card className="media-card overflow-hidden">
      <CardHeader className="p-0">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-64 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2">{item.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-secondary capitalize">{item.type}</span>
          <span className="text-sm font-semibold">Rating: {item.rating}/10</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(item)}
          className="text-secondary hover:text-secondary/80"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(item.id)}
          className="text-destructive hover:text-destructive/80"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}