import { createContext, useContext, useState } from "react";

const UserContext = createContext();
function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [lastEntryDate, setLastEntryDate] = useState("Loading...");
  function updateUsersContext(users) {
    const calcTotalExpenses = users.reduce((sum, cur) => {
      if (cur.id === 15) return sum + 0;
      const userBalance = cur.entries.reduce(
        (sumUser, curUser) => sumUser + curUser.amount,
        0
      );
      return sum + userBalance;
    }, 0);
    const calcTotalDeposits = users.reduce((sum, cur) => {
      if (cur.id === 15) return sum + 0;
      const userBalance = cur.deposits.reduce(
        (sumUser, curUser) => sumUser + curUser.amount,
        0
      );
      return sum + userBalance;
    }, 0);
    const calcTotalBalance = calcTotalExpenses - calcTotalDeposits;
    setTotalBalance(calcTotalBalance);
    setUsers(users);
  }
  function handleLastEntryDate(date) {
    setLastEntryDate(date);
  }
  return (
    <UserContext.Provider
      value={{
        users,
        updateUsersContext,
        totalBalance,
        setTotalBalance,
        lastEntryDate,
        handleLastEntryDate,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUsers() {
  return useContext(UserContext);
}

export { UserProvider, useUsers };
