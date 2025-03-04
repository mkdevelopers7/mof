import { useQuery } from "@tanstack/react-query";
import NewEntryForm from "./NewEntryForm";
import { fetchUsers } from "../users/userSlice";
import Loader from "../../ui/Loader";
import Navigation from "../../ui/Navigation";
import SideBar from "../../ui/SideBar";

function NewEntry() {
  // const { users } = useUsers();
  const { data: users, isPending } = useQuery({
    queryKey: ["users2"],
    queryFn: fetchUsers,
  });
  if (isPending) return <Loader />;
  if (!users) return;

  return (
    <>
      <Navigation />
      <div className="mainContainer flex gap-4 flex-col-reverse sm:flex sm:flex-row">
        <SideBar />
        <div className="mainContainer bg-slate-300 rounded-[15px] mx-auto sm:w-[80%] ">
          <header className="border-b-4 px-3 py-3 border-slate-200">
            <h1 className="text-xl sm:text-2xl text-center text-green-500  font-semibold uppercase">
              New Expense
            </h1>
          </header>
          <NewEntryForm users={users} />
        </div>
      </div>
    </>
  );
}

export default NewEntry;
