import Button from "../../ui/Button";
import { useMutation } from "@tanstack/react-query";

import Loader from "../../ui/Loader";
import { useNavigate } from "react-router-dom";
import { makeDepositAPI, PassKey } from "../users/userSlice";
import { useUsers } from "../users/userContext";
import { useState } from "react";

function AddDepositForm() {
  const navigate = useNavigate();
  const { users } = useUsers();
  const [paidBy, setPaidBy] = useState("");

  const {
    mutate: makeDeposit,

    isPending,
  } = useMutation({
    mutationFn: makeDepositAPI,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const { depositAmount, key, date } = Object.fromEntries(data);
    if (key !== PassKey) alert("Wrong Access Key. Try Again");

    const { name } = users.find((user) => user.id === +paidBy);

    const created_at = date || new Date();
    makeDeposit({ paidBy, depositAmount, name, created_at });
  }
  if (isPending) return <Loader />;
  if (!users.length) return;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-5 py-6">
      <div className="grid grid-cols-[1fr] sm:grid-cols-[160px,1fr] gap-2 items-center sm:gap-4">
        <label>Deposit Amount</label>
        <input
          className="input2"
          type="number"
          name="depositAmount"
          placeholder="Enter Deposit Amount"
          required
        />
      </div>

      <div className="items-center grid grid-cols-[1fr] sm:grid-cols-[160px,1fr] gap-2 sm:gap-4">
        <label>Deposit By</label>
        <select
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
          className="input2 accent-green-500"
          required
        >
          <option value="" disabled>
            Select a user
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-[1fr] sm:grid-cols-[160px,1fr] gap-2 items-center sm:gap-4">
        <label>Date</label>
        <input className="input2" type="date" name="date" />
      </div>
      <div className="items-center grid grid-cols-[1fr] sm:grid-cols-[160px,1fr] gap-2 sm:gap-4">
        <label>Access Key</label>
        <input
          className="input2"
          type="password"
          name="key"
          placeholder="Enter Access Key..."
          required
        />
      </div>

      <div className="text-center sm:text-right">
        <Button type="primary">Make Deposit</Button>
      </div>
    </form>
  );
}

export default AddDepositForm;
