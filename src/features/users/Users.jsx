import { useQuery } from "@tanstack/react-query";
import UserItem from "./UserItem";
import { fetchUsers } from "./userSlice";
import { useUsers } from "./userContext";
import { useEffect } from "react";
import Loader from "../../ui/Loader";

function Users() {
  const { updateUsersContext, totalBalance } = useUsers();

  const { data, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  useEffect(
    function () {
      if (data) updateUsersContext(data);
    },
    [data, updateUsersContext]
  );

  if (!data) return;
  if (isPending) return <Loader />;

  if (data)
    return (
      <div className=" divide-y-[1px] px-3 py-3">
        {data.map((user, index) => (
          <UserItem
            user={user}
            index={index}
            key={user.id}
            totalBalance={totalBalance}
          />
        ))}
      </div>
    );
}

export default Users;
