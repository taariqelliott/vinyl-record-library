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
    <div className="flex items-center justify-center flex-wrap my-2 flex-col w-full">
      <input
        className="mx-2 w-[calc(100%-1rem)] bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        type="text"
        placeholder="Search for records..."
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setSearchQuery(event.target.value);
        }}
      />
      <div className="flex flex-wrap gap-2 justify-center items-center">
        {filteredRecords.map(({ album, artist, id, album_artwork }) => (
          <Link key={id} href={`/records/${id}`} className="cursor-pointer">
            <div className="bg-stone-800 rounded p-2 h-96 w-96 text-sky-100 m-2 flex flex-col justify-center items-center">
              <img
                className="rounded border border-sky-500"
                src={album_artwork}
                alt={`${album} cover`}
              />
              <p>
                <span className="text-sky-500">{id}: </span>
                {artist}
              </p>
              <p>
                <span className="text-sky-500">Album:</span> {album}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
