import Navigation from "../../ui/Navigation";
import SideBar from "../../ui/SideBar";
import AddDepositForm from "./AddDepositForm";

function AddDeposit() {
  return (
    <>
      <Navigation />
      <div className="mainContainer flex gap-4 flex-col-reverse sm:flex sm:flex-row">
        <SideBar />
        <div className="mainContainer bg-slate-300 rounded-[15px] mx-auto w-[80%]">
          <header className="border-b-4 px-3 py-3 border-slate-200">
            <h1 className="text-xl sm:text-2xl text-center text-green-500  font-semibold uppercase">
              Make New Deposit
            </h1>
          </header>
          <AddDepositForm />
        </div>
      </div>
    </>
  );
}

export default AddDeposit;
