import { useQuery } from "@tanstack/react-query";
import EntryItem from "./EntryItem";
import { getEntriesAPI } from "../entries/entriesSlice";
import Loader from "../../ui/Loader";

function Entry() {
  const { data: entries, isPending } = useQuery({
    queryKey: ["entries"],
    queryFn: getEntriesAPI,
  });
  if (isPending) return <Loader />;
  return (
    <div>
      <header className="border-t-[20px] border-b-4 flex items-center justify-between px-3 py-4 border-slate-200">
        <h1 className="text-2xl text-green-500  font-medium uppercase">
          Entries
        </h1>
      </header>

      <div className="grid grid-cols-[0.5fr,1fr,1fr,1fr,1fr] items-center py-2 px-3 border-b ">
        <div>
          <span className=" text-stone-600 font-semibold">Id</span>
        </div>
        <div>
          <span className="text-stone-600 font-semibold">Paid By</span>
        </div>
        <div>
          <span className="text-stone-600 font-semibold">Purpose</span>
        </div>
        <div>
          <span className="text-stone-600 font-semibold">Amount</span>
        </div>
        <div>
          <span className="text-stone-600 font-semibold">Per Head</span>
        </div>
      </div>

      {entries.map((entry) => (
        <EntryItem entry={entry} key={entry.id} />
      ))}
    </div>
  );
}

export default Entry;
