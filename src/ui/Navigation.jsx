import { Link, useNavigate } from "react-router-dom";
import { useUsers } from "../features/users/userContext";
import { useEffect } from "react";

function Navigation() {
  const navigate = useNavigate();
  const { totalBalance } = useUsers();
  useEffect(
    function () {
      if (totalBalance === undefined) navigate("/");
    },
    [totalBalance, navigate]
  );

  return (
    <div className="mb-5 sm:mb-10">
      <div className=" bg-green-600  flex items-center justify-between px-4 sm:px-8 md:px-16 py-4 ">
        <h1 className="uppercase text-stone-100 text-xl sm:text-3xl font-semibold">
          <Link to="/">Finance Ministry</Link>
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
