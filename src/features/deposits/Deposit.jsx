import { useQuery } from "@tanstack/react-query";
import Loader from "../../ui/Loader";
import { fetchDepositsAPI } from "../users/userSlice";
import DepositItem from "./DepositItem";

function Deposit() {
  const { data: deposits, isPending: isPendingDeposits } = useQuery({
    queryKey: ["deposits"],
    queryFn: fetchDepositsAPI,
  });

  if (isPendingDeposits) return <Loader />;

  return (
    <div>
      <header className="border-t-[20px] border-b-4 flex items-center justify-between px-3 py-4 border-slate-200">
        <h1 className="text-xl sm:text-2xl text-green-500  font-medium uppercase">
          Deposits
        </h1>
      </header>

      <div
        className={`grid gap-2 grid-cols-[0.5fr,1fr,1fr,1fr] items-center py-2 px-3 ${
          deposits.length > 5 ? "mr-5" : ""
        }`}
      >
        <div>
          <span className=" text-stone-600 font-semibold ">Id</span>
        </div>
        <div>
          <span className="text-stone-600 font-semibold ">Deposited By</span>
        </div>
        <div>
          <span className="text-stone-600 font-semibold ">Amount</span>
        </div>
        <div>
          <span className="text-stone-600 font-semibold ">Date</span>
        </div>
        {/* <div>
          <span className="text-stone-600 font-semibold ">Share</span>
        </div> */}
      </div>
      <div
        className={`max-h-[210px] overflow-x-hidden ${
          deposits.length > 5 ? "overflow-y-scroll" : "overflow-y-hidden"
        }`}
      >
        {deposits
          .sort((a, b) => b.id - a.id)
          .map((deposit, index) => (
            <DepositItem deposit={deposit} index={index} key={deposit.id} />
          ))}
      </div>
    </div>
  );
}

export default Deposit;
