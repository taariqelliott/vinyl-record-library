import { ClientRecords } from "@/components/ClientRecords";
import { RecordType } from "@/types/types";

export default async function Home() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/records`);

  const recordsArray: RecordType[] = await data.json();
  return <ClientRecords recordsArray={recordsArray} />;
}
