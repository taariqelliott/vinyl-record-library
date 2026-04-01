import { RecordType } from "@/types/types";

export default async function RecordPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const recordId = (await params).id;
  const response = await fetch(`http://localhost:8000/records/${recordId}`);
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
        <p>Album: {album}</p>
        <p>Artist: {artist}</p>
        <p>Album Artist: {album_artist}</p>
        <p>Album artwork: {album_artwork}</p>
        <p>Condition: {condition}</p>
        <p>Format: {format}</p>
        <p>Genre: {genre}</p>
        <p>Label: {record_label}</p>
        <p>Year: {year}</p>
      </div>
    </div>
  );
}
