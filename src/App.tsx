import { FC, useEffect, useRef, useState } from "react";
import Transactions from "./components/Transactions";

const App: FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [currVal, setCurrVal] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (null !== inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  const changeBalance = (action: string) => {
    if (currVal > 0) {
      var modifier = action === "add" ? 1 : -1;
      var currBal = balance + currVal * modifier;
      setTransactions((transactions) => [
        {
          time: new Date(),
          amount: currVal,
          action,
          balance: currBal,
        },
        ...transactions,
      ]);
      setBalance(currBal);
      setCurrVal(0);
    }
  };

  return (
    <div className="App h-screen font-sans overflow-y-hidden">
      <div className=" flex-col justify-center items-center ">
        <div className="fixed w-full z-50">
          <div className="flex justify-around  bg-gray-100 py-2 overflow-x-hidden	">
            <p className="text-2xl">Balance: {balance}</p>
            <div className="flex-col">
              <input
                className="p-2 border-2 rounded-md focus:outline-none"
                type="number"
                ref={inputRef}
                onChange={(e) => setCurrVal(parseInt(e.target.value))}
                value={currVal}
                onFocus={() => inputRef.current?.select()}
              ></input>
              <button
                onClick={() => changeBalance("add")}
                id="addBtn"
                className="p-2 border bg-green-200 rounded mx-2 focus:outline-none"
              >
                Add
              </button>
              <button
                onClick={() => changeBalance("remove")}
                id="remBtn"
                className="p-2 p-2 bg-red-200 rounded focus:outline-none"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="w-full my-5 absolute mt-16 ">
          <Transactions transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

interface Transaction {
  time: Date;
  amount: number;
  action: string;
  balance: number;
}

export default App;
