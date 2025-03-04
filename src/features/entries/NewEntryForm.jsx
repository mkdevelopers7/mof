import { useState } from "react";
import Button from "../../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { addNewEntryAPI } from "./entriesSlice";
import Loader from "../../ui/Loader";
import { useNavigate } from "react-router-dom";
import { PassKey } from "../users/userSlice";

function NewEntryForm({ users }) {
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [paidBy, setPaidBy] = useState("");

  const {
    mutate: addNewEntry,
    error,
    isPending,
  } = useMutation({
    mutationFn: addNewEntryAPI,
    onSuccess: (data) => {
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function handleCheckboxChange(userId) {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data);

    if (formData.key !== PassKey) return alert("Wrong Access Key. Try Again");

    const newEntry = {
      totalAmount: Number(formData.totalAmount),
      purpose: formData.purpose,
      usersCharged: selectedUsers,
      paidBy: Number(paidBy),
      created_at: formData.date || new Date(),
      details: formData.details || "",
    };

    addNewEntry(newEntry);
  }
  if (isPending) return <Loader />;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-5 py-6">
      <div className="grid grid-cols-[1fr] sm:grid-cols-[160px,1fr] gap-2 items-center sm:gap-4">
        <label>Total Amount Spent</label>
        <input
          className="input2"
          type="number"
          name="totalAmount"
          placeholder="Enter Amount"
          required
        />
      </div>
      <div className="grid grid-cols-[1fr] sm:grid-cols-[160px,1fr] gap-2 items-center sm:gap-4">
        <label>Purpose of Payment</label>
        <select name="purpose" className="input2">
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="room">Room Expense</option>
          <option value="adjustment">Adjustment</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>
      </div>

      <div className="items-center grid grid-cols-[1fr] sm:grid-cols-[160px,1fr] gap-2 sm:gap-4">
        <label>Paid By</label>
        <select
          className="input2 accent-green-500"
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
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
      <div className="items-center grid grid-cols-[1fr] sm:grid-cols-[160px,1fr] gap-2 sm:gap-4">
        <label>Date</label>
        <input className="input2" type="date" name="date" />
      </div>
      <div className="grid grid-cols-[1fr] sm:grid-cols-[160px,1fr] gap-2 items-center sm:gap-4">
        <label>
          Details <span className="text-sm text-slate-600">(Optional)</span>
        </label>
        <textarea
          rows={3}
          className="input2 rounded-xl"
          type="text-area"
          name="details"
          placeholder="Write Related Details"
        />
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

      {/* <div className="flex items-center gap-4"> */}
      <div className="items-center grid grid-cols-[1fr] sm:grid-cols-[160px,1fr] gap-2 sm:gap-4">
        <legend>Consumers</legend>
        <div className="space-x-2">
          {users.map((user) => (
            <label key={user.id} className="text-sm">
              <input
                type="checkbox"
                className="accent-green-500"
                value={user.id}
                checked={selectedUsers.includes(user.id)}
                onChange={() => handleCheckboxChange(user.id)}
              />
              <span> {user.name}</span>
            </label>
          ))}
          {/* <label className="">
            <input type="checkbox" className="accent-green-500" />
            <span> Haseeb</span>
          </label> */}
        </div>
      </div>

      <div className="text-center sm:text-right">
        <Button type="primary">Add Expense</Button>
      </div>
    </form>
  );
}

export default NewEntryForm;

// <form onSubmit={handleSubmit} className="flex flex-col">
//   <div className="flex gap-4">
//     <label>Total Amount Spent:</label>
//     < className="input2" type="number" name="totalAmount" required />
//   </div>
//   <div>
//     <label>Purpose of Payment:</label>
//     <select name="purpo className="input2"se">
//       <option value="breakfast">Breakfast</option>
//       <option value="lunch">Lunch</option>
//       <option value="dinner">Dinner</option>
//     </select>
//   </div>

//   <div>
//     <label>Select Users Charged:</label>
//     <select
//       multiple
//       value={selectedUsers}
//       onChange={(e) =>
//         setSelectedUsers(
//           [...e.target.selectedOptions].map((opt) => opt.value)
//         )
//       }
//     >
//       {users.map((user) => (
//         <option key={user.id} value={user.id}>
//           {user.name}
//         </option>
//       ))}
//     </select>
//   </div>
//   <div>
//     <label>Paid By:</label>
//     <select
//       value={paidBy}
//       onChange={(e) => setPaidBy(e.target.value)}
//       required
//     >
//       <option value="" disabled>
//         Select a user
//       </option>
//       {users.map((user) => (
//         <option key={user.id} value={user.id}>
//           {user.name}
//         </option>
//       ))}
//     </select>
//   </div>
//   <button type="submit">Add Entry</button>
// </form>

////////////////////////////
