import { MediaItem } from "@/types/media";
import { Edit, Trash2, Star, BookOpen, Tv, ScrollText } from "lucide-react";
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

const TypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "manga":
      return <BookOpen className="w-5 h-5" />;
    case "anime":
      return <Tv className="w-5 h-5" />;
    case "novel":
      return <ScrollText className="w-5 h-5" />;
    default:
      return null;
  }
};

export function MediaCard({ item, onEdit, onDelete }: MediaCardProps) {
  return (
    <Card className="media-card overflow-hidden group">
      <CardHeader className="p-0 relative">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-96 object-cover"
        />
        <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="font-semibold">{item.rating}/10</span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-lg line-clamp-2">{item.name}</h3>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground capitalize shrink-0">
            <TypeIcon type={item.type} />
            {item.type}
          </span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(item)}
          className="hover:bg-secondary/70"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(item.id)}
          className="hover:bg-destructive/70"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}