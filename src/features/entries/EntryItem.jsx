function EntryItem({ entry }) {
  const { id, paidBy, purpose, totalAmount, usersCharged } = entry;
  const perHead = totalAmount / usersCharged.length;
  // return <div>Entry id:{entry.id}</div>;
  return (
    <div className="grid gap-2 grid-cols-[0.5fr,1fr,1fr,1fr,1fr] items-center py-2 px-3 border-b-[1px]">
      <div>
        <span className=" text-stone-600 text-[14px]">{id}</span>
      </div>
      <div>
        <span className="text-stone-600 text-[14px] capitalize">
          {paidBy === "7" ? "Mehran" : ""}
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
    </div>
  );
}

export default EntryItem;
