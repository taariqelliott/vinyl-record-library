"use client";

import { RecordType } from "@/types/types";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

export const ClientRecords = ({
  recordsArray,
}: {
  recordsArray: RecordType[];
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredRecords = recordsArray.filter(
    (record) =>
      record.album.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex items-center justify-center flex-wrap my-2 flex-col w-full gap-y-3">
      <input
        className="mx-2 w-[calc(100%-1rem)] bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        type="text"
        placeholder="Search for records..."
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setSearchQuery(event.target.value);
        }}
      />
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {filteredRecords.map(({ album, artist, id, album_artwork }) => (
          <Link key={id} href={`/records/${id}`} className="cursor-pointer">
            <div className="bg-stone-800 rounded-lg p-4 w-72 text-sky-100 hover:bg-stone-700 transition-colors">
              <img
                className="rounded border border-sky-500 w-full h-72 object-cover mb-3"
                src={
                  album_artwork ||
                  "https://placehold.co/300x300/1c1917/0ea5e9.png?text=No+Image"
                }
                alt={`${album} cover`}
              />
              <div className="space-y-1">
                <p className="font-semibold truncate">{artist}</p>
                <p className="text-sm text-sky-300 truncate">{album}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
