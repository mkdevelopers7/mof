function UserItem({ user }) {
  const balance = user.entries.reduce((sum, cur) => sum + cur.amount, 0);
  const hasDebit = balance > 0;
  return (
    <div className="grid grid-cols-[0.4fr,auto,1fr] items-center py-2">
      <div className="space-x-5">
        <span className="text-stone-700">{user.name}</span>
      </div>
      <span
        className={`${
          hasDebit ? "bg-red-400" : "bg-green-500"
        }  text-stone-200 px-2 text-xs font-semibold py-[2px] rounded-full`}
      >
        {balance > 0 ? "Debit" : "Credit"}
      </span>
      <span className="text-green-700 justify-self-end text-sm font-semibold">
        {balance.toFixed(0)}
      </span>
    </div>
  );
}

export default UserItem;
