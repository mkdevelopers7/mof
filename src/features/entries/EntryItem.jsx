import { formatDateShort } from "../../helpers";
import { useUsers } from "../users/userContext";

function EntryItem({ entry, index }) {
  const { id, paidBy, purpose, totalAmount, usersCharged, created_at } = entry;
  const perHead = totalAmount / usersCharged.length;

  ///////

  const { users } = useUsers();
  const userMap = users.reduce((acc, user) => {
    acc[user.id] = user.name;
    return acc;
  }, {});

  const consumers = usersCharged.map((userId) => userMap[userId]);

  /////////

  return (
    <div
      className={`${
        index % 2 === 0 ? "bg-[#d5dce4]" : ""
      }  grid gap-2 grid-cols-[0.5fr,1fr,1fr,1fr,1fr] items-center py-2 space-y-1 px-3 `}
    >
      <div>
        <span className=" text-stone-600 text-[14px]">{id}</span>
      </div>
      <div>
        <span className="text-stone-600 text-[14px] capitalize">
          {paidBy === "15" ? "Mehran" : ""}
        </span>
      </div>
      <div>
        <span className="text-stone-600 text-[14px] capitalize">{purpose}</span>
      </div>
      <div>
        <span className="text-stone-600 text-[14px]">{totalAmount}</span>
      </div>
      <div>
        <span className="text-stone-600 text-[14px]">{perHead.toFixed(0)}</span>
      </div>
      <div className="col-span-full flex items-center justify-end gap-2 text-[10px] font-normal space-x-2 ">
        <div className="flex gap-1 items-center">
          {consumers.map((consumer, i) => (
            <span
              className="bg-slate-200 text-stone-500 pb-[1px] px-2 rounded-full"
              key={i}
            >
              {consumer}
            </span>
          ))}
        </div>
        <div className="text-[10px] font-normal text-stone-600">
          {formatDateShort(created_at)}
        </div>
      </div>
    </div>
  );
}

export default EntryItem;
