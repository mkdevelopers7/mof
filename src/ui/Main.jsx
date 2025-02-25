import { BrowserRouter, Route, Routes } from "react-router-dom";
import Ledger from "./Ledger";

import AddUser from "../features/users/AddUser";
import NewEntry from "../features/entries/NewEntry";

function Main() {
  return (
    <div className="pt-5 sm:pt-10 px-5 sm:max-w-[55rem] mx-auto ">
      {/*{<Ledger />} */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Ledger />} />
          <Route path="/entry" element={<NewEntry />} />
          <Route path="/adduser" element={<AddUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Main;
