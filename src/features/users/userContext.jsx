import { createContext, useContext, useState } from "react";

const UserContext = createContext();
function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  function updateUsersContext(users) {
    const calcTotalBalance = users.reduce((sum, cur) => {
      if (cur.id === 7) return sum + 0;
      const userBalance = cur.entries.reduce(
        (sumUser, curUser) => sumUser + curUser.amount,
        0
      );
      return sum + userBalance;
    }, 0);

    setTotalBalance(calcTotalBalance);
    setUsers(users);
  }
  return (
    <UserContext.Provider
      value={{ users, updateUsersContext, totalBalance, setTotalBalance }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUsers() {
  return useContext(UserContext);
}

export { UserProvider, useUsers };
