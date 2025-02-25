import { Link } from "react-router-dom";
import Button from "./Button";

function SideBar() {
  return (
    <div className="bg-slate-300 rounded-[15px] mx-auto mt-5 sm:mt-0 w-[50%] sm:w-[25%] flex flex-col gap-4 px-8 py-6">
      <Button type="sidebar" color="green">
        <Link to="entry">New Entry</Link>
      </Button>
      <Button type="sidebar" color="green">
        <Link to="entry">Make Deposit</Link>
      </Button>
      <Button type="sidebar" color="green">
        <Link to="/adduser">Add User</Link>
      </Button>
      <Button type="sidebar" color="green">
        Delete User
      </Button>
    </div>
  );
}

export default SideBar;
