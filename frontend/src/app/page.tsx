import { ClientRecords } from "@/components/ClientRecords";
import { RecordType } from "@/types/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const data = await fetch(`${apiUrl}/records`, {
    cache: "no-store",
  });
  const recordsArray: RecordType[] = await data.json();
  return <ClientRecords recordsArray={recordsArray} />;
}
