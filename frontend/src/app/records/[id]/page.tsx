import EditRecord from "@/components/EditRecord";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RecordType } from "@/types/types";
import { ArrowLeft, Award, Calendar, Disc, Tag } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function RecordPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const recordId = (await params).id;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const response = await fetch(`${apiUrl}/records/${recordId}`, {
    cache: "no-store",
  });
  const record: RecordType = await response.json();
  const {
    album,
    album_artist,
    album_artwork,
    artist,
    condition,
    format,
    genre,
    record_label,
    year,
  } = record;

  return (
    <div className="mx-auto max-w-6xl px-6 py-6">
      <Button
        variant="ghost"
        size="sm"
        nativeButton={false}
        render={<Link href="/" />}
        className="mb-4 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to collection
      </Button>

      <Card className="overflow-hidden border-border/50 shadow-xl shadow-rose-500/5 relative">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2">
            <div className="absolute right-8 top-10">
              <EditRecord record={record} />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-xl m-6 bg-zinc-900">
              <img
                src={
                  album_artwork ||
                  "https://placehold.co/600x600/27272a/f97316.png?text=No+Image"
                }
                alt={`${album} cover`}
                className="h-full w-full object-cover rounded-xl"
              />
              {/* <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent md:bg-linear-to-r md:from-transparent md:to-black/10" /> */}
            </div>

            <div className="flex flex-col justify-center gap-5 p-8">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-rose-500">
                  {format}
                </p>
                <h1 className="text-3xl font-bold tracking-tight">{album}</h1>
                <p className="mt-1 text-base text-muted-foreground">{artist}</p>
                {album_artist !== artist && (
                  <p className="text-sm text-muted-foreground/70">
                    Album artist: {album_artist}
                  </p>
                )}
              </div>

              <Separator className="bg-rose-500/20" />

              <div className="flex flex-wrap gap-1.5">
                {genre.map((g) => (
                  <Badge
                    key={g}
                    className="border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400"
                  >
                    {g}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-muted/50 p-3">
                  <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="size-3" />
                    Year
                  </div>
                  <p className="font-semibold">{year}</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/50 p-3">
                  <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Tag className="size-3" />
                    Label
                  </div>
                  <p className="font-semibold">{record_label}</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/50 p-3">
                  <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Disc className="size-3" />
                    Format
                  </div>
                  <p className="font-semibold">{format}</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/50 p-3">
                  <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Award className="size-3" />
                    Condition
                  </div>
                  <p className="font-semibold">{condition}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
