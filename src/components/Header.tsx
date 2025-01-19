import { Moon, Sun, Bookmark, Info } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-header">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-secondary" />
            <h1 className="text-xl font-bold">MyMediaList</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAbout(true)}
              className="text-secondary hover:text-secondary/80"
            >
              <Info className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-secondary hover:text-secondary/80"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <Dialog open={showAbout} onOpenChange={setShowAbout}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>About MyMediaList</DialogTitle>
            <DialogDescription>
              <div className="space-y-4 mt-4">
                <p className="text-sm">
                  MyMediaList is a personal media collection manager where you can keep track of your favorite anime, manga, and novels.
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Created by:</h4>
                  <p className="text-sm">issacpp10</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Version:</h4>
                  <p className="text-sm">1.0.0</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">How it works:</h4>
                  <p className="text-sm">
                    Add your favorite media items using the "Add Media" button. You can specify the type (anime, manga, or novel), add a rating, description, and image URL. Edit or delete items as needed. Your collection is automatically saved to your browser's local storage.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Links:</h4>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com/issacpp10"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://linkedin.com/in/issacpp10"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}