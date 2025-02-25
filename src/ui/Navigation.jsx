import { useUsers } from "../features/users/userContext";

function Navigation() {
  const { totalBalance } = useUsers();
  return (
    <div>
      <div className=" bg-green-600  flex items-center justify-between px-4 sm:px-8 md:px-16 py-4 ">
        <h1 className="uppercase text-stone-100 text-xl sm:text-3xl font-semibold">
          Finance Ministry
        </h1>
        <p className=" text-normal sm:text-lg text-slate-200 font-normal">
          Total {totalBalance >= 0 ? "Debt" : "Credit"} :
          <span className="font-bold"> {totalBalance}</span>
        </p>
      </div>
    </div>
  );
}

export default Navigation;
