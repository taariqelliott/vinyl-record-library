"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RecordType } from "@/types/types";
import { Disc3, Plus, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const filterLabels: Record<string, string> = {
  album: "Album",
  artist: "Artist",
  album_artist: "Album Artist",
  genre: "Genre",
  year: "Year",
  record_label: "Label",
  format: "Format",
  condition: "Condition",
};

export const ClientRecords = ({
  recordsArray,
}: {
  recordsArray: RecordType[];
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterParam, setFilterParam] = useState<keyof RecordType>("album");
  const router = useRouter();

  const filteredRecords = recordsArray.filter((record) => {
    const value = record[filterParam];

    if (Array.isArray(value)) {
      return value.some((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (typeof value === "string") {
      return value.toLowerCase().includes(searchQuery.toLowerCase());
    }

    if (typeof value === "number") {
      return value.toString().includes(searchQuery);
    }

    return false;
  });

  const deleteRecord = async (id: number) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    try {
      const response = await fetch(`${apiUrl}/records/${id}`, {
        method: "DELETE",
        headers: {
          accept: "application/json",
        },
      });
      const result = await response.json();
      console.log(result);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card p-1.5 shadow-sm">
          <Select
            value={filterParam}
            onValueChange={(val) => setFilterParam(val as keyof RecordType)}
          >
            <SelectTrigger className="w-36 border-0 bg-transparent shadow-none">
              <SelectValue placeholder="Filter by">
                {filterLabels[filterParam]}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="album">Album</SelectItem>
              <SelectItem value="artist">Artist</SelectItem>
              <SelectItem value="album_artist">Album Artist</SelectItem>
              <SelectItem value="genre">Genre</SelectItem>
              <SelectItem value="year">Year</SelectItem>
              <SelectItem value="record_label">Label</SelectItem>
              <SelectItem value="format">Format</SelectItem>
              <SelectItem value="condition">Condition</SelectItem>
            </SelectContent>
          </Select>
          <div className="h-6 w-px bg-border" />
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="border-0 bg-transparent pl-9 shadow-none focus-visible:ring-0"
              type="text"
              placeholder="Search your collection..."
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setSearchQuery(event.target.value);
              }}
            />
          </div>
        </div>
        <Button
          nativeButton={false}
          render={<Link href="/add" />}
          className="bg-orange-500 text-white shadow-md shadow-orange-500/20 hover:bg-orange-600"
        >
          <Plus className="size-4" />
          Add Record
        </Button>
      </div>

      {filteredRecords.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-orange-500/10">
            <Disc3 className="size-8 text-orange-500" />
          </div>
          <div>
            <p className="text-lg font-medium">No records found</p>
            <p className="text-sm text-muted-foreground">
              {searchQuery
                ? "Try a different search term"
                : "Add your first record to get started"}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredRecords.map(({ album, artist, id, album_artwork }) => (
            <Link key={id} href={`/records/${id}`} className="group">
              <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5 hover:border-orange-500/30 hover:-translate-y-1">
                <div className="relative aspect-square overflow-hidden">
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      if (id && confirm("Delete this record?")) {
                        deleteRecord(id);
                      }
                    }}
                    className="absolute right-2 top-2 z-50 rounded-full bg-black/60 p-2 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-red-600 group-hover:opacity-100"
                  >
                    <Trash2 className="size-4" />
                  </button>
                  <img
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={
                      album_artwork ||
                      "https://placehold.co/400x400/27272a/f97316.png?text=No+Image"
                    }
                    alt={`${album} cover`}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-semibold leading-tight">
                    {artist}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {album}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
