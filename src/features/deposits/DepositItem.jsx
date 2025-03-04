import { formatDate, formatDateShort } from "../../helpers";

function DepositItem({ deposit, index }) {
  const { id, created_at: date, name, amount } = deposit;
  const dateFinal = formatDateShort(date);
  if (index <= 10)
    return (
      <div
        className={`grid gap-2 ${
          index % 2 === 0 ? "bg-[#d5dce4]" : ""
        }  grid-cols-[0.5fr,1fr,1fr,1fr] items-center py-2 px-3`}
      >
        {/* #cbd5e1 */}
        <div>
          <span className=" text-stone-600 text-[14px]">{id}</span>
        </div>
        <div>
          <span className="text-stone-600 text-[14px] capitalize">{name}</span>
        </div>
        {/* <div>
        <span className="text-stone-600 text-[14px] capitalize">{purpose}</span>
      </div> */}
        <div>
          <span className="text-stone-600 text-[14px]">{amount}</span>
        </div>
        <div>
          <span className="text-stone-600 font-semibold sm:font-normal sm:text-[14px] text-[10px]">
            {dateFinal}
          </span>
        </div>
      </div>
    );
}

export default DepositItem;
