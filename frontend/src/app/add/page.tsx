"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Disc3, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function AddRecordPage() {
  const [artist, setArtist] = useState("");
  const [album_artist, setAlbumArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [year, setYear] = useState<number>(0);
  const [genre, setGenre] = useState<string[]>([]);
  const [record_label, setRecordLabel] = useState("");
  const [format, setFormat] = useState("");
  const [condition, setCondition] = useState("");
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
    if (!imageFile) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("artist", artist);
    formData.append("album_artist", album_artist);
    formData.append("album", album);
    formData.append("year", year.toString());
    formData.append("genre", JSON.stringify(genre));
    formData.append("record_label", record_label);
    formData.append("format", format);
    formData.append("condition", condition);
    formData.append("album_artwork", imageFile);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    try {
      const response = await fetch(`${apiUrl}/records/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Error:", error);
        alert(`Failed to add record: ${JSON.stringify(error)}`);
        return;
      }
      const res = await response.json();
      console.log(res);
      router.push("/");
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-4">
      <Button
        variant="ghost"
        size="sm"
        nativeButton={false}
        render={<Link href="/" />}
        className="mb-3 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to collection
      </Button>

      <div className="mx-auto max-w-lg">
        <Card className="overflow-hidden border-border/50 pt-0 gap-0 shadow-xl shadow-rose-500/5">
          <CardHeader className="space-y-1 bg-linear-to-br from-rose-500 to-amber-500 px-6 py-5 text-white">
            <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Disc3 className="size-5" />
            </div>
            <h1 className="text-center text-2xl font-bold tracking-tight">
              Add New Record
            </h1>
            <p className="text-center text-sm text-rose-100">
              Add a vinyl to your collection
            </p>
          </CardHeader>

          <CardContent className="flex flex-col gap-3 p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label
                  htmlFor="album"
                  className="text-xs uppercase tracking-wider text-muted-foreground"
                >
                  Album
                </Label>
                <Input
                  id="album"
                  placeholder="Album name..."
                  className="focus-visible:border-rose-500 focus-visible:ring-rose-500/20"
                  onChange={(e) => setAlbum(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label
                  htmlFor="artist"
                  className="text-xs uppercase tracking-wider text-muted-foreground"
                >
                  Artist
                </Label>
                <Input
                  id="artist"
                  placeholder="Artist name..."
                  className="focus-visible:border-rose-500 focus-visible:ring-rose-500/20"
                  onChange={(e) => setArtist(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="album_artist"
                className="text-xs uppercase tracking-wider text-muted-foreground"
              >
                Album Artist
              </Label>
              <Input
                id="album_artist"
                placeholder="Album artist..."
                className="focus-visible:border-rose-500 focus-visible:ring-rose-500/20"
                onChange={(e) => setAlbumArtist(e.target.value)}
              />
            </div>

            <Separator />

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label
                  htmlFor="year"
                  className="text-xs uppercase tracking-wider text-muted-foreground"
                >
                  Year
                </Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="e.g. 1977"
                  className="focus-visible:border-rose-500 focus-visible:ring-rose-500/20"
                  onChange={(e) => setYear(Number(e.target.value))}
                />
              </div>

              <div className="space-y-1">
                <Label
                  htmlFor="genre"
                  className="text-xs uppercase tracking-wider text-muted-foreground"
                >
                  Genre
                </Label>
                <Input
                  id="genre"
                  placeholder="Jazz, Soul..."
                  className="focus-visible:border-rose-500 focus-visible:ring-rose-500/20"
                  onChange={(e) =>
                    setGenre(e.target.value.split(",").map((g) => g.trim()))
                  }
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1">
                <Label
                  htmlFor="label"
                  className="text-xs uppercase tracking-wider text-muted-foreground"
                >
                  Label
                </Label>
                <Input
                  id="label"
                  placeholder="Record label..."
                  className="focus-visible:border-rose-500 focus-visible:ring-rose-500/20"
                  onChange={(e) => setRecordLabel(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label
                  htmlFor="format"
                  className="text-xs uppercase tracking-wider text-muted-foreground"
                >
                  Format
                </Label>
                <Input
                  id="format"
                  placeholder='LP, 7"...'
                  className="focus-visible:border-rose-500 focus-visible:ring-rose-500/20"
                  onChange={(e) => setFormat(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label
                  htmlFor="condition"
                  className="text-xs uppercase tracking-wider text-muted-foreground"
                >
                  Condition
                </Label>
                <Input
                  id="condition"
                  placeholder="Mint, VG+..."
                  className="focus-visible:border-rose-500 focus-visible:ring-rose-500/20"
                  onChange={(e) => setCondition(e.target.value)}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-1">
              <Label
                htmlFor="image"
                className="text-xs uppercase tracking-wider text-muted-foreground"
              >
                Album Artwork
              </Label>
              <label
                htmlFor="image"
                className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-5 transition-colors hover:border-rose-500/50 hover:bg-rose-500/5"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-rose-500/10 transition-colors group-hover:bg-rose-500/20">
                  <Upload className="size-5 text-rose-500" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">
                    {imageFile ? imageFile.name : "Click to upload artwork"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG up to 10MB
                  </p>
                </div>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={setImageFileHandler}
                />
              </label>
            </div>

            <Button
              onClick={sendData}
              className="w-full bg-rose-500 py-5 text-base font-semibold text-white shadow-lg shadow-rose-500/20 transition-all hover:bg-rose-600 hover:shadow-rose-500/30"
            >
              Add to Collection
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
