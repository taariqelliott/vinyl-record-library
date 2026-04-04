"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RecordType } from "@/types/types";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function EditRecord({ record }: { record: RecordType }) {
  const [open, setOpen] = useState(false);
  const [artist, setArtist] = useState(record.artist);
  const [album_artist, setAlbumArtist] = useState(record.album_artist);
  const [album, setAlbum] = useState(record.album);
  const [year, setYear] = useState(record.year);
  const [genre, setGenre] = useState(record.genre);
  const [record_label, setRecordLabel] = useState(record.record_label);
  const [format, setFormat] = useState(record.format);
  const [condition, setCondition] = useState(record.condition);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();

  const setImageFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (file.size > 10 * 1024 * 1024) {
      alert("File Size To Large");
      return;
    }
    setImageFile(file);
  };

  const sendData = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    const formData = new FormData();
    formData.append("artist", artist);
    formData.append("album_artist", album_artist);
    formData.append("album", album);
    formData.append("year", year.toString());
    formData.append("genre", JSON.stringify(genre));
    formData.append("record_label", record_label);
    formData.append("format", format);
    formData.append("condition", condition);
    if (imageFile) {
      formData.append("album_artwork", imageFile);
    }

    try {
      const response = await fetch(`${apiUrl}/records/${record.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Error:", error);
        alert(`Failed to update record: ${JSON.stringify(error)}`);
        return;
      }

      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline">Edit</Button>} />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit Record</DialogTitle>
          <DialogDescription>
            Update the details for this record.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label
                htmlFor="edit-album"
                className="text-xs uppercase tracking-wider text-muted-foreground"
              >
                Album
              </Label>
              <Input
                id="edit-album"
                value={album}
                className="focus-visible:border-orange-500 focus-visible:ring-orange-500/20"
                onChange={(e) => setAlbum(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="edit-artist"
                className="text-xs uppercase tracking-wider text-muted-foreground"
              >
                Artist
              </Label>
              <Input
                id="edit-artist"
                value={artist}
                className="focus-visible:border-orange-500 focus-visible:ring-orange-500/20"
                onChange={(e) => setArtist(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="edit-album-artist"
              className="text-xs uppercase tracking-wider text-muted-foreground"
            >
              Album Artist
            </Label>
            <Input
              id="edit-album-artist"
              value={album_artist}
              className="focus-visible:border-orange-500 focus-visible:ring-orange-500/20"
              onChange={(e) => setAlbumArtist(e.target.value)}
            />
          </div>

          <Separator />

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label
                htmlFor="edit-year"
                className="text-xs uppercase tracking-wider text-muted-foreground"
              >
                Year
              </Label>
              <Input
                id="edit-year"
                type="number"
                value={year}
                className="focus-visible:border-orange-500 focus-visible:ring-orange-500/20"
                onChange={(e) => setYear(Number(e.target.value))}
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="edit-genre"
                className="text-xs uppercase tracking-wider text-muted-foreground"
              >
                Genre
              </Label>
              <Input
                id="edit-genre"
                value={genre.join(", ")}
                className="focus-visible:border-orange-500 focus-visible:ring-orange-500/20"
                onChange={(e) =>
                  setGenre(e.target.value.split(",").map((g) => g.trim()))
                }
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-1">
              <Label
                htmlFor="edit-label"
                className="text-xs uppercase tracking-wider text-muted-foreground"
              >
                Label
              </Label>
              <Input
                id="edit-label"
                value={record_label}
                className="focus-visible:border-orange-500 focus-visible:ring-orange-500/20"
                onChange={(e) => setRecordLabel(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="edit-format"
                className="text-xs uppercase tracking-wider text-muted-foreground"
              >
                Format
              </Label>
              <Input
                id="edit-format"
                value={format}
                className="focus-visible:border-orange-500 focus-visible:ring-orange-500/20"
                onChange={(e) => setFormat(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="edit-condition"
                className="text-xs uppercase tracking-wider text-muted-foreground"
              >
                Condition
              </Label>
              <Input
                id="edit-condition"
                value={condition}
                className="focus-visible:border-orange-500 focus-visible:ring-orange-500/20"
                onChange={(e) => setCondition(e.target.value)}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-1">
            <Label
              htmlFor="edit-image"
              className="text-xs uppercase tracking-wider text-muted-foreground"
            >
              Album Artwork
            </Label>
            <label
              htmlFor="edit-image"
              className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-5 transition-colors hover:border-orange-500/50 hover:bg-orange-500/5"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-orange-500/10 transition-colors group-hover:bg-orange-500/20">
                <Upload className="size-5 text-orange-500" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">
                  {imageFile ? imageFile.name : "Upload new artwork (optional)"}
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG up to 10MB
                </p>
              </div>
              <input
                id="edit-image"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={setImageFileHandler}
              />
            </label>
          </div>

          <Button
            onClick={sendData}
            nativeButton
            className="w-full bg-orange-500 py-5 text-base font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-600 hover:shadow-orange-500/30"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
