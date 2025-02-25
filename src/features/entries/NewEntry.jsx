import { useQuery } from "@tanstack/react-query";
import NewEntryForm from "./NewEntryForm";
import { fetchUsers } from "../users/userSlice";
import Loader from "../../ui/Loader";

function NewEntry() {
  // const { users } = useUsers();
  const { data: users, isPending } = useQuery({
    queryKey: ["users2"],
    queryFn: fetchUsers,
  });
  if (isPending) return <Loader />;
  if (!users) return;

  return (
    <div className="bg-slate-300 rounded-[15px] mx-auto w-[80%]">
      <header className="border-b-4 px-3 py-3 border-slate-200">
        <h1 className="text-2xl text-center text-green-500  font-semibold uppercase">
          New Entry
        </h1>
      </header>
      <NewEntryForm users={users} />
    </div>
  );
}

export default NewEntry;
