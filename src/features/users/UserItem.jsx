function UserItem({ user, totalBalance, index }) {
  const totalExpenses = user.entries.reduce((sum, cur) => sum + cur.amount, 0);
  const totalDeposits = user.deposits.reduce((sum, cur) => sum + cur.amount, 0);
  let balance = totalExpenses - totalDeposits;
  const hasDebit = balance > 0;
  if (user.id === 15) {
    balance = -totalBalance;
  }

  return (
    <div className={` grid grid-cols-[0.4fr,auto,1fr] items-center py-2`}>
      <div className="space-x-5">
        <span className="text-stone-700">{user.name}</span>
      </div>
      <span
        className={`${
          hasDebit ? "bg-red-400" : "bg-green-500"
        }  text-stone-200 px-[8px] text-xs font-semibold py-[2px] rounded-full pb-[3px] inline-block`}
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
