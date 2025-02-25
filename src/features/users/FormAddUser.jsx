import { useState } from "react";
import Button from "../../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { addUserAPI, PassKey } from "./userSlice";
import { useNavigate } from "react-router-dom";

function FormAddUser() {
  const [name, setName] = useState("");
  const [initialBalance, setInitialBalance] = useState(0);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: addUserAPI,
    onSuccess: () => {
      navigate("/");
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data);
    if (formData.key !== PassKey) alert("Wrong Access Key. Try Again");

    mutate(formData);
  }
  return (
    <div className="py-5 px-4  items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-[1fr] sm:grid-cols-[120px,1fr] items-center sm:gap-4 gap-2">
          <label className="text-stone-700 text-lg">Full Name</label>
          <input
            required
            className="input2"
            type="text"
            name="name"
            placeholder="Write User's full name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-[1fr] sm:grid-cols-[120px,1fr] items-center sm:gap-4 gap-2">
          <label className="text-stone-700 text-lg">Initial Balance</label>
          <input
            className="input2"
            type="number"
            name="initialBalance"
            placeholder="Initial Balance..."
            value={initialBalance}
            onChange={(e) => setInitialBalance(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-[1fr] sm:grid-cols-[120px,1fr] items-center sm:gap-4 gap-2">
          <label className="text-stone-700 text-lg">Access Key</label>
          <input
            required
            className="input2"
            type="password"
            name="key"
            placeholder="Type Access Key..."
          />
        </div>
        <div className="text-center sm:text-right">
          <Button type="primary">Add User</Button>
        </div>
      </form>
    </div>
  );
}

export default FormAddUser;
