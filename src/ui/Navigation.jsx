import { useUsers } from "../features/users/userContext";

function Navigation() {
  const { totalBalance } = useUsers();

  return (
    <div className="mb-5 sm:mb-10">
      <div className=" bg-green-600  flex items-center justify-between px-4 sm:px-8 md:px-16 py-4 ">
        <h1 className="uppercase text-stone-100 text-xl sm:text-3xl font-semibold">
          <a href="https://financeministry.vercel.app">Finance Ministry</a>
        </h1>
        <p className=" text-xs sm:text-lg text-slate-200 font-normal">
          Total {totalBalance >= 0 ? "Debt" : "Credit"} :
          <span className="font-bold"> {totalBalance.toFixed(0)}</span>
        </p>
      </div>
    </div>
  );
}

export default Navigation;
