"use client";

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

  const setImageFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
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

      const result = await response.json();
      console.log(result);
      alert("Record added!");
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error");
    }
  };

  const inputClass =
    "w-full px-4 py-2 bg-stone-800 text-sky-100 border border-sky-500 rounded-lg focus:outline-none focus:border-sky-300 placeholder:text-sky-500/50";

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-linear-to-b from-stone-950 to-stone-900 p-8">
      <div className="w-full max-w-md bg-stone-900 rounded-2xl p-8 border border-sky-500/30 shadow-xl">
        <h1 className="text-3xl font-bold text-sky-500 mb-6 text-center">
          Add Record
        </h1>

        <div className="flex flex-col gap-4">
          <input
            placeholder="Album..."
            type="text"
            className={inputClass}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (!event.target.value) return;
              setAlbum(event.target.value);
            }}
          />

          <input
            placeholder="Artist..."
            type="text"
            className={inputClass}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (!event.target.value) return;
              setArtist(event.target.value);
            }}
          />

          <input
            placeholder="Album artist..."
            type="text"
            className={inputClass}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (!event.target.value) return;
              setAlbumArtist(event.target.value);
            }}
          />

          <input
            placeholder="Year..."
            type="number"
            className={inputClass}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (!event.target.value) return;
              setYear(Number(event.target.value));
            }}
          />

          <input
            placeholder="Genre (comma separated)..."
            type="text"
            className={inputClass}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (!event.target.value) return;
              setGenre(event.target.value.split(",").map((g) => g.trim()));
            }}
          />

          <input
            placeholder="Record label..."
            type="text"
            className={inputClass}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (!event.target.value) return;
              setRecordLabel(event.target.value);
            }}
          />

          <input
            placeholder="Format..."
            type="text"
            className={inputClass}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (!event.target.value) return;
              setFormat(event.target.value);
            }}
          />

          <input
            placeholder="Condition..."
            type="text"
            className={inputClass}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (!event.target.value) return;
              setCondition(event.target.value);
            }}
          />

          <div className="relative">
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 bg-stone-800 text-sky-100 border border-sky-500 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-sky-500 file:text-stone-900 file:font-semibold hover:file:bg-sky-400 cursor-pointer"
              onChange={setImageFileHandler}
            />
          </div>

          <button
            onClick={sendData}
            className="w-full mt-4 px-6 py-3 bg-sky-500 text-stone-900 font-bold rounded-lg hover:bg-sky-400 transition-colors"
          >
            Add Record
          </button>
        </div>
      </div>
    </div>
  );
}
