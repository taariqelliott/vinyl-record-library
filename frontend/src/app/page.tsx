import { ClientRecords } from "@/components/ClientRecords";
import { RecordType } from "@/types/types";

export default async function Home() {
  const data = await fetch("http://localhost:8000/records");
  const recordsArray: RecordType[] = await data.json();
  console.log(recordsArray);
  return <ClientRecords recordsArray={recordsArray} />;
}
