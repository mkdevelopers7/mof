import Entry from "../features/entries/Entry";
import Users from "../features/users/Users";
import Navigation from "./Navigation";
import SideBar from "./SideBar";

function Ledger() {
  return (
    <>
      <Navigation />
      <div className="mainContainer flex flex-col-reverse sm:flex sm:flex-row">
        <SideBar />
        <div className="bg-slate-300 rounded-[15px] mx-auto sm:w-[70%]">
          <header className="border-b-4 flex items-center justify-between px-3 py-4 border-slate-200">
            <h1 className="text-xl sm:text-2xl text-green-500  font-medium uppercase">
              User Balance
            </h1>
            <p className="text-slate-700 text-[13px] flex flex-col sm:block">
              <span className="text-slate-500">Last Updated:</span>{" "}
              <span className="text-xs font-semibold">24 Feb 2025, 19:34</span>
            </p>
          </header>
          <div>
            <Users />
          </div>

          <Entry />
        </div>
      </div>
    </>
  );
}

export default Ledger;
