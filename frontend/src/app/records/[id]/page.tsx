import { RecordType } from "@/types/types";

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
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="rounded-2xl bg-stone-900 text-sky-500 p-12 gap-2 flex flex-col w-120 h-120">
        <img
          src={
            album_artwork || "https://placehold.co/300x300/000000/ff00c8.png"
          }
          alt={`${album} cover`}
          className="rounded border border-sky-500 w-full object-cover"
        />
        <p>Album: {album}</p>
        <p>Artist: {artist}</p>
        <p>Album Artist: {album_artist}</p>
        <p>Condition: {condition}</p>
        <p>Format: {format}</p>
        <p>Genre: {genre.join(", ")}</p>
        <p>Label: {record_label}</p>
        <p>Year: {year}</p>
      </div>
    </div>
  );
}
