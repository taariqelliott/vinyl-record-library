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
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <div className="rounded-2xl bg-stone-900 text-sky-100 p-8 max-w-2xl w-full">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <img
              src={
                album_artwork ||
                "https://placehold.co/400x400/1c1917/0ea5e9.png?text=No+Image"
              }
              alt={`${album} cover`}
              className="rounded-lg border-2 border-sky-500 w-full object-cover"
            />
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sky-500 text-sm">Album</p>
              <p className="text-xl font-bold">{album}</p>
            </div>
            <div>
              <p className="text-sky-500 text-sm">Artist</p>
              <p className="text-lg">{artist}</p>
            </div>
            <div>
              <p className="text-sky-500 text-sm">Album Artist</p>
              <p className="text-lg">{album_artist}</p>
            </div>
            <div>
              <p className="text-sky-500 text-sm">Year</p>
              <p>{year}</p>
            </div>
            <div>
              <p className="text-sky-500 text-sm">Genre</p>
              <p>{genre.join(", ")}</p>
            </div>
            <div>
              <p className="text-sky-500 text-sm">Label</p>
              <p>{record_label}</p>
            </div>
            <div>
              <p className="text-sky-500 text-sm">Format</p>
              <p>{format}</p>
            </div>
            <div>
              <p className="text-sky-500 text-sm">Condition</p>
              <p>{condition}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
