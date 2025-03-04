import { useQuery } from "@tanstack/react-query";
import EntryItem from "./EntryItem";
import { getEntriesAPI } from "../entries/entriesSlice";
import Loader from "../../ui/Loader";
import { formatDate } from "../../helpers";
import { useUsers } from "../users/userContext";
import { useEffect } from "react";

function Entry() {
  const { handleLastEntryDate } = useUsers();

  const { data: entries, isPending } = useQuery({
    queryKey: ["entries"],
    queryFn: getEntriesAPI,
  });

  useEffect(
    function () {
      if (!entries?.length) return;
      const lastEntry = formatDate(entries?.slice(-1)[0]?.created_at);
      handleLastEntryDate(lastEntry);
    },
    [handleLastEntryDate, entries]
  );
  if (!entries) return;
  const sortedEntries = [...entries].sort((a, b) => b.id - a.id);

  // const sortedEntries = Array.isArray(entries)
  //   ? [...entries].sort((a, b) => b.id - a.id)
  //   : [];

  if (isPending) return <Loader />;

  return (
    <div>
      <header className="border-t-[20px] border-b-4 flex items-center justify-between px-3 py-4 border-slate-200">
        <h1 className="text-xl sm:text-2xl text-green-500  font-medium uppercase">
          Expenses
        </h1>
      </header>

      <div
        className={`grid gap-2 grid-cols-[0.5fr,1fr,1fr,1fr,1fr] items-center py-2 px-3 ${
          entries.length > 5 ? "mr-5" : ""
        }`}
      >
        <div>
          <span className=" text-stone-600 font-semibold text-sm">Id</span>
        </div>
        <div>
          <span className="text-stone-600 font-semibold text-sm">Payer</span>
        </div>
        <div>
          <span className="text-stone-600 font-semibold text-sm">Purpose</span>
        </div>
        <div>
          <span className="text-stone-600 font-semibold text-sm">Amount</span>
        </div>
        <div>
          <span className="text-stone-600 font-semibold text-sm">Share</span>
        </div>
      </div>
      <div
        className={`max-h-[300px] overflow-x-hidden ${
          entries.length > 5 ? "overflow-y-scroll" : "overflow-y-hidden"
        }`}
      >
        {sortedEntries.map((entry, index) => (
          <EntryItem entry={entry} index={index} key={entry.id} />
        ))}
      </div>
    </div>
  );
}

export default Entry;
