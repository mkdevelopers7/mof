import FormAddUser from "./FormAddUser";

function AddUser() {
  return (
    <div className="bg-slate-300 rounded-[15px] mx-auto w-[80%]">
      <header className="border-b-4 px-3 py-3 border-slate-200">
        <h1 className="text-2xl text-center text-green-500  font-semibold uppercase">
          Add New User
        </h1>
      </header>
      <FormAddUser />
    </div>
  );
}

export default AddUser;
