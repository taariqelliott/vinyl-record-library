import { ClientRecords } from "@/components/ClientRecords";
import { RecordType } from "@/types/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const data = await fetch(`${apiUrl}/records`, {
    cache: "no-store",
  });
  const recordsArray: RecordType[] = await data.json();
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Your <span className="text-rose-500">Collection</span>
        </h1>
        <p className="mt-1 text-muted-foreground">
          {recordsArray.length}{" "}
          {recordsArray.length === 1 ? "record" : "records"} in your crate
        </p>
      </div>
      <ClientRecords recordsArray={recordsArray} />
    </div>
  );
}
